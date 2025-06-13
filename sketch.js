let truck;
let obstacles = [];
let road;
let score = 0;
let isGameOver = false;

function setup() {
  createCanvas(800, 600);
  road = new Road();
  truck = new Truck(width / 2, height - 100);
}

function draw() {
  background(135, 206, 235); // Céu azul

  if (isGameOver) {
    fill(255, 0, 0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    textSize(32);
    text("Pontuação Final: " + score, width / 2, height / 2 + 60);
    return;
  }

  road.show();
  truck.update();
  truck.show();

  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();

    if (obstacles[i].hits(truck)) {
      isGameOver = true;
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score += 10; // Incrementa pontos ao desviar com sucesso
    }
  }

  // Exibe a pontuação
  fill(0);
  textSize(24);
  text("Pontuação: " + score, width - 200, 30);
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

class Truck {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 30;
    this.xSpeed = 0;
  }

  setDir(dir) {
    this.xSpeed = dir * 5;
  }

  update() {
    this.x += this.xSpeed;
    this.x = constrain(this.x, 0, width - this.width);
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Obstacle {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.width = random(40, 80);
    this.height = random(30, 60);
    this.speed = random(2, 5);
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(0);
    rect(this.x, this.y, this.width, this.height);
  }

  offscreen() {
    return this.y > height;
  }

  hits(truck) {
    return (
      this.x < truck.x + truck.width &&
      this.x + this.width > truck.x &&
      this.y < truck.y + truck.height &&
      this.y + this.height > truck.y
    );
  }
}

class Road {
  constructor() {
    this.width = width;
    this.height = height;
  }

  show() {
    fill(50, 50, 50);
    rect(0, 0, this.width, this.height);
    stroke(255);
    strokeWeight(4);
    line(this.width / 2, 0, this.width / 2, this.height);
  }
}
