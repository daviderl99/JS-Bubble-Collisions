class Bubble {
  constructor(){
    this.x;
    this.y;
    this.d;
    this.velX;
    this.velY;

    this.init();
  }

  init(){
    let maxDiameter = 200;
    this.x = randomIntBetween(maxDiameter, width - maxDiameter);
    this.y = randomIntBetween(maxDiameter, height - maxDiameter);
    this.d = randomIntBetween(10, maxDiameter);

    this.velX = randomIntBetween(-5, 5);
    this.velY = randomIntBetween(-5, 5);
  }

  display(){
    noFill();
    stroke(255);
    ellipse(this.x, this.y, this.d);
  }

  update(){
    this.x += this.velX;
    this.y += this.velY;
  }

  checkWallCollision(){
    if (this.y - this.d/2 < 0 || this.y + this.d/2 > height) { // top & bottom
      this.velY *= -1;
    }

    if (this.x + (this.d / 2) > width || this.x - (this.d / 2) < 0) { // right & left
      this.velX *= -1;
    }
  }

  checkBubbleCollision(other){
    if (this === other) return;
    // Collision detection: https://stackoverflow.com/a/8331359
    let a = (this.d / 2) + (other.d / 2);
    let x = this.x - other.x;
    let y = this.y - other.y;

    if (a > Math.sqrt((x * x) + (y * y))){
      // Math from: https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
      let vCollision = {x: other.x - this.x, y: other.y - this.y};
      let distance = Math.sqrt((other.x - this.x) * (other.x - this.x) + (other.y - this.y) * (other.y - this.y));
      let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};

      let vRelativeVelocity = {x: this.velX - other.velX, y: this.velY - other.velY};
      let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
      if (speed < 0) return;

      this.velX -= (speed * vCollisionNorm.x);
      this.velY -= (speed * vCollisionNorm.y);
      other.velX += (speed * vCollisionNorm.x);
      other.velY += (speed * vCollisionNorm.y);
    }
  }
}

function randomIntBetween(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}