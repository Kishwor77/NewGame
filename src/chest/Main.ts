import {
    ArcRotateCamera,
    Engine,
    HemisphericLight,
    Scene,
    UniversalCamera,
    Vector3
} from "@babylonjs/core";

export class ChestScreen {
    private scene: any;
	private engine: Engine;
    public camera!: UniversalCamera;
    public _camRoot!: any;
    
    constructor(private canvas: HTMLCanvasElement) {
        this.engine = new Engine(this.canvas, true);

        this.scene = this.CreateScreen();

        this.engine.runRenderLoop(() => {
            this.scene.render()
        })
    }

    CreateScreen(): Scene {
        const scene = new Scene(this.scene);

        const frameperSecond = 60;
		const gravity = -9.81;
        scene.gravity = new Vector3(0, gravity / frameperSecond, 0);
        
        const camera = new ArcRotateCamera(
			"camera",
			Math.PI / 2,
			Math.PI / 4,
			10,
			new Vector3(3, -5, -5),
			this.scene,
		);

		camera.setPosition(new Vector3(0, 3, -10)); // Set the camera's position behind the character
        camera.attachControl();
        camera.speed = 0.25;

        return scene;
    }
}