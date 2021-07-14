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
    private readonly canvasReference: HTMLCanvasElement
    private readonly engine: BABYLON.Engine
    private readonly scene: BABYLON.Scene
    private camera: BABYLON.FreeCamera
    private light: BABYLON.HemisphericLight
    private table: BABYLON.AbstractMesh | null = null
    private roulette: BABYLON.AbstractMesh | null = null
    private ball: BABYLON.AbstractMesh | null = null


    public constructor(mainCanvasForWorld3D: HTMLCanvasElement) {
        this.canvasReference = mainCanvasForWorld3D
        this.engine = new BABYLON.Engine(this.canvasReference)
        this.scene = new BABYLON.Scene(this.engine);

        // This creates and positions a free camera (non-mesh)
        this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), this.scene);

        // This targets the camera to scene origin
        this.camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        this.camera.attachControl(this.canvasReference, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        this.light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);

        // Default intensity is 1. Let's dim the light a small amount
        this.light.intensity = 0.7;

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, this.scene);

        // Move the sphere upward 1/2 its height
        sphere.position.y = 2;

        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, this.scene);

        this.scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0));

        sphere.physicsImpostor =
            new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1, restitution: 0.9},
                this.scene);
        ground.physicsImpostor =
            new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0.9},
                this.scene);

        this.scene.debugLayer.show()
    }

    /*private async loadAssets(assetsManager: BABYLON.AssetsManager): Promise<void> {
        assetsManager.addMeshTask(
            TABLE_NAME,
            '',
            MESH_ROOT_URL,
            'table.babylon')

        assetsManager.addMeshTask(ROULETTE_TASK_NAME, '', MESH_ROOT_URL, ROULETTE_FILE_NAME)
        assetsManager.addMeshTask(BALL_TASK_NAME, '', MESH_ROOT_URL, BALL_FILE_NAME)

        assetsManager.onTaskSuccess = (task: BABYLON.AbstractAssetTask) => {
            switch (task.name) {
                case ROULETTE_TASK_NAME:
                    if (task instanceof BABYLON.MeshAssetTask) {
                        this.roulette = task.loadedMeshes[0]
                        this.locateRoulette()
                        this.camera.setTarget(this.roulette)
                    }
                    break
                case ENV_TEXTURE_TASK_NAME:
                    if (task instanceof BABYLON.CubeTextureAssetTask) {
                        this.scene.environmentTexture = task.texture
                    }
                    break
                case BALL_TASK_NAME:
                    if (task instanceof BABYLON.MeshAssetTask) {
                        this.ball = task.loadedMeshes[0]
                        this.locateBall()
                    }
                    break
            }
        }

        assetsManager.loadAsync().then(() => {
            this.engine.runRenderLoop(() => this.scene.render())
        })
    }

    private setUpCamera(): void {
        // this.camera.lowerAlphaLimit = 1
        // this.camera.lowerBetaLimit = 1
        // this.camera.upperBetaLimit = 5
        // this.camera.upperAlphaLimit = 5
        this.camera.upperRadiusLimit = 30
        this.camera.lowerRadiusLimit = 5

        this.camera.attachControl(this.canvasReference, true)
    }

    private locateTable(): void {
        // this.table!.checkCollisions = true
        this.table!.position.x = this.table!.position.y = this.table!.position.z = 0
    }

    private locateRoulette(): void {
        this.roulette!.position.x = this.roulette!.position.y = this.roulette!.position.z = 0
        //this.roulette!.checkCollisions = true
    }

    private locateBall(): void {
        this.ball!.position.x = 4.5
        this.ball!.position.y = 5
        this.ball!.position.z = 3.5
        // this.ball!.checkCollisions = true
    }*/
}