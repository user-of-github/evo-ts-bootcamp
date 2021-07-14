import * as BABYLON from '@babylonjs/core'
import '@babylonjs/inspector'


const MESH_ROOT_URL: string = '/meshes/'

const ROULETTE_FILE_NAME: string = 'roulette-model.babylon'
const BALL_FILE_NAME: string = 'ball.babylon'
const ENV_TEXTURE_FILE_NAME: string = 'standard.env'

const TABLE_TASK_NAME: string = 'TABLE'
const ROULETTE_TASK_NAME: string = 'ROULETTE'
const ENV_TEXTURE_TASK_NAME: string = 'ENV'
const BALL_TASK_NAME: string = 'BALL'


export class RouletteWorld3D {
    private engine: BABYLON.Engine
    private scene: BABYLON.Scene
    private camera: BABYLON.ArcRotateCamera
    private light: BABYLON.HemisphericLight
    private roulette: BABYLON.AbstractMesh | null = null


    public constructor(mainCanvasForWorld3D: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(mainCanvasForWorld3D)
        this.scene = new BABYLON.Scene(this.engine)
        this.camera = new BABYLON.ArcRotateCamera(
            'Main camera',
            0,
            0,
            0,
            new BABYLON.Vector3(0, 25, 20),
            this.scene
        )

        // this.camera.lowerAlphaLimit = 1
        // this.camera.lowerBetaLimit = 1
        // this.camera.upperBetaLimit = 2
        // this.camera.upperAlphaLimit = 2

        this.camera.attachControl(mainCanvasForWorld3D)
        //
        this.light = new BABYLON.HemisphericLight(
            'Main hemispheric light',
            new BABYLON.Vector3(0, 2, 2),
            this.scene
        )

        this.camera.checkCollisions = true
        this.camera.panningSensibility = 0
        this.camera.panningDistanceLimit = 0.01


        const assetsManager: BABYLON.AssetsManager = new BABYLON.AssetsManager(this.scene)

        assetsManager.useDefaultLoadingScreen = false
        this.loadAssets(assetsManager)

        this.scene.debugLayer.show();
    }

    private async loadAssets(assetsManager: BABYLON.AssetsManager): Promise<void> {
        assetsManager.addMeshTask(
            ROULETTE_TASK_NAME,
            '',
            MESH_ROOT_URL,
            ROULETTE_FILE_NAME)

        assetsManager.addCubeTextureTask(ENV_TEXTURE_TASK_NAME, MESH_ROOT_URL + ENV_TEXTURE_FILE_NAME)

        assetsManager.onTaskSuccess = (task: BABYLON.AbstractAssetTask) => {
            switch (task.name) {
                case ROULETTE_TASK_NAME:
                    if (task instanceof BABYLON.MeshAssetTask) {
                        this.roulette = task.loadedMeshes[0]
                        this.roulette.position.x = 0
                        this.camera.setTarget(this.roulette)
                    }
                    break
                case ENV_TEXTURE_TASK_NAME:
                    if (task instanceof BABYLON.CubeTextureAssetTask) {
                        this.scene.environmentTexture = task.texture
                    }
            }
        }

        assetsManager.loadAsync().then(() => {
            this.physicsExample()
            this.engine.runRenderLoop(() => {
                this.scene.render()
            })

            this.physicsExample()
        })
    }

    private physicsExample(): void {
        const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, this.scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 2;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        const ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, this.scene);

        this.scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));

        sphere.physicsImpostor =
            new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1, restitution: 0.9},
                this.scene);
        ground.physicsImpostor =
            new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0.9},
                this.scene);
    }

}