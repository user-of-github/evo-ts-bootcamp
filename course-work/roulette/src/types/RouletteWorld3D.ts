import * as BABYLON from '@babylonjs/core'

export class RouletteWorld3D {
    private scene: BABYLON.Scene
    private camera: BABYLON.ArcRotateCamera
    private light: BABYLON.HemisphericLight
    // private box: BABYLON.Mesh
    // private table: BABYLON.Mesh
    // private roulette: BABYLON.Mesh


    constructor(mainCanvasForWorld3D: HTMLCanvasElement) {
        const engine: BABYLON.Engine = new BABYLON.Engine(mainCanvasForWorld3D)
        this.scene = new BABYLON.Scene(engine)
        this.camera = new BABYLON.ArcRotateCamera(
            'Main camera',
            0,
            0,
            0,
            new BABYLON.Vector3(0, 25, 20),
            this.scene
        )

        this.camera.attachControl(mainCanvasForWorld3D)
        //
        this.light = new BABYLON.HemisphericLight(
            'Main hemispheric light',
            new BABYLON.Vector3(0, 2, 2),
            this.scene
        )

        const ground = BABYLON.GroundBuilder.CreateGround(
            "ground",
            {
                width: 5,
                height: 5
            },
            this.scene
        )

        ground.checkCollisions = true

        this.camera.setTarget(ground)
        this.camera.checkCollisions = true
        this.camera.panningSensibility = 0
        this.camera.panningDistanceLimit = 0.0001


        const assetsManager: BABYLON.AssetsManager = new BABYLON.AssetsManager(this.scene)
        const meshTask: BABYLON.MeshAssetTask = assetsManager.addMeshTask(
            'skull task',
            'roulette',
            '/meshes/',
            'roulette-model.babylon')

        meshTask.onSuccess = (task: BABYLON.MeshAssetTask) => {
            task.loadedMeshes[0].position = BABYLON.Vector3.Zero()
            window.alert('success')
        }

        assetsManager.onTaskSuccess = () => alert('successtask')

        meshTask.onError = (task: BABYLON.MeshAssetTask, message: string | undefined, exception) => {
            window.alert(message + ' ' + exception)
        }


        engine.runRenderLoop(() => {
            this.scene.render()
        })
    }
}