import * as BABYLON from '@babylonjs/core'
import '@babylonjs/inspector'

const TABLE_NAME: string = 'TABLE'
const ROULETTE_NAME: string = 'ROULETTE'


export class RouletteWorld3D {
    private engine: BABYLON.Engine
    private scene: BABYLON.Scene
    private camera: BABYLON.ArcRotateCamera
    private light: BABYLON.HemisphericLight
    // private box: BABYLON.Mesh
    // private table: BABYLON.Mesh
    // private roulette: BABYLON.Mesh


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
            TABLE_NAME,
            '',
            '/meshes/',
            'table.babylon')

        assetsManager.addMeshTask(
            ROULETTE_NAME,
            '',
            '/meshes/',
            'roulette-model.babylon')

        assetsManager.onTaskSuccess = (task: BABYLON.AbstractAssetTask) => {
            switch (task.name) {
                case TABLE_NAME:
                    if (task instanceof BABYLON.MeshAssetTask) {
                        this.camera.setTarget(task.loadedMeshes[0])
                    }
                    break
                case ROULETTE_NAME:
                    if (task instanceof BABYLON.MeshAssetTask) {
                        task.loadedMeshes[0].position.y = 12
                    }
                    break
            }
        }

        assetsManager.loadAsync().then(() => {
            this.engine.runRenderLoop(() => {
                this.scene.render()
            })
        })
    }

    private locateTable(mesh: BABYLON.Mesh): void {

    }
}