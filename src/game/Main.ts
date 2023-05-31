/* eslint-disable */
import {
	Scene,
	Engine,
	Vector3,
	HemisphericLight,
	CubeTexture,
	SceneLoader,
	ArcRotateCamera,
	ActionManager,
	ExecuteCodeAction,
	CreateSphere,
	PostProcess,
	Effect,
	Ray,
	CannonJSPlugin,
	AxisDragGizmo,
	Color3,
	AxesViewer,
	Scalar,
	Quaternion,
	Mesh,
	Camera,
	Skeleton,
	MeshBuilder,
	Matrix,
	AnimationGroup,
	Observable,
	UniversalCamera,
	TransformNode,
	Sound,
} from "@babylonjs/core";
import {
	AdvancedDynamicTexture,
	Button,
	Control,
	Grid,
	Image,
	Rectangle,
	StackPanel,
	TextBlock,
	ValueAndUnit,
} from "@babylonjs/gui";
import "@babylonjs/loaders";

import * as CANNON from "cannon";
enum State {
	START = 0,
	GAME = 1,
	LOSE = 2,
	CUTSCENE = 3,
}
export class MainScene {
	private scene: any;
	private engine: Engine;
	public camera!: UniversalCamera;
	//UI Elements
	public pauseBtn!: Button;
	public fadeLevel!: number;
	private _playerUI: any;
	private _pauseMenu: any;
	private _controls!: any;
	// public tutorial;

	public mesh!: any;

	private _deltaTime: number = 0;
	private _h!: number;
	private _v!: number;
	public hero!: any;
	public object!: any;
	public RotateCount: number = 0;

	//for the visual test
	public soundCount: number = 0;
	public visualCount: number = Math.floor(Math.random() * (7 - 5 + 1) + 5); //generate the output according to number
	public visualTestCount: number = 0;

	// Math.floor(Math.random() * (7 - 5 + 1) + 5)
	public lossCount: number = 0;
	public frequencyhear: boolean = false;
	public hearCount: number = 0;

	//frequency management

	public volumeControl: number = 0.15;
	public earType: number = -1;
	public frequency: number = 500;

	public lastIndex: number = 0;

	public _weapen: any;
	public _weapen1: any;
	public _weapen2: any;
	public _heroSkle!: any;

	//display text
	public text: any = "";
	public score: number = 10;
	public _textDisplay!: any;
	public _scoreDisplay!: any;

	//display 123

	public _textDisplay1!: any;
	public _textDisplay2!: any;
	public _textDisplay3!: any;

	public _camRoot!: any;
	private _yTilt!: TransformNode;
	public _visualTest!: Button;

	private _inputAmt!: number;

	public speed: number = 1;

	public FrequencyPlay: boolean = false;
	public _frequencyPlay: boolean = false;
	public _soundControl: boolean = false;

	//Mobile

	public horizontal: number = 0;
	public vertical: number = 0;
	//tracks whether or not there is movement in that axis
	public horizontalAxis: number = 0;
	public verticalAxis: number = 0;

	public hCount: number = 0;
	public vCount: number = 0;
	public _hCount: number = 0;
	public _vCount: number = 0;
	public nCount1 = 1;
	public nCount2 = 1;
	public nCount3 = 1;
	public nCount4 = 1;
	public nCount5 = 1;

	public Loaded: boolean = false;

	public inputMap: any;

	public jumpBtn!: Button;
	public dashBtn!: Button;
	public leftBtn!: Button;
	public rightBtn!: Button;
	public upBtn!: Button;
	public downBtn!: Button;
	public count: number = 0;

	private _state: number = 0;

	public mobileLeft!: boolean;
	public mobileRight!: boolean;
	public mobileUp!: boolean;
	public mobileDown!: boolean;
	private _mobileJump: boolean = false; //no need
	private _mobileDash!: boolean; //no need
	private winGame!: boolean;
	private lossGame!: boolean;

	public displayPosition: any;

	private _moveDirection: Vector3 = new Vector3();

	//animations
	private _run!: AnimationGroup;
	private _idle!: AnimationGroup;
	private _catch!: AnimationGroup;
	private _win!: AnimationGroup;
	private _loss!: AnimationGroup;
	public position: any = [];

	// animation trackers
	private _currentAnim!: AnimationGroup;
	private _prevAnim!: AnimationGroup;

	//Pause toggle
	public gamePaused = true;

	public lossSound!: Sound;
	public winSound!: Sound;
	public walkSound!: Sound;
	public startSound!: Sound;

	private static readonly PLAYER_SPEED: number = 0.45;

	private static readonly GRAVITY: number = -2.8; //how many frames the dash lasts
	private static readonly DOWN_TILT: Vector3 = new Vector3(
		0.0290313946973066,
		0,
		0,
	);
	private static readonly ORIGINAL_TILT: Vector3 = new Vector3(
		0.1134119456780721,
		0,
		0,
	);

	public onRun = new Observable();
	constructor(private canvas: HTMLCanvasElement) {
		this.engine = new Engine(this.canvas, true);

		this.scene = this.CreateScene();

		this.scene.enablePhysics(
			new Vector3(0, -9.81, 0),
			new CannonJSPlugin(true, 10, CANNON),
		);
		this._setupPlayerCamera();

		// Set up Mobile Controls if on mobile device

		//this._setUpMobile();

		this.inputMap = {};
		this.scene.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
				this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
			}),
		);
		this.scene.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
				this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
			}),
		);

		this.engine.runRenderLoop(() => {
			switch (this._state) {
				case State.START:
					this.scene.render();
					break;
				case State.CUTSCENE:
					this.scene.render();
					break;
				case State.GAME:
					this.scene.render();
					break;
				case State.LOSE:
					this.scene.render();
					break;
				default:
					break;
			}
		});

		window.addEventListener("resize", () => {
			this.engine.resize();
		});
	}

	CreateScene(): Scene {
		const scene = new Scene(this.engine);

		const frameperSecond = 60;
		const gravity = -9.81;
		scene.gravity = new Vector3(0, gravity / frameperSecond, 0);

		//  adding Gui menu

		0;

		const playerUI = AdvancedDynamicTexture.CreateFullscreenUI("UI");
		this._playerUI = playerUI;
		this._playerUI.idealHeight = 720;

		this.engine.displayLoadingUI();

		this._createPauseMenu();
		this._createControlsMenu();

		this._loadSounds();

		this.onRun.add((play) => {
			if (play && !this.walkSound.isPlaying) {
				this.walkSound.play();
			} else if (!play && this.walkSound.isPlaying) {
				this.walkSound.stop();
				this.walkSound.isPlaying = false; // make sure that walkingsfx.stop is called only once
			}
		});

		const displayText = new TextBlock();
		displayText.name = "Start";
		displayText.textVerticalAlignment = TextBlock.VERTICAL_ALIGNMENT_CENTER;
		displayText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		displayText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		displayText.fontSize = "22px";
		displayText.color = "white";
		//displayText.text = `${this.text}`;
		displayText.top = "32px";
		displayText.left = "50px";
		displayText.width = "25%";
		displayText.fontFamily = "Viga";
		displayText.resizeToFit = true;
		playerUI.addControl(displayText);
		this._textDisplay = displayText;

		const scoreText = new TextBlock();
		scoreText.name = "Start";
		scoreText.textVerticalAlignment = TextBlock.VERTICAL_ALIGNMENT_CENTER;
		scoreText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
		scoreText.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		scoreText.fontSize = "22px";
		scoreText.color = "white";
		scoreText.text = `${this.score}`;
		scoreText.top = "32px";
		scoreText.left = "-80px";
		scoreText.width = "25%";
		scoreText.fontFamily = "Viga";
		scoreText.resizeToFit = true;
		playerUI.addControl(scoreText);
		this._scoreDisplay = scoreText;

		const pauseBtn = Button.CreateImageOnlyButton(
			"pauseBtn",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/pauseBtn.png",
		);
		pauseBtn.width = "48px";
		pauseBtn.height = "86px";
		pauseBtn.thickness = 0;
		pauseBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		pauseBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
		pauseBtn.top = "-16px";
		pauseBtn.left = "-30px";
		playerUI.addControl(pauseBtn);
		pauseBtn.zIndex = 10;
		this.pauseBtn = pauseBtn;
		this.pauseBtn.isVisible = false;

		//when the button is down, make pause menu visable and add control to it
		pauseBtn.onPointerDownObservable.add(() => {
			this._pauseMenu.isVisible = true;
			playerUI.addControl(this._pauseMenu);
			this.pauseBtn.isHitTestVisible = false;

			//when game is paused, make sure that the next start time is the time it was when paused
			this.gamePaused = true;
			this.startSound.pause();
			//--SOUNDS--
			// this._scene.getSoundByName('gameSong').pause()
			// this._pause.play() //play pause music

			//this.scene.getSoundByName("pleasentsound").pause();
		});

		const startBtn = Button.CreateImageOnlyButton(
			"pauseBtn",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/pauseBtn.png",
		);
		startBtn.width = "48px";
		startBtn.height = "86px";
		startBtn.thickness = 0;
		startBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		startBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		//startBtn.top = "-16px";
		playerUI.addControl(startBtn);
		startBtn.zIndex = 10;
		//startBtn.isVisible = false;
		//this.pauseBtn = pauseBtn;

		startBtn.onPointerDownObservable.add(() => {
			this.gamePaused = false;
			startBtn.isVisible = false;
			this.pauseBtn.isVisible = true;
			playerUI.removeControl(startBtn);

			this.scene.getSoundByName("pleasentsound").play();

			//this.engine.enterFullscreen(true);

			//--SOUNDS--
			// this._scene.getSoundByName('gameSong').pause()
			// this._pause.play() //play pause music
		});

		// for visual test image display

		const visulaTest = Button.CreateImageOnlyButton(
			"visualtest",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/abc.png",
		);
		visulaTest.width = "48px";
		visulaTest.height = "86px";
		visulaTest.thickness = 0;
		visulaTest.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		visulaTest.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		//startBtn.top = "-16px";
		playerUI.addControl(visulaTest);
		visulaTest.zIndex = 5;
		this._visualTest = visulaTest;
		this._visualTest.isVisible = false;

		// display text while catching the object

		const displayText1 = new TextBlock();
		displayText1.name = "1";

		displayText1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		displayText1.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		displayText1.top = "-20px";
		displayText1.fontSize = "40px";
		displayText1.color = "white";
		displayText1.text = "1";
		displayText1.width = "25%";
		displayText1.fontFamily = "Viga";
		displayText1.resizeToFit = true;
		playerUI.addControl(displayText1);
		this._textDisplay1 = displayText1;
		this._textDisplay1.isVisible = false;

		const displayText2 = new TextBlock();
		displayText2.name = "2";

		displayText2.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		displayText2.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		displayText2.top = "-20px";
		displayText2.fontSize = "40px";
		displayText2.color = "white";
		displayText2.text = "2";
		displayText2.width = "25%";
		displayText2.fontFamily = "Viga";
		displayText2.resizeToFit = true;
		playerUI.addControl(displayText2);
		this._textDisplay2 = displayText2;
		this._textDisplay2.isVisible = false;

		const displayText3 = new TextBlock();
		displayText3.name = "3";

		displayText3.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		displayText3.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		displayText3.top = "-20px";
		displayText3.fontSize = "40px";
		displayText3.color = "white";
		displayText3.text = "3";
		displayText3.width = "25%";
		displayText3.fontFamily = "Viga";
		displayText3.resizeToFit = true;
		playerUI.addControl(displayText3);
		this._textDisplay3 = displayText3;
		this._textDisplay3.isVisible = false;

		//--ACTION BUTTONS--
		// container for action buttons (right side of screen)
		const actionContainer = new Rectangle();
		actionContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
		actionContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
		actionContainer.height = 0.4;
		actionContainer.width = 0.2;
		actionContainer.left = "-2%";
		actionContainer.top = "-2%";
		actionContainer.thickness = 0;
		playerUI.addControl(actionContainer);

		//grid for action button placement
		const actionGrid = new Grid();
		actionGrid.addColumnDefinition(0.5);
		actionGrid.addColumnDefinition(0.5);
		actionGrid.addRowDefinition(0.5);
		actionGrid.addRowDefinition(0.5);
		actionContainer.addControl(actionGrid);

		const dashBtn = Button.CreateImageOnlyButton(
			"dash",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/aBtn.png",
		);
		dashBtn.thickness = 0;
		dashBtn.alpha = 0.8;
		dashBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
		this.dashBtn = dashBtn;

		const jumpBtn = Button.CreateImageOnlyButton(
			"jump",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/bBtn.png",
		);
		jumpBtn.thickness = 0;
		jumpBtn.alpha = 0.8;
		jumpBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		jumpBtn.isEnabled = false;
		this.jumpBtn = jumpBtn;

		actionGrid.addControl(dashBtn, 0, 1);
		actionGrid.addControl(jumpBtn, 1, 0);

		//--MOVEMENT BUTTONS--
		// container for movement buttons (section left side of screen)
		const moveContainer = new Rectangle();
		moveContainer.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		moveContainer.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
		moveContainer.height = 0.4;
		moveContainer.width = 0.4;
		moveContainer.left = "2%";
		moveContainer.top = "-2%";
		moveContainer.thickness = 0;
		playerUI.addControl(moveContainer);

		//grid for placement of arrow keys
		const grid = new Grid();
		grid.addColumnDefinition(0.4);
		grid.addColumnDefinition(0.4);
		grid.addColumnDefinition(0.4);
		grid.addRowDefinition(0.5);
		grid.addRowDefinition(0.5);
		moveContainer.addControl(grid);

		// const leftBtn = Button.CreateImageOnlyButton(
		// 	"left",
		// 	"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/arrowBtn.png",
		// );
		// leftBtn.thickness = 0;
		// leftBtn.rotation = -Math.PI / 2;
		// leftBtn.color = "white";
		// leftBtn.alpha = 0.8;
		// leftBtn.width = 0.8;
		// leftBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		// this.leftBtn = leftBtn;

		// const rightBtn = Button.CreateImageOnlyButton(
		// 	"right",
		// 	"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/arrowBtn.png",
		// );
		// rightBtn.rotation = Math.PI / 2;
		// rightBtn.thickness = 0;
		// rightBtn.color = "white";
		// rightBtn.alpha = 0.8;
		// rightBtn.width = 0.8;
		// rightBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
		// this.rightBtn = rightBtn;

		// const upBtn = Button.CreateImageOnlyButton(
		// 	"up",
		// 	"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/arrowBtn.png",
		// );
		// upBtn.thickness = 0;
		// upBtn.alpha = 0.8;
		// upBtn.color = "white";
		// this.upBtn = upBtn;

		// const downBtn = Button.CreateImageOnlyButton(
		// 	"down",
		// 	"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/arrowBtn.png",
		// );
		// downBtn.thickness = 0;
		// downBtn.rotation = Math.PI;
		// downBtn.color = "white";
		// downBtn.alpha = 0.8;
		// this.downBtn = downBtn;

		//arrange the buttons in the grid
		// grid.addControl(leftBtn, 1, 0);
		// grid.addControl(rightBtn, 1, 2);
		// grid.addControl(upBtn, 0, 1);
		// grid.addControl(downBtn, 1, 1);

		scene.collisionsEnabled = true;

		// const envTex = CubeTexture.CreateFromPrefilteredData(
		// 	"./environment/environment.env",
		// 	scene,
		// );
		// envTex.gammaSpace = true;
		// envTex.rotationY = Math.PI / 4;

		// scene.environmentTexture = envTex;

		// scene.createDefaultSkybox(envTex, true, 1000, 0.25);

		var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
		light.intensity = 2;

		const camera = new ArcRotateCamera(
			"camera",
			Math.PI / 2,
			Math.PI / 4,
			10,
			new Vector3(3, -5, -5),
			this.scene,
		);

		camera.setPosition(new Vector3(0, 3, -10)); // Set the camera's position behind the character

		this._camRoot = camera;

		scene.activeCamera = this._camRoot;
		scene.activeCamera?.attachControl(this.canvas, true);
		this._camRoot.lowerRadiusLimit = 200;
		this._camRoot.upperRadiusLimit = 100;
		this._camRoot.wheelDeltaPercentage = 0.1;
		this._camRoot.checkCollisions = true;
		let playsound: Boolean;

		var inputMap: any = {};

		scene.actionManager = new ActionManager(scene);
		scene.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, function (
				evt: any,
			) {
				inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
			}),
		);
		scene.actionManager.registerAction(
			new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, function (evt: any) {
				inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
			}),
		);

		//loading object to catch

		SceneLoader.ImportMesh(
			"",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/model/",
			"object.glb",
			this.scene,
			(
				newMeshes: any,
				Iparticel: any,
				skeletons: any,
				animationGroups: any,
			) => {
				this.object = newMeshes[0];

				this.object.scaling = new Vector3(0.8, 0.8, 0.8);
				this.object.rotation = new Vector3(Math.PI / 2, 0, 0);
			},
		);

		SceneLoader.ImportMesh(
			"",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/model/",
			"newlowforest.glb",
			this.scene,
			(
				newMeshes: any,
				Iparticel: any,
				skeletons: any,
				animationGroups: any,
			) => {
				// terrain = newMeshes[0];
				// loaded = true;

				this.Loaded = true;
				newMeshes.map((mesh: any) => {
					mesh.checkCollisions = false;

					this.scene.onBeforeRenderObservable.add(() => {
						if (
							(this.mobileDown || this.mobileLeft || this.mobileRight,
							this.mobileUp)
						) {
							mesh.checkCollisions = true;
						} else {
							mesh.checkCollisions = false;
						}
						if (mesh.name.includes("colllision")) {
							mesh.checkCollisions = true;
							mesh.isVisible = false;
						}

						// if (mesh.name == "objectdisplay") {
						// 	this.mesh.position = mesh.position;

						// 	this.mesh.position.y = -0.1;
						// }
					});
				});

				if (this.Loaded) {
					// this.mesh.position = this.scene
					// 	.getTransformNodeByName("startposition")
					// 	.getAbsolutePosition();

					// this.mesh.position.y = -0.1;

					let position = this.scene
						.getTransformNodeByName("objectdisplay")
						.getAbsolutePosition();

					this.mesh.position.y = -0.19;
					this.mesh.position.x = position.x - 10;
					this.mesh.position.z = position.z - 10;
				}

				newMeshes[0].position = new Vector3(0, 0, 0);

				this.engine.hideLoadingUI();

				//this.scene.attachControl();
			},
		);

		let weapen: any;
		SceneLoader.ImportMesh(
			"",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/model/",
			"net01.glb",
			this.scene,
			(
				newMeshes: any,
				Iparticel: any,
				skeletons: any,
				animationGroups: any,
			) => {
				weapen = newMeshes[0];
				newMeshes.map((a: any) => {
					if (a.name != "__root__") {
						a.rotation = new Vector3(2.2, 1.5, -0.2);
						//a.scaling = new Vector3(0.5, 3, 0.7);
						//a.scale = new Vector3(1, 4, -30);
					}
					// if (a.name == "Jelly Fish Net_primitive0") {
					// 	a.scale = new Vector3(1, 2, 1);
					// }
				});

				this._weapen = weapen;
				this._weapen1 = newMeshes[1];
				this._weapen2 = newMeshes[2];
			},
		);

		const outer = MeshBuilder.CreateBox(
			"outer",
			{ width: 2, depth: 1, height: 3 },
			this.scene,
		);
		outer.isVisible = false;
		outer.isPickable = false;
		outer.checkCollisions = true;

		//move origin of box collider to the bottom of the mesh (to match player mesh)
		outer.bakeTransformIntoVertices(Matrix.Translation(0, 1.5, 0));
		//for collisions
		outer.ellipsoid = new Vector3(1, 1.5, 1);
		outer.ellipsoidOffset = new Vector3(0, 1.5, 0);

		outer.rotationQuaternion = new Quaternion(0, 1, 0, 0);

		SceneLoader.ImportMeshAsync(
			null,
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/model/",
			"player1.glb",
		).then((result: any) => {
			this.hero = result.meshes[0];

			let heroSkle: any = result.skeletons[0];

			this._heroSkle = heroSkle;
			//body is our actual player mesh

			const body = this.hero;
			body.parent = outer;
			body.isPickable = false;
			body.getChildMeshes().forEach((m: any) => {
				m.isPickable = false;
			});

			this.hero.scaling.scaleInPlace(2);

			this.hero.position = new Vector3(0, 0, 0);

			heroSkle.position = new Vector3(0, 0, 0);
			heroSkle.scaling = new Vector3(0.02, 0.02, 0.02);

			weapen.scaling = new Vector3(7, 3, 3);
			weapen.position = new Vector3(-20, -40, 0);

			weapen.attachToBone(heroSkle.bones[10], result.meshes[1]);

			this._run = result.animationGroups[4];
			this._idle = result.animationGroups[0];
			this._catch = result.animationGroups[1];
			this._win = result.animationGroups[2];
			this._loss = result.animationGroups[3];

			this._run.loopAnimation = true;
			this._idle.loopAnimation = true;

			//initialize current and previous
			this._currentAnim = this._idle;
			this._prevAnim = this._win;

			this.mesh = outer as Mesh;
			this.mesh.scaling = new Vector3(2, 2, 2);

			this.mesh.actionManager = new ActionManager(this.scene);
			this.activatePlayerCamera();
			//this._updateGroundDetection();

			this.camera.setTarget(this.mesh.position);
			this.scene.onBeforeRenderObservable.add(() => {
				// always keep the object at the gound

				if (this.Loaded) {
					this.mesh.position.y = -0.1;
				}
				this.text = `Frequency = ${this.frequency} \n Speed = ${
					(this.mobileUp ||
						this.mobileDown ||
						this.mobileLeft ||
						this.mobileRight ||
						this._mobileDash ||
						this._mobileJump) &&
					!this.gamePaused
						? this.speed
						: 0
				} \n Ear = ${this.earType == -1 ? "Left" : "Right"} `;

				this._textDisplay.text = this.text;

				this._scoreDisplay.text = `Score: ${this.score}`;

				if (this.Loaded) {
					this._updateFromKeyboard();

					this._animatePlayer();
					this._updateFromControls();
				}

				if (
					!this.gamePaused &&
					!this.FrequencyPlay &&
					this.Loaded &&
					!this._mobileJump &&
					this.soundCount != this.visualCount
				) {
					this.FrequencyPlay = true;
					setTimeout(() => {
						if (!this.gamePaused) {
							this._playFrequency();
							this._frequencyPlay = true;
							this._soundControl = true;
						}
					}, 8000);
				}

				//for hearing test
				if (this._frequencyPlay) {
					this._frequencyPlay = false;
					setTimeout(() => {
						this.soundCount++;
						this.jumpBtn.isEnabled = false;
						if (this._mobileJump) {
							this.frequencyhear = true;
						} else {
							this._soundControl = false;
							this.lossSound.play();
							this.lossGame = true;
							setTimeout(() => {
								this.lossSound.stop();
								this.lossGame = false;
								this.lossCount++;
								this.count = 0;
								this.score = this.score - 0.5;
								this.FrequencyPlay = false;
							}, 2000);
						}
					}, 3000);
				}

				if (
					this.soundCount == this.visualCount &&
					this.Loaded &&
					!this.gamePaused &&
					this.visualTestCount == 0 &&
					!this.FrequencyPlay
				) {
					this.visualTestCount++;
					this._visualTest.isVisible = true;
					this._soundControl = true;
					setTimeout(() => {
						this._visualTest.isVisible = false;
						setTimeout(() => {
							this.jumpBtn.isEnabled = false;
							if (!this._mobileJump) {
								this.lossSound.play();
								this.lossGame = true;
								this._soundControl = false;
								setTimeout(() => {
									this.lossGame = true;
									this.soundCount = 0;
									this.lossSound.stop();
									this.visualTestCount = 0;
									this.lossCount++;
									this.count = 0;
									this.score = this.score - 0.5;
									this.visualCount = Math.floor(
										Math.random() * (7 - 5 + 1) + 5,
									);
								}, 2000);
							}
						}, 3000);
					}, 1000);
				}
			});
		});

		return scene;
	}
	public activatePlayerCamera(): UniversalCamera {
		this.scene.registerBeforeRender(() => {
			this._updateCamera();
		});

		return this.camera;
	}

	private _createPauseMenu(): void {
		//this.gamePaused = false;

		const controls = new Rectangle();
		controls.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		controls.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		controls.height = 0.8;
		controls.width = 0.5;
		controls.thickness = 0;
		controls.color = "white";
		controls.isVisible = false;
		this._playerUI.addControl(controls);
		this._controls = controls;

		//background image
		const image1 = new Image(
			"controls",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/controls.jpeg",
		);
		controls.addControl(image1);

		const title = new TextBlock("title", "CONTROLS");
		title.resizeToFit = true;
		title.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		title.fontFamily = "Viga";
		title.fontSize = "32px";
		title.top = "14px";
		controls.addControl(title);

		const backBtn = Button.CreateImageOnlyButton(
			"back",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/lanternbutton.jpeg",
		);
		backBtn.width = "40px";
		backBtn.height = "40px";
		backBtn.top = "14px";
		backBtn.thickness = 0;
		backBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
		backBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		controls.addControl(backBtn);

		//when the button is down, make menu invisable and remove control of the menu
		backBtn.onPointerDownObservable.add(() => {
			this._pauseMenu.isVisible = true;
			this._controls.isVisible = false;

			//play transition sound
			this.startSound.play();
			//this.gamePaused = false;
		});

		const pauseMenu = new Rectangle();
		pauseMenu.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		pauseMenu.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		pauseMenu.height = 0.8;
		pauseMenu.width = 0.5;
		pauseMenu.thickness = 0;
		pauseMenu.isVisible = false;

		//background image
		const image = new Image(
			"pause",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/pause.jpeg",
		);
		pauseMenu.addControl(image);

		//stack panel for the buttons
		const stackPanel = new StackPanel();
		stackPanel.width = 0.83;
		pauseMenu.addControl(stackPanel);

		const resumeBtn: any = Button.CreateSimpleButton("resume", "RESUME");
		resumeBtn.width = 0.18;
		resumeBtn.height = "44px";
		resumeBtn.color = "white";
		resumeBtn.fontFamily = "Viga";
		resumeBtn.paddingBottom = "14px";
		resumeBtn.cornerRadius = 14;
		resumeBtn.fontSize = "12px";
		resumeBtn.textBlock.resizeToFit = true;
		resumeBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
		resumeBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		stackPanel.addControl(resumeBtn);

		this._pauseMenu = pauseMenu;

		//when the button is down, make menu invisable and remove control of the menu
		resumeBtn.onPointerDownObservable.add(() => {
			this._pauseMenu.isVisible = false;
			this._playerUI.removeControl(pauseMenu);
			this.pauseBtn.isHitTestVisible = true;

			//game unpaused, our time is now reset
			this.gamePaused = false;

			this.startSound.play();
			// this._startTime = new Date().getTime()

			//--SOUNDS--
			// this._scene.getSoundByName('gameSong').play()
			// this._pause.stop()
		});

		const controlsBtn = Button.CreateSimpleButton("controls", "CONTROLS");
		controlsBtn.width = 0.18;
		controlsBtn.height = "44px";
		controlsBtn.color = "white";
		controlsBtn.fontFamily = "Viga";
		controlsBtn.paddingBottom = "14px";
		controlsBtn.cornerRadius = 14;
		controlsBtn.fontSize = "12px";
		resumeBtn.textBlock.resizeToFit = true;
		controlsBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		controlsBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;

		stackPanel.addControl(controlsBtn);

		//when the button is down, make menu invisable and remove control of the menu
		controlsBtn.onPointerDownObservable.add(() => {
			//open controls screen
			this._controls.isVisible = true;
			this._pauseMenu.isVisible = false;

			//play transition sound
		});

		//set up transition effect
		Effect.RegisterShader(
			"fade",
			"precision highp float;" +
				"varying vec2 vUV;" +
				"uniform sampler2D textureSampler; " +
				"uniform float fadeLevel; " +
				"void main(void){" +
				"vec4 baseColor = texture2D(textureSampler, vUV) * fadeLevel;" +
				"baseColor.a = 1.0;" +
				"gl_FragColor = baseColor;" +
				"}",
		);
		this.fadeLevel = 1.0;

		// quitBtn.onPointerDownObservable.add(() => {
		// 	this.scene.detachControl();
		// 	//this.CreateScene();

		// 	//--SOUNDS--
		// });
	}
	private _createControlsMenu(): void {
		const controls = new Rectangle();
		controls.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		controls.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
		controls.height = 0.8;
		controls.width = 0.5;
		controls.thickness = 0;
		controls.color = "white";
		controls.isVisible = false;
		this._playerUI.addControl(controls);
		this._controls = controls;

		//background image
		const image = new Image(
			"controls",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/controls.jpeg",
		);
		controls.addControl(image);

		const title = new TextBlock("title", "CONTROLS");
		title.resizeToFit = true;
		title.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		title.fontFamily = "Viga";
		title.fontSize = "32px";
		title.top = "14px";
		controls.addControl(title);

		const backBtn = Button.CreateImageOnlyButton(
			"back",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sprites/lanternbutton.jpeg",
		);
		backBtn.width = "40px";
		backBtn.height = "40px";
		backBtn.top = "14px";
		backBtn.thickness = 0;
		backBtn.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
		backBtn.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		controls.addControl(backBtn);

		//when the button is down, make menu invisable and remove control of the menu
		backBtn.onPointerDownObservable.add(() => {
			this._pauseMenu.isVisible = true;
			this._controls.isVisible = false;

			//play transition sound
		});
	}

	private _playFrequency(): void {
		if (this.lossCount > 0) {
			this.volumeControl = this.volumeControl + 0.05;
		}

		if (this.frequencyhear && this.hearCount == 1) {
			this.lossCount = 0;
			this.frequencyhear = false;
			this.frequency = 1000;
		}
		if (this.frequencyhear && this.hearCount == 2) {
			this.lossCount = 0;
			this.frequencyhear = false;
			this.frequency = 2000;
		}
		if (this.frequencyhear && this.hearCount == 3) {
			this.lossCount = 0;
			this.frequencyhear = false;
			this.frequency = 4000;
		}

		if (this.frequency == 4000 && this.hearCount == 4) {
			this.frequency = 500;
			this.hearCount = 0;
			this.earType = this.earType == -1 ? 1 : -1;
		}
		const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		const oscillator = audioCtx.createOscillator();
		var gainNode = audioCtx.createGain();

		const stereoNode = new StereoPannerNode(audioCtx, { pan: this.earType });

		stereoNode.pan.value = this.earType;
		oscillator.type = "sine"; // Set the waveform to a sine wave
		oscillator.frequency.value = this.frequency; // Set the frequency to 400Hz
		gainNode.gain.value = this.volumeControl;

		// Connect the oscillator to the audio destination (speakers)
		oscillator
			.connect(stereoNode)
			.connect(gainNode)
			.connect(audioCtx.destination);

		// Start the oscillator
		oscillator.start();

		// Stop the oscillator after a certain duration (e.g., 1 second)
		setTimeout(() => {
			oscillator.stop();
			audioCtx.close();
		}, 1000);
	}

	private _updateFromKeyboard(): void {
		//forward - backwards movement
		//
		if ((this.inputMap["ArrowUp"] || this.inputMap["w"]) && !this.gamePaused) {
			this.vertical = Scalar.Lerp(this.vertical, 1, 0.2);

			this.verticalAxis = 1;
		} else if (
			(this.inputMap["ArrowDown"] || this.inputMap["s"]) &&
			!this.gamePaused
		) {
			this.vertical = Scalar.Lerp(this.vertical, -1, 0.2);
			this.verticalAxis = -1;
		} else {
			this.vertical = 0;
			this.verticalAxis = 0;
		}

		//left - right movement
		if (
			(this.inputMap["ArrowLeft"] || this.inputMap["a"]) &&
			!this.gamePaused
		) {
			//lerp will create a scalar linearly interpolated amt between start and end scalar
			//taking current horizontal and how long you hold, will go up to -1(all the way left)
			this.horizontal = Scalar.Lerp(this.horizontal, -1, 0.2);
			this.horizontalAxis = -1;
		} else if (
			(this.inputMap["ArrowRight"] || this.inputMap["d"]) &&
			!this.gamePaused
		) {
			this.horizontal = Scalar.Lerp(this.horizontal, 1, 0.2);
			this.horizontalAxis = 1;
		} else {
			this.horizontal = 0;
			this.horizontalAxis = 0;
		}

		if (this.inputMap[" "] && !this.gamePaused) {
			if (this.nCount1 == 1) {
				this.nCount1++;
				this.position.push(
					this.scene
						.getTransformNodeByName("objectdisplay")
						.getAbsolutePosition(),
				);
			}
			if (this.nCount2 == 1) {
				this.nCount2++;
				this.position.push(
					this.scene
						.getTransformNodeByName("objectdisplay.2")
						.getAbsolutePosition(),
				);
			}
			if (this.nCount3 == 1) {
				this.nCount3++;
				this.position.push(
					this.scene
						.getTransformNodeByName("objectdisplay.3")
						.getAbsolutePosition(),
				);
			}
			if (this.nCount4 == 1) {
				this.nCount4++;
				this.position.push(
					this.scene
						.getTransformNodeByName("objectdisplay.4")
						.getAbsolutePosition(),
				);
			}
			if (this.nCount5 == 1) {
				this.nCount5++;
				this.position.push(
					this.scene
						.getTransformNodeByName("objectdisplay.5")
						.getAbsolutePosition(),
				);
			}

			let randomIndex = Math.floor(Math.random() * this.position.length);

			if (this.count == 0) {
				if (randomIndex == this.lastIndex) {
					if (randomIndex == this.position.length - 1) {
						randomIndex = randomIndex - 1;
					} else if (randomIndex == 0) {
						randomIndex = randomIndex + 1;
					} else {
						randomIndex = randomIndex - 1;
					}
				}

				const item = this.position[randomIndex];

				this.count++;
				this.lastIndex = randomIndex;
				this.displayPosition = item;
			}
		}
	}

	// Mobile controls
	// private _setUpMobile(): void {
	// 	//Jump Button

	// 	// no need
	// 	this.jumpBtn.onPointerDownObservable.add(() => {
	// 		this._mobileJump = true;
	// 		this.jumpBtn.isEnabled = false;
	// 	});F
	// 	// this.jumpBtn.onPointerUpObservable.add(() => {
	// 	// 	this._mobileJump = false;
	// 	// });

	// 	//no need
	// 	//Dash Button
	// 	this.dashBtn.onPointerDownObservable.add(() => {
	// 		this._mobileDash = true;
	// 	});
	// 	this.dashBtn.onPointerUpObservable.add(() => {
	// 		this._mobileDash = false;
	// 	});

	// 	//Arrow Keys
	// 	this.leftBtn.onPointerDownObservable.add(() => {
	// 		this.mobileLeft = true;
	// 	});
	// 	this.leftBtn.onPointerUpObservable.add(() => {
	// 		this.mobileLeft = false;
	// 	});

	// 	this.rightBtn.onPointerDownObservable.add(() => {
	// 		this.mobileRight = true;
	// 	});
	// 	this.rightBtn.onPointerUpObservable.add(() => {
	// 		this.mobileRight = false;
	// 	});

	// 	this.upBtn.onPointerDownObservable.add(() => {
	// 		this.mobileUp = true;
	// 	});
	// 	this.upBtn.onPointerUpObservable.add(() => {
	// 		this.mobileUp = false;
	// 	});

	// 	this.downBtn.onPointerDownObservable.add(() => {
	// 		this.mobileDown = true;
	// 	});
	// 	this.downBtn.onPointerUpObservable.add(() => {
	// 		this.mobileDown = false;
	// 	});
	// }

	private _updateFromControls(): void {
		this._deltaTime = this.scene.getEngine().getDeltaTime() / 1000.0;

		this._moveDirection = Vector3.Zero();

		this._h = this.horizontal; //right, x
		this._v = this.vertical; //fwd, z

		// }

		//--MOVEMENTS BASED ON CAMERA (as it rotates)--
		let fwd = this._camRoot.forward;
		let right = this._camRoot.right;
		let correctedVertical = fwd.scaleInPlace(this._v);
		let correctedHorizontal = right.scaleInPlace(this._h);

		//movement based off of camera's view
		let dashFactor = 1;
		let move = correctedHorizontal.addInPlace(correctedVertical);
		//clear y so that the character doesnt fly up, normalize for next step, taking into account whether we've DASHED or not
		this._moveDirection = new Vector3(
			move.normalize().x,
			0,
			move.normalize().z,
		);

		//clamp the input value so that diagonal movement isn't twice as fast
		let inputMag = Math.abs(this._h) + Math.abs(this._v);

		if (inputMag < 0) {
			this._inputAmt = 0;
		} else if (inputMag > 1) {
			this._inputAmt = 1;
		} else {
			this._inputAmt = inputMag;
		}
		//final movement that takes into consideration the inputs

		this._inputAmt = 1;
		this._moveDirection = this._moveDirection.scaleInPlace(
			this._inputAmt * MainScene.PLAYER_SPEED,
		);

		//check if there is movement to determine if rotation is needed
		//let input = new Vector3(this.horizontalAxis, 0, this.verticalAxis); //along which axis is the direction
		let input = new Vector3(this.horizontalAxis, 0, this.verticalAxis); //along which axis is the direction
		if (input.length() == 0) {
			//if there's no input detected, prevent rotation and keep player in same rotation
			return;
		}

		//rotation based on input & the camera angle
		let angle = Math.atan2(this.horizontalAxis, this.verticalAxis);
		angle += this._camRoot.rotation.y;
		let targ = Quaternion.FromEulerAngles(0, angle, 0);
		this.mesh.rotationQuaternion = Quaternion.Slerp(
			this.mesh.rotationQuaternion,
			targ,
			10 * this._deltaTime,
		);

		this.mesh.moveWithCollisions(this._moveDirection);
	}

	private _animatePlayer(): void {
		//this.scene.stopAllAnimations();

		if (
			(this.inputMap["w"] ||
				this.inputMap["a"] ||
				this.inputMap["s"] ||
				this.inputMap["d"] ||
				this.inputMap["ArrowUp"] ||
				this.mobileUp ||
				this.inputMap["ArrowDown"] ||
				this.mobileDown ||
				this.inputMap["ArrowLeft"] ||
				this.mobileLeft ||
				this.inputMap["ArrowRight"]) &&
			!this.gamePaused
		) {
			this._currentAnim = this._run;

			this.onRun.notifyObservers(true);
		} else if (
			(this.inputMap["Shift"] || this._mobileDash) &&
			!this.gamePaused
		) {
			this._currentAnim = this._catch;

			// this.object.position.x = this._heroSkle.bones[10].position.x - 10;
			// this.object.position.z = this._heroSkle.bones[10].position.z - 10;

			//this.onRun.notifyObservers(t);
		} else if (this.lossGame && !this.gamePaused) {
			this._currentAnim = this._loss;
		} else if (this.winGame && !this.gamePaused) {
			this._currentAnim = this._win;
		} else if (
			!this.mobileUp ||
			!this.mobileDown ||
			!this.mobileLeft ||
			!this.mobileRight ||
			!this._mobileDash
		) {
			this._currentAnim = this._idle;
			this.onRun.notifyObservers(false);
		}

		if (this._currentAnim != null && this._prevAnim !== this._currentAnim) {
			this._prevAnim.stop();

			this._currentAnim.play(this._currentAnim.loopAnimation);

			this._prevAnim = this._currentAnim;
		}

		if (
			(!this.mobileUp ||
				!this.mobileDown ||
				!this.mobileLeft ||
				!this.mobileRight ||
				!this._mobileDash) &&
			!this.gamePaused &&
			(this._mobileJump || this.inputMap[" "]) &&
			this._soundControl
		) {
			this._mobileJump = true;
			this._currentAnim = this._run;
			this.onRun.notifyObservers(true);
			this._currentAnim.play(this._currentAnim.loopAnimation);
			this.vertical = 0;
			this.verticalAxis = 0;

			if (
				Math.round(this.displayPosition.x) < Math.round(this.mesh.position.x) &&
				this._hCount == 0 &&
				this._vCount == 0
			) {
				this.horizontal = Scalar.Lerp(this.horizontal, -1, 0.2);
				this.horizontalAxis = -1;
			} else if (
				Math.round(this.displayPosition.x) > Math.round(this.mesh.position.x) &&
				this._hCount == 0 &&
				this._vCount == 0
			) {
				this.horizontal = Scalar.Lerp(this.horizontal, 1, 0.2);
				this.horizontalAxis = 1;
			}

			if (
				Math.round(this.displayPosition.x) == Math.round(this.mesh.position.x)
			) {
				if (
					Math.round(this.displayPosition.z) <
					Math.round(this.mesh.position.z) + 10
				) {
					this._hCount++;
					this.vertical = Scalar.Lerp(this.vertical, -1, 0.2);
					this.verticalAxis = -1;
				} else if (
					Math.round(this.displayPosition.z) >
					Math.round(this.mesh.position.z) + 10
				) {
					this._vCount++;
					this.vertical = Scalar.Lerp(this.vertical, 1, 0.2);

					this.verticalAxis = 1;
				}
			}

			if (
				Math.round(this.displayPosition.x) ==
					Math.round(this.mesh.position.x) &&
				Math.round(this.displayPosition.z) ==
					Math.round(this.mesh.position.z) + 10
			) {
				if (this._hCount > 0 && this.RotateCount < 2) {
					this.RotateCount++;

					this.vertical = Scalar.Lerp(this.vertical, 1, 0.2);
					this.verticalAxis = 1;
				}
				this._soundControl = false;

				this._hCount = 0;
				this._vCount = 0;
				this._mobileJump = false;
				this._prevAnim = this._currentAnim;
				this._prevAnim.stop();
				this._currentAnim = this._idle;
				this.onRun.notifyObservers(false);
				this._currentAnim.play(this._currentAnim.loopAnimation);
				this._prevAnim = this._currentAnim;
				this.object.position = this.displayPosition;
				this.object.position.y = 5;
				this.object.position.z = this.displayPosition.z - 5;
				this.object.position.x = this.displayPosition.x + 2;
				this.object.isVisible = true;

				setTimeout(() => {
					this._textDisplay1.isVisible = true;
					console.log(
						this._heroSkle.bones[10].position.z,
						this._heroSkle.bones[10].position.x,
					);
					setTimeout(() => {
						this._textDisplay1.isVisible = false;
						this._textDisplay2.isVisible = true;

						this.object.position.z = this._heroSkle.bones[10].position.z - 5;
						this.object.position.x = this._heroSkle.bones[10].position.x + 2;
						setTimeout(() => {
							this._textDisplay2.isVisible = false;
							this._textDisplay3.isVisible = true;

							setTimeout(() => {
								this._mobileDash = true;
								this._textDisplay3.isVisible = false;
								setTimeout(() => {
									this._mobileDash = false;

									this.object.isVisible = false;
									this.vertical = Scalar.Lerp(this.vertical, 1, 0.2);
									this.verticalAxis = 1;
									this.winGame = true;
									if (this.visualTestCount == 1) {
										this.visualCount = Math.floor(
											Math.random() * (7 - 5 + 1) + 5,
										);
										this.visualTestCount = 0;
										this.soundCount = 0;
									} else {
										this.hearCount = this.hearCount + 1;
									}
									this.winSound.play();
									setTimeout(() => {
										this.winSound.stop();
										this.winGame = false;
										this.score = this.score + 1;
										this.count = 0;
										this.FrequencyPlay = false;
									}, 2000);
								}, 700);
							}, 1000);
						}, 1000);
					}, 1000);
				}, 2000);
			}
		}
	}

	private _updateCamera(): void {
		//trigger areas for rotating camera view

		let centerPlayer = this.mesh.position.y + 2;

		this._camRoot.position = Vector3.Lerp(
			this._camRoot.position,
			new Vector3(this.mesh.position.x, centerPlayer, this.mesh.position.z),
			0.4,
		);
	}

	private _setupPlayerCamera(): UniversalCamera {
		//root camera parent that handles positioning of the camera to follow the player
		this._camRoot = new TransformNode("root");
		this._camRoot.position = new Vector3(0, 0, 0); //initialized at (0,0,0)
		//to face the player from behind (180 degrees)
		this._camRoot.rotation = new Vector3(0, 0, 0);

		//rotations along the x-axis (up/down tilting)
		let yTilt = new TransformNode("ytilt");
		//adjustments to camera view to point down at our player

		yTilt.rotation = MainScene.ORIGINAL_TILT;
		this._yTilt = yTilt;
		yTilt.parent = this._camRoot;

		//our actual camera that's pointing at our root's position
		this.camera = new UniversalCamera(
			"cam",
			new Vector3(0, 0, -30),
			this.scene,
		);
		this.camera.lockedTarget = this._camRoot.position;
		this.camera.fov = 0.47350045992678597;
		this.camera.parent = yTilt;

		this.scene.activeCamera = this.camera;
		return this.camera;
	}

	private _loadSounds(): void {
		this.startSound = new Sound(
			"pleasentsound",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sounds/background.mp3",
			this.scene,
			function () {},
			{
				loop: true,
				volume: 0.2,
				playbackRate: 0.6,
			},
		);

		this.walkSound = new Sound(
			"walk",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sounds/walk.mp3",
			this.scene,
			function () {},
			{ volume: 0.3 },
		);

		this.winSound = new Sound(
			"win",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sounds/win1.mp3",
			this.scene,
			function () {},
			{ volume: 0.3 },
		);

		this.lossSound = new Sound(
			"loss",
			"https://pacecode.sgp1.cdn.digitaloceanspaces.com/sounds/loss1.mp3",
			this.scene,
			function () {},
			{
				volume: 0.3,
			},
		);
	}
}
