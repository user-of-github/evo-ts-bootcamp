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
    ROULETTE_MESH_NAME,
    FRAME_RATE,
    TABLE_FILE_NAME,
    TABLE_MESH_NAME,
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
    ZOOM_CAMERA_Y, SPREAD_FOR_ACCELERATION
} from '../utilities/World3DConfigurations'


export class RouletteWorld3D {
    private readonly canvasReference: HTMLCanvasElement
    private readonly engine: BABYLON.Engine
    private readonly scene: BABYLON.Scene
    private readonly camera: BABYLON.ArcRotateCamera
    private readonly light: BABYLON.HemisphericLight
    private roulette: BABYLON.AbstractMesh | null = null
    private table: BABYLON.AbstractMesh | null = null
    private centralStateInRoulette: BABYLON.AbstractMesh | null = null
    private spots: BABYLON.AbstractMesh | null = null
    private checkStick: BABYLON.AbstractMesh | null = null
    private timerForSpinningRouletteAnimationID: number = 0
    private speedForDisperse: number
    public wayToGameState: MainGameState | null = null


    public constructor(mainCanvasForWorld3D: HTMLCanvasElement) {
        this.canvasReference = mainCanvasForWorld3D
        this.engine = new BABYLON.Engine(this.canvasReference)
        window.onresize = () => this.engine.resize()
        this.scene = new BABYLON.Scene(this.engine)
        this.camera = this.setUpCamera()
        this.setUpCamera()
        this.light = this.setUpLight()
        this.speedForDisperse = START_SPEED_FOR_DISPERSE
        this.loadMeshes()

        //this.scene.debugLayer.show()
        this.engine.runRenderLoop(() => this.scene.render())
    }

    private loadMeshes(): void {
        BABYLON.SceneLoader.ImportMesh('',
            MESH_ROOT_URL,
            TABLE_FILE_NAME,
            this.scene,
            (importedMeshes: Array<BABYLON.AbstractMesh>) => {
                this.table = this.scene.getMeshByName(TABLE_MESH_NAME)!
                this.locateTable()
                this.camera.setTarget(this.table)
                BABYLON.SceneLoader.ImportMesh('',
                    MESH_ROOT_URL,
                    ROULETTE_FILE_NAME,
                    this.scene,
                    (importedMeshes: Array<BABYLON.AbstractMesh>) => {
                        this.roulette = this.scene.getMeshByName(ROULETTE_MESH_NAME)!
                        this.locateRoulette()
                        this.wayToGameState!.settingsState.loading = false
                        this.camera.setTarget(this.roulette)

                        this.spots = this.scene.getMeshByName(SPOTS_MESH_NAME)
                        this.centralStateInRoulette = this.scene.getMeshByName(CENTRAL_MESH_NAME)
                        this.checkStick = this.scene.getMeshByName(CHECK_STICK_MESH_NAME)!
                        this.startDefaultAnimations()
                    },
                    () => this.camera.setTarget(this.table!))
            })


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
        assetsManager.onFinish = () => this.engine.runRenderLoop(() => this.scene.render())
        assetsManager.load()


        this.engine.runRenderLoop(() => this.scene.render())
    }

    private locateRoulette(): void {
        this.roulette!.position.x = this.roulette!.position.y = this.roulette!.position.z = 0
    }

    private locateTable(): void {
        this.table!.position.x = 0
        this.table!.position.z = 0
        this.table!.position.y = -9
        this.table!.rotation = new BABYLON.Vector3(0, 0.785, 0)
    }

    public startDefaultAnimations(): void {
        const rotateAnimation: BABYLON.Animation = new BABYLON.Animation(
            'spotRotation', 'rotation',
            FRAME_RATE,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)

        const keyFramesR: Array<BABYLON.IAnimationKey> = Array<BABYLON.IAnimationKey>()

        const someRandom: number = Math.random() <= 0.5 ? 1 : 2
        for (let counter: number = 0; counter <= 5; counter += 2) {
            keyFramesR.push({
                frame: counter * 8 * FRAME_RATE / someRandom,
                value: new BABYLON.Vector3(0, this.spots!.rotation.y - (counter / 2) * Math.PI, 0)
            })
        }
        rotateAnimation.setKeys(keyFramesR)

        this.scene.beginDirectAnimation(this.spots, [rotateAnimation], 0, 32 * FRAME_RATE / someRandom, true)
        this.scene.beginDirectAnimation(this.centralStateInRoulette, [rotateAnimation], 0, 32 * FRAME_RATE / someRandom,
            true)
    }

    public startDisperse(): void {
        this.speedForDisperse = START_SPEED_FOR_DISPERSE
        this.scene.stopAllAnimations()
        this.zoomInOnTheCamera()
        this.disperseRecursive(ACCELERATION_FOR_SPEED_FOR_DISPERSE + SPREAD_FOR_ACCELERATION * Math.random() *
            (Math.random() < 0.5 ? -1 : 1))
    }

    public disperseRecursive(acceleration: number): void {
        this.timerForSpinningRouletteAnimationID = window.setTimeout(() => {
            this.spots!.rotation = new BABYLON.Vector3(0, this.spots!.rotation.y + this.speedForDisperse, 0)
            this.centralStateInRoulette!.rotation =
                new BABYLON.Vector3(0, this.centralStateInRoulette!.rotation.y + this.speedForDisperse, 0)
            this.speedForDisperse += acceleration
            if (this.speedForDisperse >= UPPER_DISPERSE_SPEED_LIMIT) {
                window.clearTimeout(this.timerForSpinningRouletteAnimationID)
                this.brakingRecursive(ACCELERATION_FOR_SPEED_FOR_BRAKING + SPREAD_FOR_ACCELERATION * Math.random() *
                    (Math.random() < 0.5 ? -1 : 1))
                return
            }
            this.disperseRecursive(acceleration)
        }, INTERVAL_OF_MOVING)
    }

    private brakingRecursive(brakingAcceleration: number): void {
        this.timerForSpinningRouletteAnimationID = window.setTimeout(() => {
            this.spots!.rotation = new BABYLON.Vector3(0, this.spots!.rotation.y + this.speedForDisperse, 0)
            this.centralStateInRoulette!.rotation =
                new BABYLON.Vector3(0, this.spots!.rotation.y + this.speedForDisperse, 0)
            this.speedForDisperse -= brakingAcceleration
            if (this.speedForDisperse <= LOWER_BRAKING_SPEED_LIMIT) {
                this.wayToGameState!.countResults(this.getTheNearestSpot())
                window.clearTimeout(this.timerForSpinningRouletteAnimationID)
                return
            }
            this.brakingRecursive(brakingAcceleration)

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

    private static getDistance(spot: BABYLON.AbstractMesh, stick: BABYLON.AbstractMesh): number {
        const spotMinimumBox: BABYLON.Vector3 = spot.getBoundingInfo().boundingBox.minimumWorld
        const spotMaximumBox: BABYLON.Vector3 = spot.getBoundingInfo().boundingBox.maximumWorld

        const stickMinimumBox: BABYLON.Vector3 = stick.getBoundingInfo().boundingBox.minimumWorld
        const stickMaximumBox: BABYLON.Vector3 = stick.getBoundingInfo().boundingBox.maximumWorld

        const positionSpot: BABYLON.Vector3 = new BABYLON.Vector3(
            (spotMinimumBox.x + spotMaximumBox.x) / 2,
            (spotMinimumBox.y + spotMaximumBox.y) / 2,
            (spotMinimumBox.z + spotMaximumBox.z) / 2)

        const positionStick: BABYLON.Vector3 = new BABYLON.Vector3(
            (stickMinimumBox.x + stickMaximumBox.x) / 2,
            (stickMinimumBox.y + stickMaximumBox.y) / 2,
            (stickMinimumBox.z + stickMaximumBox.z) / 2)

        return (positionSpot.x - positionStick.x) * (positionSpot.x - positionStick.x) +
            (positionSpot.z - positionStick.z) * (positionSpot.z - positionStick.z)
    }

    private getTheNearestSpot(): number {
        const FILTER_NAME_TEMPLATE: string = 'box'
        let currentNearestSpotName: string = 'box0'

        for (const value of this.spots!.getChildMeshes()) {
            if (!value.name.includes(FILTER_NAME_TEMPLATE))
                continue

            if (RouletteWorld3D.getDistance(value, this.checkStick!) <
                RouletteWorld3D.getDistance(this.scene!.getMeshByName(currentNearestSpotName)!, this.checkStick!))
                currentNearestSpotName = value.name
        }

        return Number.parseInt(currentNearestSpotName.slice(FILTER_NAME_TEMPLATE.length))
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
        const positionAnimation = new BABYLON.Animation("camPosTo",
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
}