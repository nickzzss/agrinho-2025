// Variáveis do jogo
let truck;
let fruits = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 600);
  truck = new Truck();
  frameRate(60);
}

function draw() {
  background(200);

  if (gameOver) {
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    text('VOCÊ PERDEU', width / 2, height / 2);
    return;
  }

  truck.update();
  truck.show();

  if (frameCount % 60 === 0) {
    fruits.push(new Fruit());
  }

  for (let i = fruits.length - 1; i >= 0; i--) {
    fruits[i].update();
    fruits[i].show();

    if (fruits[i].offScreen()) {
      fruits.splice(i, 1);
    } else if (fruits[i].hits(truck)) {
      score++;
      fruits.splice(i, 1);
    }
  }

  displayScore();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    truck.setDir(-1);
  } else if (keyCode === RIGHT_ARROW) {
    truck.setDir(1);
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    truck.setDir(0);
  }
}

function displayScore() {
  textSize(24);
  fill(0);
  textAlign(LEFT, TOP);
  text('Pontuação: ' + score, 10, 10);
}

// Classe do caminhão
class Truck {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.w = 50;
    this.h = 30;
    this.xdir = 0;
  }

  update() {
    this.x += this.xdir * 5;
    this.x = constrain(this.x, 0, width - this.w);
  }

  setDir(dir) {
    this.xdir = dir;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }
}

// Classe da fruta
class Fruit {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.size = 20;
    this.speed = random(2, 5);
  }

  update() {
    this.y += this.speed;
  }

  offScreen() {
    return this.y > height;
  }

  hits(truck) {
    let d = dist(this.x, this.y, truck.x + truck.w / 2, truck.y + truck.h / 2);
    return d < this.size / 2 + truck.w / 2;
  }

  show() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, this.size);
  }
}
