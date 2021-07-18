import * as BABYLON from '@babylonjs/core'
import '@babylonjs/inspector'
import {MainGameState} from "./MainGameState";



const MESH_ROOT_URL: string = '/meshes/'

const ROULETTE_FILE_NAME: string = 'roulette-model.babylon'
const BALL_FILE_NAME: string = 'ball.babylon'
const ENV_TEXTURE_FILE_NAME: string = 'studio.env'

const ENV_TEXTURE_TASK_NAME: string = 'ENV'

const ROULETTE_MESH_NAME: string = 'ROULETTE'
const CENTRAL_MESH_NAME: string = 'centralWithFloor'
const SPOTS_MESH_NAME: string = 'spots'
const CHECK_STICK_MESH_NAME: string = 'checkStick'
const BALL_MESH_NAME: string = 'BALL'

const FRAME_RATE: number = 30


export class RouletteWorld3D {
    private readonly engine: BABYLON.Engine
    private readonly scene: BABYLON.Scene
    private readonly canvasReference: HTMLCanvasElement
    private camera: BABYLON.ArcRotateCamera
    private light: BABYLON.HemisphericLight
    private roulette: BABYLON.AbstractMesh | null = null
    private centralStateInRoulette: BABYLON.AbstractMesh | null = null
    private spots: BABYLON.AbstractMesh | null = null
    private checkStick: BABYLON.AbstractMesh | null = null
    private timerID: number = 0
    private summandForDisperse = 0.01
    public wayToGameState: MainGameState | null  = null

    public constructor(mainCanvasForWorld3D: HTMLCanvasElement) {
        this.canvasReference = mainCanvasForWorld3D
        this.engine = new BABYLON.Engine(this.canvasReference)
        this.scene = new BABYLON.Scene(this.engine)
        this.camera = this.setUpCamera()
        this.setUpCamera()
        this.light = this.setUpLight()
        window.onresize = () => this.engine.resize()

        this.loadMeshes()

        //this.scene.debugLayer.show()
        this.engine.runRenderLoop(() => this.scene.render())
    }

    private loadMeshes(): void {
        BABYLON.SceneLoader.ImportMesh('',
            MESH_ROOT_URL,
            ROULETTE_FILE_NAME,
            this.scene,
            (importedMeshes: Array<BABYLON.AbstractMesh>) => {
                this.roulette = this.scene.getMeshByName(ROULETTE_MESH_NAME)!
                this.locateRoulette()
                this.camera.setTarget(this.roulette)

                this.spots = this.scene.getMeshByName(SPOTS_MESH_NAME)
                this.centralStateInRoulette = this.scene.getMeshByName(CENTRAL_MESH_NAME)
                this.checkStick = this.scene.getMeshByName(CHECK_STICK_MESH_NAME)
                this.startDefaultAnimations(3000)
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

        assetsManager.onFinish = () => {
            this.engine.runRenderLoop(() => this.scene.render())
        }

        assetsManager.load()

        this.engine.runRenderLoop(() => this.scene.render())
    }

    private locateRoulette(): void {
        this.roulette!.position.x = this.roulette!.position.y = this.roulette!.position.z = 0
    }

    private startDefaultAnimations(wholeTime: number): void {
        const rotateAnimation: BABYLON.Animation = new BABYLON.Animation(
            "spotRotation", "rotation",
            FRAME_RATE,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)

        const keyFramesR: Array<BABYLON.IAnimationKey> = Array<BABYLON.IAnimationKey>()
        keyFramesR.push({frame: 0, value: new BABYLON.Vector3(0, 0, 0)})
        keyFramesR.push({frame: 4 * FRAME_RATE, value: new BABYLON.Vector3(0, Math.PI, 0)})
        keyFramesR.push({frame: 8 * FRAME_RATE, value: new BABYLON.Vector3(0, 2 * Math.PI, 0)})
        rotateAnimation.setKeys(keyFramesR)

        this.scene.beginDirectAnimation(this.spots, [rotateAnimation], 0, 8 * FRAME_RATE, true)
        this.scene.beginDirectAnimation(this.centralStateInRoulette, [rotateAnimation], 0, 4 * FRAME_RATE, true)
    }

    public startDisperse(): void {
        this.scene.stopAllAnimations()
        this.disperseRecursive()
    }

    public disperseRecursive(): void {
        this.timerID = window.setTimeout(() => {
            this.spots!.rotation = new BABYLON.Vector3(0, this.spots!.rotation.y + this.summandForDisperse, 0)
            this.centralStateInRoulette!.rotation = new BABYLON.Vector3(0, this.spots!.rotation.y + this.summandForDisperse, 0)
            this.summandForDisperse += 0.0001
            //console.log(this.scene!.getMeshByName('spot22')!._positions)
            if (this.summandForDisperse >= 0.05) {
                window.clearTimeout(this.timerID)
                this.brakingRecursive()
                return
            }
            this.disperseRecursive()
        }, 14)
    }

    private brakingRecursive(): void {
        this.timerID = window.setTimeout(() => {
            this.spots!.rotation = new BABYLON.Vector3(0, this.spots!.rotation.y + this.summandForDisperse, 0)
            this.centralStateInRoulette!.rotation = new BABYLON.Vector3(0, this.spots!.rotation.y + this.summandForDisperse, 0)
            this.summandForDisperse -= 0.0002
            if (this.summandForDisperse <= 0.01) {
                this.wayToGameState!.countResults(Number.parseInt(this.getTheNearestSpot()!.slice(4)))
                window.clearTimeout(this.timerID)
                return
            }
            this.brakingRecursive()

        }, 14)
    }

    private setUpCamera(): BABYLON.ArcRotateCamera {
        const camera = new BABYLON.ArcRotateCamera(
            'Main camera',
            0,
            0,
            0,
            new BABYLON.Vector3(0, 0, -13),
            this.scene
        )
        camera.checkCollisions = true
        camera.lowerAlphaLimit = 1
        camera.upperAlphaLimit = 1
        camera.lowerBetaLimit = 0
        camera.upperBetaLimit = 1.5
        camera.lowerRadiusLimit = 15
        camera.upperRadiusLimit = 17

        camera.attachControl(this.canvasReference)

        return camera
    }

    private static getDistance(a: BABYLON.Vector3, b: BABYLON.Vector3): number {
        return (a.x - b.x) * (a.x - b.x) + (a.z - b.z) * (a.z - b.z)
    }

    private getTheNearestSpot(): string {
        let minimumDistanceMeshIndex: number = 0

        this.spots!.getChildren().forEach((value: BABYLON.Node, index: number, spots: Array<BABYLON.Node>) => {
            //console.log(RouletteWorld3D.getDistance((value as BABYLON.AbstractMesh).position, this.checkStick!.position))
            if (RouletteWorld3D.getDistance((value as BABYLON.AbstractMesh).absolutePosition, this.checkStick!.absolutePosition) <
                RouletteWorld3D.getDistance((spots[minimumDistanceMeshIndex] as BABYLON.AbstractMesh).absolutePosition,
                    this.checkStick!.absolutePosition))
                minimumDistanceMeshIndex = index


        })
        console.log(this.spots!.getChildren()[minimumDistanceMeshIndex])
        return this.spots!.getChildren()[minimumDistanceMeshIndex].name
    }

    private setUpLight(): BABYLON.HemisphericLight {
        return new BABYLON.HemisphericLight(
            'MainHemisphericLight',
            new BABYLON.Vector3(0, 2, 2),
            this.scene
        )
    }

}