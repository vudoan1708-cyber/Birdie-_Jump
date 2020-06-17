p5.disableFriendlyErrors = true; // disables FES
let x_menu = 400;
let y_menu = 150;
let instructionTime = 0;
//game play content
let birdie;
let birdie2;
let birdie3;
let plane = []; //an empty array initiated
let floors = [];
let bonus = [];
let bonus2 = [];
let bonusMode1 = [];
let bonusMode1_2 = [];
let wall;
let suns;
let cols;
let btn;
let canon;
let d = 100;
let portal;

let cols_mode3;
let rows_mode3;
let w = 120;
let h = 50;
let grid;
let currentTotal = 0;
let givenNum;

//assets:img
let birdImg4;
let birdImg3;
let birdImg2;
let birdImg1;
let planeImg;
let sunImg;
let sun_coolImg;
let sun_surprise;
let bgImg;
let bgMenuImg;
let bgGarden;
let floorImg;
let moveForwardsSign;
let sizeReduce;
let galaxy;
let canonImg;
let brickImg;
let portalImg;
let portalGamePlayImg;



//assets:songs && sounds
let intro;
let flap;
let fall;
let game_score;
let hit;
let uh_oh;
let hover_play_button;
let hover_play_button2;
let play_button_clicked;
let collide;
let forwards;
let sizeReduceSound;
let brick;
let portal_enter;
let hitWood;

let gameOver_VoiceOverbad = [],
	gameOver_VoiceOverVerygood = [],
	gameOver_VoiceOvergood = [],
	gameOver_VoiceOverokay = [];

//game mechanism
let loading = true;

let mode = -1,
	score = 0,
	time = 0,
	thornSize = 60,
	countUp = 0;

let touchScreen = false;
	hoverPlayed = false,
	hoverPlayed2 = false,
	fallSound = false,
	hitOnce = false,
	counterTriggered = false,
	instructionClose2 = false,
	instructionClose1 = false,
	imgReverse = false,
	Counter_Wall_Up = false,
	portal_ShowTime = false,
	WoodGetHit = false,
	birdie2Fall = false,
	jumpTriggered = false,
	pushPlane = false,
	loadingGame = true,
	lost = false;

let countUpPortal = 0,
	jumpTime = 0,
	numImg = 17,
	numSounds = 27,
	loadingElement = 0;

let highestScore = null,
	highestScore2 = null,
	account = null;

let account_name,
	pass;

const accAvailable = document.getElementsByTagName('p');

// get the highest score from the database
async function getHighestScore() {
	const response = await fetch('/score/');
	highestScore = await response.json();

	const response2 = await fetch('/score2/');
	highestScore2 = await response2.json();
	return highestScore, highestScore2;
}

async function getAcc() {
	const response = await fetch('/acc/');
	account = await response.json();
	return account;
}

function mediaLoader() {
	loadingElement++;
	if (loadingElement == (numImg + numSounds)) {
		intro.loop();
		intro.setVolume(0.5);
		loadingGame = false;
	}
}

async function AccValidation(num) {
	
	// get the input HTML element
	const account_signinHTML = document.getElementById('account'),
		account_signupHTML = document.getElementById('signup'),
		signInChecked = document.getElementById('signInChecked');

	// CHANGING BETWEEN SIGN-IN AND SIGN-UP SCREEN
	if (num == -1) {
		account_signinHTML.style.visibility = 'hidden';
		account_signinHTML.style.opacity = 0;
		account_signupHTML.style.visibility = 'visible';
		account_signupHTML.style.opacity = 1;
	} else if (num == null) {
		account_signinHTML.style.visibility = 'visible';
		account_signinHTML.style.opacity = 1;
		account_signupHTML.style.visibility = 'hidden';
		account_signupHTML.style.opacity = 0;

		accAvailable[3].style.visibility = 'hidden';
		accAvailable[2].style.visibility = 'hidden';
		accAvailable[0].style.visibility = 'hidden';
	}
	
	// SIGN-UP
	if (num == 0) {

		// get account data from the database
		await getAcc();

		// loop through the obtained data
		for (let a = 0; a < account.length; a++) {

			// check if the account has been signed up
			if (account_name_up.value == account[a].account_name) {
				
				if (accAvailable[3].style.visibility == 'visible') {
					accAvailable[3].style.visibility = 'hidden';
				}

				accAvailable[2].style.visibility = 'visible';
				break;
			}

			// or if there's no user input
			else if (account_name_up.value == '') {

				if (accAvailable[2].style.visibility == 'visible') {
					accAvailable[2].style.visibility = 'hidden';
				}

				accAvailable[3].style.visibility = 'visible';
				break;
			}

			// otherwise
			else if (account_name_up.value != account[a].account_name) {

				// check if every data is checked
				if (a == account.length - 1) {

					// create a data object with account and password data
					const data = {
						account_name: account_name_up.value,
						password: pass_up.value
					}

					// create option 
					const options = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(data)
					};

					// create a response to an endpoint 
					const response = await fetch('/acc/', options);
					await response.json();

					account_signinHTML.style.visibility = 'visible';
					account_signinHTML.style.opacity = 1;
					account_signupHTML.style.visibility = 'hidden';

					break;
				}
			}
		}
	}

	// SIGN-IN / LOG-IN
	else if(num == 1) {

		// get account data from the database
		await getAcc();

		// wait for data to be obtained, then loop through it
		for (let a = 0; a < account.length; a++) {
			
			// check for validation
			if (account_name_in.value == account[a].account_name 
				&& pass_in.value == account[a].password) {

					account_signinHTML.style.display = 'none';
					account_signupHTML.style.display = 'none';

					// assign the signed-in account data to a global variable
					// to post the data to database after the gameplay
					account_name = account_name_in.value;
					pass = pass_in.value;

					// start the welcome section
					mode = 0;

				// or if there is no user input
				} else if (account_name_in.value == '' 
					&& pass_in.value == '') {
						signInChecked.innerHTML = 'You need to provide information before proceeding';
						signInChecked.style.visibility = 'visible';
				}
				
				// otherwise
				else {
					signInChecked.innerHTML = 'This account does not exist';
					signInChecked.style.visibility = 'visible';
				}
		}
	}

	if (mode == 0) {
		await getHighestScore();
	}
}

function setup() {
	createCanvas(1200, 450).parent("canvasHolder");
	angleMode(DEGREES);
	textAlign(CENTER);
	birdie = new Birdie(); //call back for Birdie class
	birdie2 = new Birdie2();

	// clouds = new Clouds();
	suns = new Suns();
	wall = new Wall(); // bonus in mode 1
	portal = new Tele_Portal(); // bonus number 2 in mode 1

	//game menu
	btn = new Button();
	cols = new Rectangles();

	//mode 3
	birdie3 = new Birdie3();
	// givenNum = new GivenNum();
	// canon = new drawCanon();
	//putting numbers in the board using 2d array
	cols_mode3 = floor(width / w);
	rows_mode3 = floor(height / 9);

	//images
	birdImg4 = loadImage("assets/img/bird4.png", mediaLoader);
	birdImg3 = loadImage("assets/img/bird3.png", mediaLoader);
	birdImg2 = loadImage("assets/img/bird2.png", mediaLoader);
	birdImg1 = loadImage("assets/img/bird.png", mediaLoader);
	planeImg = loadImage("assets/img/plane.png", mediaLoader);
	sunImg = loadImage("assets/img/sun.png", mediaLoader);
	sun_coolImg = loadImage("assets/img/sun_cool.png", mediaLoader);
	sun_surprise = loadImage("assets/img/sun_surprise.png", mediaLoader);
	// canonImg = loadImage("assets/img/canon.png",mediaLoader);
	brickImg = loadImage("assets/img/brick.png", mediaLoader);
	portalImg = loadImage("assets/img/portal.png", mediaLoader);
	portalGamePlayImg = loadImage("assets/img/portalGamePlay.png", mediaLoader);
	// cloudImg = loadImage("assets/img/cloud.png");
	bgImg = loadImage("assets/img/bg1.png", mediaLoader);
	bgMenuImg = loadImage("assets/img/bg.png", mediaLoader);
	//mode 2
	bgGarden = loadImage("assets/img/garden.png", mediaLoader);
	floorImg = loadImage("assets/img/soil.png", mediaLoader);
	moveForwardsSign = loadImage("assets/img/moveForwards.png", mediaLoader);
	sizeReduce = loadImage("assets/img/sizeReduce.png", mediaLoader);
	//mode 3

	//sounds and songs
	intro = loadSound("assets/sound effects/sweet_spot.mp3", mediaLoader);
	flap = loadSound("assets/sound effects/wing_flaps.mp3", mediaLoader);
	fall = loadSound("assets/sound effects/free_fall.mp3", mediaLoader);
	game_score = loadSound("assets/sound effects/game_score.mp3", mediaLoader);
	hit = loadSound("assets/sound effects/hit.mp3", mediaLoader);
	uh_oh = loadSound("assets/sound effects/uh_oh.mp3", mediaLoader);
	hover_play_button = loadSound("assets/sound effects/hover_play_button.mp3", mediaLoader);
	hover_play_button2 = loadSound("assets/sound effects/hover_play_button2.mp3", mediaLoader);
	play_button_clicked = loadSound("assets/sound effects/play_button_clicked.mp3", mediaLoader);
	collide = loadSound("assets/sound effects/collide.mp3", mediaLoader);
	forwards = loadSound("assets/sound effects/forwards.mp3", mediaLoader);
	sizeReduceSound = loadSound("assets/sound effects/sizeReduce.mp3", mediaLoader);
	brick = loadSound("assets/sound effects/brick.mp3", mediaLoader);
	hitWood = loadSound("assets/sound effects/hitWood.mp3", mediaLoader);
	portal_enter = loadSound("assets/sound effects/portal_enter.mp3", mediaLoader);

	// VOICE OVER
	// very good
	gameOver_VoiceOverVerygood[0] = loadSound("assets/sound effects/voice_over/call it a day.mp3", mediaLoader);
	gameOver_VoiceOverVerygood[1] = loadSound("assets/sound effects/voice_over/damn good hacker.mp3", mediaLoader);
	gameOver_VoiceOverVerygood[2] = loadSound("assets/sound effects/voice_over/hack my game.mp3", mediaLoader);

	// really bad
	gameOver_VoiceOverbad[0] = loadSound("assets/sound effects/voice_over/i won't say anything.mp3", mediaLoader);
	gameOver_VoiceOverbad[1] = loadSound("assets/sound effects/voice_over/is ur day that bad.mp3", mediaLoader);
	gameOver_VoiceOverbad[2] = loadSound("assets/sound effects/voice_over/little piece of lovee.mp3", mediaLoader);
	gameOver_VoiceOverbad[3] = loadSound("assets/sound effects/voice_over/more practice.mp3", mediaLoader);
	gameOver_VoiceOverbad[4] = loadSound("assets/sound effects/voice_over/amazing.mp3", mediaLoader);

	// good
	gameOver_VoiceOvergood[0] = loadSound("assets/sound effects/voice_over/not toooo bad.mp3", mediaLoader);
	gameOver_VoiceOvergood[1] = loadSound("assets/sound effects/voice_over/need some help.mp3", mediaLoader);

	// okay
	gameOver_VoiceOverokay[0] = loadSound("assets/sound effects/voice_over/that's kinda nice.mp3", mediaLoader);
	gameOver_VoiceOverokay[1] = loadSound("assets/sound effects/voice_over/how much I score.mp3", mediaLoader);
}

//game function
function keyPressed() {
	if (!touchScreen) {
		if (key == " ") {
			if (mode == 1) {
				birdie.jump();
				flap.play();
			} else if (mode == 2) {
				birdie2.jump();
				flap.play();
				jumpTriggered = true;
			} else if (mode == 3) {

				birdie3.jump();
				flap.play();
				jumpTime++;
			}
		}
	}
}

function touchStarted() {
	if (mode == 0) {		
		if (btn.clickedMode1()) {
			mode = 1;
			touchScreen = true;
			play_button_clicked.play();
			intro.stop();
		}

		if (btn.clickedMode2()) {
			mode = 2;
			touchScreen = true;
			play_button_clicked.play();
			intro.stop();
		}
	} else if (mode == 1) {
		if (touchScreen) {
			if (btn.clickedCloseInstruction()) {
				if (instructionTime < 150) {
					instructionClose1 = true;
					hover_play_button.play();
				}
			}
			if (mouseX > 0 && mouseX < width) {
				if (mouseY > 0 && mouseY < height) {
					birdie.jump();
					flap.play();
				}
			}
		}

	} else if (mode == 2) {
		if (touchScreen) {
			if (btn.clickedCloseInstruction()) {
				if (instructionTime < 400) {
					instructionClose2 = true;
					hover_play_button.play();
				} 
			}
			if (mouseX > birdie2.x_pos && mouseX < birdie2.x_pos + birdie2.size) {
				if (mouseY > birdie2.y_pos && mouseY < birdie2.y_pos + birdie2.size) {
					jumpTriggered = true;
				}
			}
			if (mouseX > 0 && mouseX < width) {
				if (mouseY > 0 && mouseY < height) {
					birdie2.jump();
					flap.play();
				}
			}
		}
	}

	// restart game
	if (lost) {
		if (touchScreen) {
			if (mouseX > 0 && mouseX < width) {
				if (mouseY > 0 && mouseY < height) {
					mode = 0;
					loop();
					playGame();
					restartGamePlay();
				}
			}
		}
	}
}


function instruction() {
	background(51, 220);
	if (mode == 1) {
		push();
		fill(255);
		textSize(30);
		textFont("Georgia");
		text("Hit SPACEBAR / TAP on the screen to jump over the planes", width / 2, height / 2 + d / 5);
		text("All the PICKUPS will have some SIDE EFFECTS", width / 2, height - height / 3 + d / 5);
		pop();
	} else if (mode == 2) {
		push();
		fill(255);
		textSize(30);
		textFont("Georgia");
		text("1. Hit SPACEBAR / TAP on the bird to make the bird fall", width / 2, height / 3);
		text("2. Hit SPACEBAR / TAP on the screen constantly to keep the bird from FALLING DOWN", width / 2, height / 2);
		text("3. and try hard to STAY AWAY from the THORNS", width / 2, height / 1.5);
		pop();
	}
}

//as soon as all the conditions are satisfied in mousePressed, the game will be executed
function playGame() {

	// sign-up / log-in section
	if (mode == -1) {
		background(59, 204, 202);
		
		// get the input HTML element
		const account_signinHTML = document.getElementById('account');
		account_signinHTML.style.visibility = 'visible';
	}

	// welcome screen
	else if (mode == 0) {

		background(55, 204, 187, 80);
		cols.show();
		birdie.show4(); //purple fat bird
		birdie.update3();
		birdie.show2(); //dark blue bird
		birdie.show1(); //light blue bird
		btn.show();
		btn.hovered();
		instructionClose2 = false; //can't click close even before it shows up
		instructionClose1 = false;
		closeBtn_Hovered = false;
		// gameResetShow = false;

	// mode 1
	} else if (mode == 1) {
		//draw background and foreground elements
		background(bgImg);
		drawBonus_Mode1();
		displayBonus_Mode1();
		wall.show();
		birdie.show3();
		birdie.move();
		drawPlanes();
		display();

		// set time for instructions
		if (instructionTime < 150) {
			if (!instructionClose1) {
				instruction();
				instructionTime++;
				btn.showClose();
			}
		} else {
			instructionClose1 = true;
		}
		if (instructionClose1) {
			pushPlane = true;
		}

	// mode 2
	} else if (mode == 2) {
		background(bgGarden);
		drawBonus();
		displayBonus();
		birdie2.show();
		if (jumpTriggered) {
			birdie2.updateJump_Vel();
			if (!fallSound) {
				fall.play();
				fallSound = true;
			}
		}
		drawFloors();
		display2();

		//draw thorns/spikes
		for (let tri = 0; tri < 450; tri += 45) {
			push();
			strokeWeight(4);
			fill(255, 202, 118);
			triangle(0, tri, thornSize, 22.5 + tri, 0, tri + 45);
			pop();
		}
		// set time for instructions
		if (instructionTime < 400) {
			if (!instructionClose2) {
				instruction();
				instructionTime++;
				btn.showClose();
			}
		} else {
			instructionClose2 = true;
		}

	} else if (mode == 3) {
		// background(51);
		// strokeWeight(2);
		// givenNum.show(); //number to achieve
		// drawHealthBar();
		// line(0, height / 3, width, height / 3); //line to separate teams (0, 150)
		// line(0, height / 3 - d, width, height / 3 - d); //line for health bar (0, 50)
		// line(0, height / 3 + d / 2, width, height / 3 + d / 2); //line for health bar (0, 200)
		// line(0, height - d / 2, width, height - d / 2); //line for bird (0, 400)
		// canon.show();

		// drawBoard();

		// birdie3.show();
		// birdie3.moveX();
		// birdie3.moveY();

	}
}

// reset every global variable back to the starting point
async function restartGamePlay() {
	
	// update the highest score
	await getHighestScore();
	
	lost = false;

	// mode 1
	plane.splice(0);
	bonusMode1.splice(0);
	bonusMode1_2.splice(0);
	suns.show();
	score = 0;
	
	// reset time for instructions
	instructionTime = 0;
	instructionClose1 = false;
	if (instructionTime < 150) {
		if (!instructionClose1) {
			instruction();
			instructionTime++;
			btn.showClose();
		}
	} else {
		instructionClose1 = true;
	}
	if (instructionClose1) {
		pushPlane = true;
	}

	// TELEPORT PORTAL
	countUpPortal = 200;
	portal_ShowTime = true;
	if (portal_ShowTime) {
		countUpPortal++; // count time for portal show time

		if (countUpPortal < 200) {
			portal.show_portal1();
			portal.show_portal2();

		} else {
			countUpPortal = 0;
			portal_ShowTime = false;
		}

	}
	
	// WALL, and birdie's size in mode 2
	countUp = 400;
	Counter_Wall_Up = true;
	if (Counter_Wall_Up) {
		countUp++;
		if (countUp < 200) {
			wall.buildUp();
		} else {
			wall.h = d;
			Counter_Wall_Up = false;
			countUp = 0;
		}
	}

	// mode 2
	floors.splice(0);
	bonus.splice(0);
	bonus2.splice(0);
	time = 0;
	instructionClose2 = false;
	jumpTriggered = false;
	birdie2.x_pos = width / 4 * 3;
	birdie2.y_pos = 0;
	birdie2.size = 70;
	counterTriggered = false;
}

//if mouse is clicked on the assigned area, game is ready to play
function mousePressed() {
	if (mode == 0) { //if the game is not playing, click and play the game
		if (btn.clickedMode1()) {
			mode = 1;
			touchScreen = false;
			play_button_clicked.play();
			intro.stop();
		}
		if (btn.clickedMode2()) {
			mode = 2;
			touchScreen = false;
			play_button_clicked.play();
			intro.stop();
		}
	}
	if (mode == 2) {
		if (btn.clickedCloseInstruction()) {
			if (instructionTime < 400) {
				instructionClose2 = true;
				hover_play_button.play();
			} 
		}
	} else if (mode == 1) {
		if (btn.clickedCloseInstruction()) {
			if (instructionTime < 150) {
				instructionClose1 = true;
				hover_play_button.play();
			}
		}
	}

	// restart game
	if (lost) {
		if (mouseX > 0 && mouseX < width) {
			if (mouseY > 0 && mouseY < height) {
				mode = 0;
				loop();
				playGame();
				restartGamePlay();
			}
		}
	}
}

function draw() {
	if (loadingGame) {
		background(51);
		push();
		translate(width / 2, height / 2);
		let x = 0;
		let y = 0;
		let r = 200; // radius	
		let angle = 360 * loadingElement / (numImg + numSounds); // angle being calculated by the number of media files
		let mappingAngle = map(angle, 0, 360, 0, 100);
		let mappingFillR = map(angle, 0, 360, 100, 255);
		let mappingFillG = map(random(angle), 0, 360, 0, 100);
		let mappingFillB = map(random(angle), 0, 360, 0, 255);
		noFill();
		ellipseMode(CENTER);
		ellipse(x, y, r * 2);
		stroke(255);
		strokeWeight(30);
		ellipse(x, y, r * 1.75);
		ellipse(x, y, r * 2.25);
		stroke(mappingFillR, mappingFillG, mappingFillB);
		strokeWeight(50);
		let dx = r * cos(angle);
		let dy = r * sin(angle);

		beginShape();
			vertex(x + dx, y + dy);
		endShape(CLOSE);

		strokeWeight(2);
		line(x, y, x + dx, y + dy);
		textSize(15);
		fill(0, 200);
		text("Loading", x + dx, y + dy);
		text(int(mappingAngle), x + dx, y + dy + 20);
		pop();
	} else playGame();
}

async function resetGameDisplay() {
	lost = true;

	push();
	rectMode(CENTER);
	fill(10, 80);
	noStroke();
	rect(width / 2, height / 2, 500, 200);
	fill(0);
	rect(width / 2, height / 2 - d, 500, d + 50);
	fill(255);
	textSize(width / 30);
	textFont("Georgia");

	if (mode == 1) {

		// loop through the obtained score data
		for (let s = 0; s < highestScore.length; s++) {

			// check for the accounts
			if (account_name == highestScore[s].account_name) {

				push();
					textSize(width / 40);
					text("Highest Score is : " + highestScore[s].score, width / 2, height / 2 - 180 + d / 1.5);
				pop();

				// check if there is data from the database
				if (highestScore != undefined || highestScore != null) {

					// and if the highest score is less than current score
					if (highestScore[s].score < score) {
						
						// post the data to the database
						// create a data instance to store data
						const data = {
							account_name,
							pass,
							score
						};

						// create options
						const options = {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(data)
						};

						// fetch the endpoint
						const response = await fetch('/score/', options);
						await response.json();

						// change fill color
						fill(0, 255, 0, 200);
						break;
					} else {
						fill(255, 0, 0, 200);
						break;
					}
				}

			// otherwise, which means this is the first time player
			} else if (highestScore[s].account_name == undefined ||
						highestScore[s].account_name == null ||
						highestScore[s].account_name == '' ||
						account_name != highestScore[s].account_name) {

				// check if the last data is checked
				// which means, every datum has been checked
				// and still, there is no account name matches up with the data
				if(s == highestScore.length - 1) {
					push();
						textSize(width / 40);
						text("No Highest Record Yet", width / 2, height / 2 - 180 + d / 1.5);
					pop();
						
					// no need for checking score from the database
					// post the data to the database
					// create a data instance to store data
					const data = {
						account_name,
						pass,
						score
					};

					// create options
					const options = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(data)
					};

					// fetch the endpoint
					const response = await fetch('/score/', options);
					await response.json();

					// change fill color
					fill(0, 255, 0, 200);
				}
			}
		} 

		text("Your Score is: " + score, width / 2, height / 2 - 125 + d / 1.5);

		//voice over before the reset 
		if (score <= 5) {
			random(gameOver_VoiceOverbad).play();
		} else if (score > 5 && score <= 10) {
			random(gameOver_VoiceOverokay).play();
		} else if (score > 10 && score <= 30) {
			random(gameOver_VoiceOvergood).play();
		} else if (score > 30) {
			random(gameOver_VoiceOverVerygood).play();
		}
	} else if (mode == 2) {
		if (time > 1) {

			// loop through the obtained score data
			for (let s = 0; s < highestScore2.length; s++) {

				// check for the accounts
				if (account_name == highestScore2[s].account_name) {

					push();
						textSize(width / 40);
						text("Highest Score is : " + highestScore2[s].time + " seconds", width / 2, height / 2 - 180 + d / 1.5);
					pop();

					// check if there is data from the database
					if (highestScore2 != undefined || highestScore2 != null) {

						// and if the highest score is less than current score
						if (highestScore2[s].time < time) {
							
							// post the data to the database
							// create a data instance to store data
							const data = {
								account_name,
								pass,
								time
							};

							// create options
							const options = {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify(data)
							};

							// fetch the endpoint
							const response = await fetch('/score2/', options);
							await response.json();

							// change fill color
							fill(0, 255, 0, 200);
							break;
						} else {
							fill(255, 0, 0, 200);
							break;
						}
					}

				// otherwise, which means this is the first time player
				} else if (highestScore2[s].account_name == undefined ||
							highestScore2[s].account_name == null ||
							highestScore2[s].account_name == '' ||
							account_name != highestScore2[s].account_name) {

					// check if the last data is checked
					// which means, every datum has been checked
					// and still, there is no account name matches up with the data
					if(s == highestScore2.length - 1) {
						push();
							textSize(width / 40);
							text("No Highest Record Yet", width / 2, height / 2 - 180 + d / 1.5);
						pop();
							
						// no need for checking score from the database
						// post the data to the database
						// create a data instance to store data
						const data = {
							account_name,
							pass,
							time
						};

						// create options
						const options = {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(data)
						};

						// fetch the endpoint
						const response = await fetch('/score2/', options);
						await response.json();

						// change fill color
						fill(0, 255, 0, 200);
					}
				}
			}
			text("Your Score is: " + time + " seconds", width / 2, height / 2 - 125 + d / 1.5);

		} else {
			text("Your Score is: " + time + " second", width / 2, height / 2 - 125 + d / 1.5);
		}
		//voice over before the reset 
		if (time <= 20) {
			random(gameOver_VoiceOverbad).play();
		} else if (time > 20 && time <= 50) {
			random(gameOver_VoiceOverokay).play();
		} else if (time > 50 && time <= 80) {
			random(gameOver_VoiceOvergood).play();
		} else if (time > 80) {
			random(gameOver_VoiceOverVerygood).play();
		}
	}
	fill(255);
	text("Press anywhere to restart", width / 2, height / 2 + d / 5);
	pop();
}

//mode 1
//draw planes
function drawPlanes() {
	if (score < 5) {
		if (frameCount % 90 == 0 || frameCount % 120 == 0) { //for every 80, 160, 320 frame,...
			if (random(1) < .45) { //pick randomly a frame within the regular interval of frames
				if (pushPlane) {
					plane.push(new Plane()); //push new planes into array through a class callback
				}
			}
		}
		suns.show();
	}

	//redraw planes
	//ignore the previous condition/argument, redraw new planes with more probability of plane spawning
	else if (score < 10 && score >= 5) {
		if (random(1) < 0.004) {
			bonusMode1.push(new BonusMode1());
		}
		if (frameCount % 90 == 0 || frameCount % 150 == 0) { //for every 90, 180, 270 frame, or 150, 300, 450 frame...
			if (random(1) < .8) { //pick randomly a frame within the regular interval of frames( more probable)
				plane.push(new Plane()); //push new planes into array through a class callback
			}
		}
		suns.show2();
	} else {
		if (frameCount % 70 == 0 || frameCount % 150 == 0) { //for every 70, 140, 270 frame, or 150, 300, 450 frame...
			if (random(2) < 1.5) { //pick randomly a frame within the regular interval of frames( more probable)
				plane.push(new Plane()); //push new planes into array through a class callback
			}
		}
		suns.show3();
	}
}

//mode 1
function display() {

	//loop for creating and animating an array of object: planes	
	for (let i = plane.length - 1; i >= 0; i--) {
		plane[i].show();
		plane[i].move();
		plane[i].update();

		// plane hits bird
		if (plane[i].hits(birdie)) {
			noLoop();
			hit.play();
			setTimeout(resetGameDisplay, 2200); //display game reset function
			instructionClose1 = true;
		}

		// plane hits wall
		if (wall.h == -3 * d) { //if wall is up
			if (plane[i].bump(wall)) { // if plane bumps to the wall
				plane[i].pause();
			}
		}
		if (portal_ShowTime) { // only when the portal is shown, will planes enter into it
			if (plane[i].enter(portal)) {
				plane[i].x = portal.x2 - plane[i].s;
				forwards.play();
			} else if (plane[i].enterReverse(portal)) {
				plane[i].x = portal.x - plane[i].s;
				forwards.play();
				plane[i].vel -= 0.0001;
			}
		}






		//delete one element of the array
		//when one element of an array is deleted, get a score
		if (plane[i].offScreen()) {
			plane.splice(i, 1);
			score++;
			game_score.play();
		}
	}
	fill(255);
	textSize(100);
	text(score, width / 2, d / 0.5);

}

//mode 2
//bonus
function drawBonus() {
	if (random(1) < 0.0015) { //probability of bonus drawn
		bonus.push(new Bonus());
	} else if (random(1) < 0.00115) { //probability of bonus drawn
		bonus2.push(new Bonus2());
	}
}

function displayBonus() {
	// BONUS: JUMP FORWARDS
	for (let b = bonus.length - 1; b >= 0; b--) {
		bonus[b].show();
		bonus[b].move();

		//remove a bonus when it gets collected
		if (bonus[b].collected(birdie2)) {
			bonus.splice(b, 1);
			// console.log("COLLECTED");
			birdie2.jumpForwards();
			forwards.play();
		}
	}

	// BONUS: SIZE REDUCE
	//trigger the count up timer for reducing size of bird
	if (counterTriggered) {
		countUp++; // counting up
		if (countUp < 400) { // if less than 400
			birdie2.sizeReduce(); // call back function to reduce size
		} else { //if larger than 400
			birdie2.size = 70; // turn bird's size back to normal
			counterTriggered = false; // reset trigger
			countUp = 0; //reset timer
			hover_play_button.play();
		}
	}
	for (let b2 = bonus2.length - 1; b2 >= 0; b2--) {
		bonus2[b2].show();
		bonus2[b2].move();
		//remove a bonus when it gets collected
		if (bonus2[b2].collected(birdie2)) {
			bonus2.splice(b2, 1);
			sizeReduceSound.play();
			if (!counterTriggered) {
				counterTriggered = true;

			}
			if (countUp < 400) {
				return true;
			} else {
				return false;
			}

		}

	}
}

//mode 1
function drawBonus_Mode1() {
	if (random(1) < 0.0025) {
		bonusMode1.push(new BonusMode1());
	} else if (random(1) < 0.0015) {
		bonusMode1_2.push(new BonusMode1_2());
	}
}

function displayBonus_Mode1() {
	if (Counter_Wall_Up) {
		countUp++;
		if (countUp < 200) {
			wall.buildUp();
		} else {
			wall.h = d;
			Counter_Wall_Up = false;
			countUp = 0;
		}
	}
	// BRICK WALL
	for (let bm1 = bonusMode1.length - 1; bm1 >= 0; bm1--) {
		bonusMode1[bm1].show();
		bonusMode1[bm1].moveBackwards();

		if (bonusMode1[bm1].collected(birdie)) {
			bonusMode1.splice(bm1, 1);
			brick.play();
			if (!Counter_Wall_Up) {
				Counter_Wall_Up = true; // if collected, start counting
			}
			if (countUp < 200) {
				return true;

				// console.log("CountUp: " + countUp);
			} else {
				return false;
			}

		}

	}

	// TELEPORT PORTAL
	if (portal_ShowTime) {
		countUpPortal++; // count time for portal show time

		if (countUpPortal < 200) {
			portal.show_portal1();
			portal.show_portal2();

		} else {
			countUpPortal = 0;
			portal_ShowTime = false;
		}

	}

	for (let bm2 = bonusMode1_2.length - 1; bm2 >= 0; bm2--) {
		bonusMode1_2[bm2].show();
		bonusMode1_2[bm2].moveBackwards();

		if (bonusMode1_2[bm2].collected(birdie)) {
			bonusMode1_2.splice(bm2, 1);
			portal_enter.play();
			if (!portal_ShowTime) {
				portal_ShowTime = true;
			}

		}
	}
}

//draw floors
function drawFloors() {
	if (frameCount % 80 == 0 || frameCount % 100 == 0) { //for every 80, 160, 320 frame,...
		floors.push(new Floors()); //push new planes into array through a class callback
		// console.log(floors);		
	}

	if (time > 29) {
		if (frameCount % 60 == 0 || frameCount % 80 == 0) {
			floors.push(new Floors());
		}
	}

	if (time > 59) {
		if (frameCount % 50 == 0 || frameCount % 80 == 0) {
			floors.push(new Floors());
		}
		if (random(1) < 0.002) { //probability of bonus drawn
			bonus2.push(new Bonus2());
		}
		if (random(1) < 0.002) { //probability of bonus drawn
			bonus.push(new Bonus());
		}
	}
}

//mode 2
function display2() {
	for (let j = floors.length - 1; j >= 0; j--) {
		floors[j].show(); //show the floors
		floors[j].move(); //move the floors
		// floors[0].below(birdie); 
		// birdie.onTop1(floors[0]); //let bird appear on the first "floor" that shows up
		if (floors[j].collide(birdie2)) { //when bird collides with any floor
			let newBird_Pos = floors[j].hold(birdie2); //bird stays on that floor
			newBird_Pos = birdie2.y_pos; //assign new position info after the landing
			// birdie2.updateJump_Vel(); //update info for jumping
			birdie2.moveBackwards(); //get moved back after the freefall alongside a floor

		}



		if (floors[j].offScreen()) { //deleting the offscreen - floors
			floors.splice(j, 1);
		}

	}
	//time count
	if (frameCount % 60 == 0) {
		if (instructionClose2) {
			time++;
		}
	}
	push();
	fill(255, 200);
	textFont("Georgia");
	textSize(70);
	text(time + " s", width - width / 12, d / 2);
	pop();


	if (birdie2.endMode2()) {
		noLoop();
		intro.stop();
		hit.play();
		// instructionClose2 = true;
		setTimeout(resetGameDisplay, 2200);
	}
}

//mode 3
// function drawBoard() {
// 	//draw a board
// 	//display rects and numbers in accordance to each cell's position
// 	for (let i = 0; i < cols_mode3; i++) {
// 		for (let j = 0; j < rows_mode3 * 4; j += 50) {
// 			grid[i][j].show();
// 			// if (key == " ") {
// 			if (grid[i][j].getHit(birdie3)) { //if bird hits one of the cells
// 				// console.log("GET NUMBER");

// 				// CASE 1: if an INDIVIDUAL number gets hit EQUALS to a given number
// 				if (grid[i][j].numbers == givenNum.arbitNum) {
// 					if (!hitOnce) {
// 						grid[i][j].showHit(); // turns green when gets hit
// 						currentTotal = 0;
// 						jumpTime = 0;
// 						// if ( mode == 3) {
// 						// 	score++;
// 						// 	console.log(score);
// 						// }
// 						// grid[i][j].getDeleted();
// 						grid[i][j].numbers = [int(random(1, 10))]; // re-make a new number 
// 						givenNum.arbitNum = int(random(1, 10)); // numbers change whenever a cell is correctly hit
// 						hitOnce = true;
// 					}

// 				}

// 				// CASE 2: DIFFERENT
// 				// CASE 2 - 1:
// 				// an INDIVIDUAL number chosen is LARGER THAN
// 				else if (grid[i][j].numbers > givenNum.arbitNum) {
// 					grid[i][j].showHitWrong();
// 					console.log("TOO MUCH");
// 					jumpTime = 0;
// 				}
// 				// CASE 2 - 2: an INDIVIDUAL number chosen is LESS THAN
// 				else {
// 					grid[i][j].getAddedUp();
// 				}

// 			}

// 		}

// 	}
// }

// function drawHealthBar() {
// 	push();
// 	fill(255, 0, 0, 150);
// 	rect(0, 0, width, height / 3 - d);
// 	rect(0, height / 3, width, height / 3 + d / 2);
// 	fill(150, 150);
// 	textFont("Georgia");
// 	textSize(50);
// 	text("100 / 100", width / 2, (height / 3 - d) / 1.25);
// 	text("100 / 100", width / 2, (height / 3 + d / 2) / 1.05);
// 	pop();
// }