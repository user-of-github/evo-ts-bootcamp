import * as BABYLON from '@babylonjs/core'
import '@babylonjs/inspector'

import {MainGameState} from './MainGameState'
import {
    MESH_ROOT_URL,
    ROULETTE_FILE_NAME,
    CHECK_STICK_MESH_NAME,
    SPOTS_MESH_NAME,
    CENTRAL_MESH_NAME,
    ENV_TEXTURE_FILE_NAME,
    ENV_TEXTURE_TASK_NAME,
    FRAME_RATE,
    TABLE_FILE_NAME,
    ACCELERATION_FOR_SPEED_FOR_BRAKING,
    ACCELERATION_FOR_SPEED_FOR_DISPERSE,
    START_SPEED_FOR_DISPERSE,
    LOWER_BRAKING_SPEED_LIMIT,
    UPPER_DISPERSE_SPEED_LIMIT,
    INTERVAL_OF_MOVING,
    DEFAULT_CAMERA_Z,
    DEFAULT_CAMERA_X,
    DEFAULT_CAMERA_Y,
    ZOOM_CAMERA_Z,
    ZOOM_CAMERA_X,
    ZOOM_CAMERA_Y,
    BALL_FILE_NAME,
    TABLE_MESH_NAME,
    ROULETTE_MESH_NAME,
    EXTERNAL_CORPUS_MESH_NAME,
    CENTRAL_FLOOR_MESH_NAME,
    EXTERNAL_SPOTS_TORUS_MESH_NAME,
    INTERNAL_SPOTS_TORUS_MESH_NAME,
    FUNNEL_FOR_BALL_MESH_NAME
} from '../utilities/World3DConfigurations'


window.CANNON = require('cannon')

export class RouletteWorld3D {
    private readonly canvasReference: HTMLCanvasElement
    private readonly engine: BABYLON.Engine
    private readonly scene: BABYLON.Scene
    private readonly camera: BABYLON.ArcRotateCamera
    //private readonly light: BABYLON.HemisphericLight
    private roulette: BABYLON.AbstractMesh | null = null
    private table: BABYLON.AbstractMesh | null = null
    private centralStateInRoulette: BABYLON.AbstractMesh | null = null
    private spots: BABYLON.AbstractMesh | null = null
    private checkStick: BABYLON.AbstractMesh | null = null
    private ball: BABYLON.AbstractMesh | null = null
    private timerForSpinningRouletteAnimationID: number = 0
    private speedForDisperse: number
    public wayToGameState: MainGameState | null = null
    private parent: BABYLON.TransformNode


    public constructor(mainCanvasForWorld3D: HTMLCanvasElement) {
        this.canvasReference = mainCanvasForWorld3D
        this.engine = new BABYLON.Engine(this.canvasReference)
        window.onresize = () => this.engine.resize()
        this.scene = new BABYLON.Scene(this.engine)
        this.enableScenePhysics()
        this.camera = this.setUpCamera()
        //this.light = this.setUpLight()
        this.scene.createDefaultLight()
        this.speedForDisperse = START_SPEED_FOR_DISPERSE
        this.parent = new BABYLON.TransformNode('root')
        this.loadMeshes()

        //this.scene.debugLayer.show()
        this.engine.runRenderLoop(() => this.scene.render())
    }

    private async loadMeshes(): Promise<void> {
        const rouletteResult: BABYLON.ISceneLoaderAsyncResult = await BABYLON.SceneLoader.ImportMeshAsync(
            '',
            MESH_ROOT_URL,
            ROULETTE_FILE_NAME,
            this.scene
        )
        this.roulette = rouletteResult.meshes[0]
        this.locateRoulette()
        this.camera.setTarget(this.roulette)
        this.enableWholeRoulettePhysics()

        this.spots = this.scene.getMeshByName(SPOTS_MESH_NAME)
        this.centralStateInRoulette = this.scene.getMeshByName(CENTRAL_MESH_NAME)
        this.checkStick = this.scene.getMeshByName(CHECK_STICK_MESH_NAME)


        const tableResult: BABYLON.ISceneLoaderAsyncResult = await BABYLON.SceneLoader.ImportMeshAsync(
            '',
            MESH_ROOT_URL,
            TABLE_FILE_NAME,
            this.scene
        )
        this.table! = tableResult.meshes[0]
        this.locateTable()

        const ballResult: BABYLON.ISceneLoaderAsyncResult = await BABYLON.SceneLoader.ImportMeshAsync(
            '',
            MESH_ROOT_URL,
            BALL_FILE_NAME,
            this.scene
        )
        this.ball! = ballResult.meshes[0]
        this.locateBall()
        this.enableBallPhysics()
        this.startDefaultAnimations()


        const assetsManager: BABYLON.AssetsManager = new BABYLON.AssetsManager(this.scene)
        assetsManager.useDefaultLoadingScreen = false
        assetsManager.addCubeTextureTask(ENV_TEXTURE_TASK_NAME, MESH_ROOT_URL + ENV_TEXTURE_FILE_NAME);
        assetsManager.onTaskSuccess = (task: BABYLON.AbstractAssetTask) => {
            switch (task.name) {
                case ENV_TEXTURE_TASK_NAME:
                    if (task instanceof BABYLON.CubeTextureAssetTask) {
                        this.scene.environmentTexture = task.texture
                    }
            }
        }
        assetsManager.onFinish = () => {
            this.engine.runRenderLoop(() => this.scene.render())
        }
        assetsManager.load()

        this.engine.runRenderLoop(() => this.scene.render())
    }


    private locateRoulette(): void {
        this.roulette!.position.x = this.roulette!.position.y = this.roulette!.position.z = 0
        this.roulette!.computeWorldMatrix(true)
    }

    private locateBall(): void {
        this.ball!.computeWorldMatrix(true)
        this.ball!.position.x = this.ball!.position.z = -4.5
        //this.ball!.position.z = -1
        this.ball!.position.y = 5
    }

    private locateTable(): void {
        this.table!.position.x = 0
        this.table!.position.z = 0
        this.table!.position.y = -9
        this.table!.rotation = new BABYLON.Vector3(0, 0.785, 0)
    }

    public startDefaultAnimations(): void {
        // this.spots!.physicsImpostor!.setAngularVelocity(new BABYLON.Vector3(0, 2, 0))
        const rotateAnimation: BABYLON.Animation = new BABYLON.Animation(
            'spotRotation', 'rotation',
            FRAME_RATE,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)

        const keyFramesR: Array<BABYLON.IAnimationKey> = Array<BABYLON.IAnimationKey>()
        keyFramesR.push({frame: 0, value: this.spots!.rotation})
        keyFramesR.push({frame: 16 * FRAME_RATE, value: new BABYLON.Vector3(0, this.spots!.rotation.y - Math.PI, 0)})
        keyFramesR.push(
            {frame: 32 * FRAME_RATE, value: new BABYLON.Vector3(0, this.spots!.rotation.y - 2 * Math.PI, 0)})
        rotateAnimation.setKeys(keyFramesR)


        this.scene.beginDirectAnimation(this.centralStateInRoulette, [rotateAnimation], 0, 32 * FRAME_RATE, true)
    }

    public startDisperse(): void {

        this.speedForDisperse = START_SPEED_FOR_DISPERSE
        this.scene.stopAllAnimations()
        this.zoomInOnTheCamera()
        this.disperseRecursive()
    }

    public disperseRecursive(): void {
        this.timerForSpinningRouletteAnimationID = window.setTimeout(() => {
            this.spots!.rotation = new BABYLON.Vector3(0, this.spots!.rotation.y + this.speedForDisperse, 0)
            this.centralStateInRoulette!.rotation =
                new BABYLON.Vector3(0, this.spots!.rotation.y + this.speedForDisperse, 0)
            this.speedForDisperse += ACCELERATION_FOR_SPEED_FOR_DISPERSE
            if (this.speedForDisperse >= UPPER_DISPERSE_SPEED_LIMIT) {
                window.clearTimeout(this.timerForSpinningRouletteAnimationID)
                this.brakingRecursive()
                return
            }
            this.disperseRecursive()
        }, INTERVAL_OF_MOVING)
    }

    private brakingRecursive(): void {
        this.timerForSpinningRouletteAnimationID = window.setTimeout(() => {
            this.spots!.rotation = new BABYLON.Vector3(0, this.spots!.rotation.y + this.speedForDisperse, 0)
            this.centralStateInRoulette!.rotation =
                new BABYLON.Vector3(0, this.spots!.rotation.y + this.speedForDisperse, 0)
            this.speedForDisperse -= ACCELERATION_FOR_SPEED_FOR_BRAKING
            if (this.speedForDisperse <= LOWER_BRAKING_SPEED_LIMIT) {
                this.wayToGameState!.countResults(Number.parseInt(this.getTheNearestSpot()!.slice(4)))
                window.clearTimeout(this.timerForSpinningRouletteAnimationID)
                return
            }
            this.brakingRecursive()

        }, INTERVAL_OF_MOVING)
    }

    private setUpCamera(): BABYLON.ArcRotateCamera {
        const camera = new BABYLON.ArcRotateCamera(
            'Main camera',
            0,
            0,
            0,
            new BABYLON.Vector3(DEFAULT_CAMERA_X, DEFAULT_CAMERA_Y, DEFAULT_CAMERA_Z),
            this.scene
        )
        camera.checkCollisions = true

        camera.panningSensibility = 1
        camera.attachControl(this.canvasReference)

        return camera
    }

    private static getDistance(a: BABYLON.Vector3, b: BABYLON.Vector3): number {
        return (a.x - b.x) * (a.x - b.x) + (a.z - b.z) * (a.z - b.z)
    }

    private getTheNearestSpot(): string {
        let minimumDistanceMeshIndex: number = 0
        for (let counter: number = 0; counter <= 36; ++counter) {
            const value = this.scene.getMeshByName(`box${counter}`)
            if (RouletteWorld3D.getDistance((value as BABYLON.AbstractMesh).absolutePosition,
                this.checkStick!.absolutePosition) <
                RouletteWorld3D.getDistance(
                    (this.scene.getMeshByName(`box${minimumDistanceMeshIndex}`)!).absolutePosition,
                    this.checkStick!.absolutePosition))
                minimumDistanceMeshIndex = counter
        }
        return `boxx${minimumDistanceMeshIndex}`
    }

    private setUpLight(): BABYLON.HemisphericLight {
        return new BABYLON.HemisphericLight(
            'MainHemisphericLight',
            new BABYLON.Vector3(0, 2, 2),
            this.scene
        )
    }

    private zoomInOnTheCamera(): void {
        this.camera.animations.length = 0
        const positionAnimation = new BABYLON.Animation('camPosTo',
            'position',
            FRAME_RATE,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);

        const keys1: Array<BABYLON.IAnimationKey> = [{
            frame: 0,
            value: this.camera.position
        }, {
            frame: FRAME_RATE * 32,
            value: new BABYLON.Vector3(ZOOM_CAMERA_X, ZOOM_CAMERA_Y, ZOOM_CAMERA_Z)
        }]

        positionAnimation.setKeys(keys1);
        this.camera.animations.push(positionAnimation)
        this.scene.beginAnimation(this.camera, 0, FRAME_RATE * 32, false, 1)
    }

    public moveTheCameraAway(): void {
        this.camera.animations.length = 0
        const positionAnimation = new BABYLON.Animation("camPosAway",
            'position',
            FRAME_RATE,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)

        const keys1: Array<BABYLON.IAnimationKey> = [{
            frame: 0,
            value: this.camera.position
        }, {
            frame: FRAME_RATE * 16,
            value: new BABYLON.Vector3(DEFAULT_CAMERA_X, DEFAULT_CAMERA_Y, DEFAULT_CAMERA_Z)
        }]

        positionAnimation.setKeys(keys1);
        this.camera.animations.push(positionAnimation)
        this.scene.beginAnimation(this.camera, 0, FRAME_RATE * 16, false, 1)
    }

    private enableScenePhysics(): void {
        this.scene!.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin())
    }

    private enableObjectPhysics(object: BABYLON.AbstractMesh, mass: number): void {
        object.computeWorldMatrix(true)
        object.position = object.absolutePosition
        object.parent = null

        object.physicsImpostor = new BABYLON.PhysicsImpostor(
            object,
            BABYLON.PhysicsImpostor.MeshImpostor,
            {mass: mass, friction: 1.0},
            this.scene)
    }


    private enableWholeRoulettePhysics(): void {
        this.enableObjectPhysics(this.scene!.getMeshByName(FUNNEL_FOR_BALL_MESH_NAME)!, 0)
        this.enableObjectPhysics(this.scene!.getMeshByName('centralFloor')!, 0)
        this.enableObjectPhysics(this.scene!.getMeshByName(EXTERNAL_SPOTS_TORUS_MESH_NAME)!, 0)
        this.enableObjectPhysics(this.scene!.getMeshByName(INTERNAL_SPOTS_TORUS_MESH_NAME)!, 0)
        this.enableObjectPhysics(this.scene!.getMeshByName('Cone001')!, 0)
        this.enableObjectPhysics(this.scene!.getMeshByName('centralFloor')!, 0)


        for (let counter: number = 0; counter <= 36; ++counter) {
            this.enableObjectPhysics(this.scene!.getMeshByName(`box${counter}`)!, 0)
            this.enableObjectPhysics(this.scene!.getMeshByName(`text${counter}`)!, 0)
        }

    }

    private enableBallPhysics(): void {
        this.ball!.physicsImpostor = new BABYLON.PhysicsImpostor(
            this.ball!,
            BABYLON.PhysicsImpostor.SphereImpostor, {mass: 0.2, friction: 0.5, restitution: 0},
            this.scene
        )
        var impulseDirection = new BABYLON.Vector3(1, 0, 1);
        var impulseMagnitude = 1;
        var contactLocalRefPoint = BABYLON.Vector3.Zero();
        window.setTimeout(() => {
            this.ball!.physicsImpostor!.applyImpulse(impulseDirection.scale(impulseMagnitude), this.ball!.getAbsolutePosition()!.add(contactLocalRefPoint))
        }, 5000)
    }
}