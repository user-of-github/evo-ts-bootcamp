import * as BABYLON from '@babylonjs/core'
import '@babylonjs/inspector'
import {AbstractMesh, CannonJSPlugin} from "@babylonjs/core";

window.CANNON = require('cannon')

const MESH_ROOT_URL: string = '/meshes/'

const ROULETTE_FILE_NAME: string = 'roulette-model.babylon'
const BALL_FILE_NAME: string = 'ball.babylon'
const ENV_TEXTURE_FILE_NAME: string = 'standard.env'

const TABLE_TASK_NAME: string = 'TABLE'
const ROULETTE_TASK_NAME: string = 'ROULETTE'
const ENV_TEXTURE_TASK_NAME: string = 'ENV'
const BALL_TASK_NAME: string = 'BALL'

const CENTRAL_MESH_NAME: string = 'centralWithFloor'
const SPOTS_MESH_NAME: string = 'spots'

const FRAME_RATE: number = 30

export class RouletteWorld3D {
    private readonly engine: BABYLON.Engine
    private readonly scene: BABYLON.Scene
    private readonly canvasReference: HTMLCanvasElement
    private camera: BABYLON.ArcRotateCamera
    private light: BABYLON.HemisphericLight
    private roulette: BABYLON.AbstractMesh | null
    private ball: BABYLON.AbstractMesh | null
    private centralStateInRoulette: BABYLON.AbstractMesh | null
    private spots: BABYLON.AbstractMesh | null

    public constructor(mainCanvasForWorld3D: HTMLCanvasElement) {
        this.canvasReference = mainCanvasForWorld3D
        this.engine = new BABYLON.Engine(this.canvasReference)
        this.scene = new BABYLON.Scene(this.engine)
        this.camera = new BABYLON.ArcRotateCamera(
            'Main camera',
            0,
            0,
            0,
            new BABYLON.Vector3(0, 10, -20),
            this.scene
        )
        this.setUpCamera()

        this.roulette = this.ball = null
        this.centralStateInRoulette = this.spots = null

        this.light = new BABYLON.HemisphericLight(
            'Main hemispheric light',
            new BABYLON.Vector3(0, 2, 2),
            this.scene
        )


        const assetsManager: BABYLON.AssetsManager = new BABYLON.AssetsManager(this.scene)

        assetsManager.useDefaultLoadingScreen = false
        this.loadAssets(assetsManager)

        //this.scene.debugLayer.show();

        window.onresize = () => this.engine.resize()
    }

    private async loadAssets(assetsManager: BABYLON.AssetsManager): Promise<void> {
        assetsManager.addMeshTask(
            ROULETTE_TASK_NAME,
            '',
            MESH_ROOT_URL,
            ROULETTE_FILE_NAME)

        assetsManager.addMeshTask(
            BALL_TASK_NAME,
            '',
            MESH_ROOT_URL,
            BALL_FILE_NAME)

        assetsManager.addCubeTextureTask(ENV_TEXTURE_TASK_NAME, MESH_ROOT_URL + ENV_TEXTURE_FILE_NAME)

        assetsManager.onTaskSuccess = (task: BABYLON.AbstractAssetTask) => {
            switch (task.name) {
                case ROULETTE_TASK_NAME:
                    if (task instanceof BABYLON.MeshAssetTask) {
                        this.roulette = task.loadedMeshes[0]
                        this.setUpRoulette()
                        this.camera.setTarget(this.roulette)

                        for (const mesh of this.roulette.getChildren())
                            if (mesh.name === SPOTS_MESH_NAME || mesh.name === CENTRAL_MESH_NAME)
                                console.log(mesh)

                        this.spots = this.scene.getMeshByName(SPOTS_MESH_NAME)
                        this.startSpotsAnimations()
                    }
                    break
                case BALL_TASK_NAME:
                    if (task instanceof BABYLON.MeshAssetTask) {
                        this.ball = task.loadedMeshes[0]
                        this.ball.position.x = this.ball.position.z = 2
                        this.ball.position.y = 10
                    }
                    break
                case ENV_TEXTURE_TASK_NAME:
                    if (task instanceof BABYLON.CubeTextureAssetTask) {
                        this.scene.environmentTexture = task.texture
                    }
            }
        }

        assetsManager.onFinish = () => {
            this.physicsExample()
            this.engine.runRenderLoop(() => this.scene.render())
        }

        assetsManager.load()
    }

    private physicsExample(): void {
        this.camera.checkCollisions = true

        this.scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new CannonJSPlugin());
        this.ball!.physicsImpostor = new BABYLON.PhysicsImpostor(
            this.ball!,
            BABYLON.PhysicsImpostor.SphereImpostor,
            {mass: 1, restitution: 0.9},
            this.scene
        )

        // this.roulette!.physicsImpostor =
        //     new BABYLON.PhysicsImpostor(this.roulette!,
        //         BABYLON.PhysicsImpostor.MeshImpostor,
        //         {mass: 0, friction: 1},
        //         this.scene)

        this.engine.runRenderLoop(() => this.scene.render())
    }

    private startSpotsAnimations(): void {
        const spotAnimation: BABYLON.Animation = new BABYLON.Animation(
            "yRot",
            "rotation.y",
            FRAME_RATE,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        )

        const keyFramesR: Array<BABYLON.IAnimationKey> = Array<BABYLON.IAnimationKey>()

        keyFramesR.push({
            frame: 0,
            value: 0
        })

        keyFramesR.push({
            frame: FRAME_RATE,
            value: 4 * Math.PI
        })

        keyFramesR.push({
            frame: 2 * FRAME_RATE,
            value: 8 * Math.PI
        })

        spotAnimation.setKeys(keyFramesR)


        this.scene.beginDirectAnimation(
            this.spots,
            [spotAnimation],
            0,
            2 * FRAME_RATE,
            false,
            1
        )
    }

    private setUpRoulette(): void {
        this.roulette!.checkCollisions = true
        this.roulette!.position.x = this.roulette!.position.y = this.roulette!.position.z = 0
    }

    private setUpCamera(): void {
        this.camera.checkCollisions = true
        this.camera.panningSensibility = 0
        this.camera.panningDistanceLimit = 0.01
        // this.camera.lowerAlphaLimit = 1
        // this.camera.upperAlphaLimit = 3
        // this.camera.lowerBetaLimit = 1
        // this.camera.upperBetaLimit = 1.5
        // this.camera.lowerRadiusLimit = 1
        // this.camera.upperRadiusLimit = 20

        this.camera.attachControl(this.canvasReference)
    }

}