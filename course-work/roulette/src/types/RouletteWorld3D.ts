import * as BABYLON from '@babylonjs/core'
import '@babylonjs/inspector'
import {OimoJSPlugin} from '@babylonjs/core';

// @ts-ignore
window.OIMO = require('oimo')


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

const FRAME_RATE: number = 144


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
        this.camera = this.setUpCamera()
        this.setUpCamera()
        this.light = this.setUpLight()
        window.onresize = () => this.engine.resize()

        this.roulette = this.ball = this.centralStateInRoulette = this.spots = null


        const assetsManager: BABYLON.AssetsManager = new BABYLON.AssetsManager(this.scene)

        assetsManager.useDefaultLoadingScreen = false
        this.loadAssets(assetsManager)

        //   this.scene.debugLayer.show();
    }

    private loadAssets(assetsManager: BABYLON.AssetsManager): void {
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

                        this.spots = this.scene.getMeshByName(SPOTS_MESH_NAME)
                        this.centralStateInRoulette = this.scene.getMeshByName(CENTRAL_MESH_NAME)
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
        this.scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new OimoJSPlugin())

        for (const mesh of this.roulette!.getChildMeshes()) {
            mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
                mesh,
                BABYLON.PhysicsImpostor.MeshImpostor,
                {mass: 0, friction: 1},
                this.scene)
        }


        this.ball!.physicsImpostor = new BABYLON.PhysicsImpostor(
            this.ball!,
            BABYLON.PhysicsImpostor.SphereImpostor, {mass: 2, friction: 0.5, restitution: 0},
            this.scene
        )


        // тестовый ground
        const ground = BABYLON.MeshBuilder.CreateGround('ground', {
            width: 100,
            height: 100
        }, this.scene)
        ground.position.y -= 10
        ground.physicsImpostor = new BABYLON.PhysicsImpostor(
            ground,
            BABYLON.PhysicsImpostor.BoxImpostor,
            {mass: 0, friction: 0.5, restitution: 0},
            this.scene
        )
        ground.position.y -= 20


        // последние изменения (подсмотрел тут: https://www.sitepoint.com/understanding-collisions-physics-babylon-js-oimo-js/)
        const meshesColliderList = [];

        for (let i: number = 1; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].checkCollisions && this.scene.meshes[i].isVisible === false) {
                // @ts-ignore
                this.scene.meshes[i].setPhysicsState(BABYLON.PhysicsEngine.BoxImpostor, {
                    mass: 0,
                    friction: 0.5, restitution: 0.7
                });
                meshesColliderList.push(this.scene.meshes[i]);
            }
        }

        this.engine.runRenderLoop(() => this.scene.render())
    }

    private startSpotsAnimations(): void {
        const rotateAnimation: BABYLON.Animation = new BABYLON.Animation(
            "spotRotation", "rotation",
            FRAME_RATE,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)

        const keyFramesR: Array<BABYLON.IAnimationKey> = Array<BABYLON.IAnimationKey>()
        keyFramesR.push({frame: 0, value: new BABYLON.Vector3(0, 0, 0)})
        keyFramesR.push({frame: 2 * FRAME_RATE, value: new BABYLON.Vector3(0, Math.PI, 0)})
        keyFramesR.push({frame: 4 * FRAME_RATE, value: new BABYLON.Vector3(0, 2 * Math.PI, 0)})
        rotateAnimation.setKeys(keyFramesR)

        this.scene.beginDirectAnimation(this.spots, [rotateAnimation], 0, 4 * FRAME_RATE, true)
        this.scene.beginDirectAnimation(this.centralStateInRoulette, [rotateAnimation], 0, 4 * FRAME_RATE, true)
    }

    private setUpRoulette(): void {
        this.roulette!.checkCollisions = true
        this.roulette!.position.x = this.roulette!.position.y = this.roulette!.position.z = 0
    }

    private setUpCamera(): BABYLON.ArcRotateCamera {
        const camera = new BABYLON.ArcRotateCamera(
            'Main camera',
            0,
            0,
            0,
            new BABYLON.Vector3(0, 10, -15),
            this.scene
        )
        camera.checkCollisions = true
        camera.panningSensibility = 0
        camera.panningDistanceLimit = 0.01
        // this.camera.lowerAlphaLimit = 1
        // this.camera.upperAlphaLimit = 3
        // this.camera.lowerBetaLimit = 1
        // this.camera.upperBetaLimit = 1.5
        // this.camera.lowerRadiusLimit = 1
        // this.camera.upperRadiusLimit = 20

        camera.attachControl(this.canvasReference)

        return camera
    }

    private setUpLight(): BABYLON.HemisphericLight {
        return new BABYLON.HemisphericLight(
            'MainHemisphericLight',
            new BABYLON.Vector3(0, 2, 2),
            this.scene
        )
    }

}