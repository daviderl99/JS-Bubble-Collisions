let bubbles = [];

function setup(){
  createCanvas(innerWidth, innerHeight);
  createBubbles(10);
} 

function draw(){
  background(0);
  
  handleBubbles();
}

function createBubbles(n){
  let b;
  for (let i = 0; i < n; i++){
    b = new Bubble();
    bubbles.push(b);
  }
}

function handleBubbles(){
  for (let b of bubbles){
    b.display();
    b.checkWallCollision();
    b.update();
    
    for (let i = 0; i < bubbles.length; i++){
      b.checkBubbleCollision(bubbles[i]);
      // if (dist(b.x, b.y, bubbles[i].x, bubbles[i].y) < 200){
      //   line(b.x, b.y, bubbles[i].x, bubbles[i].y);
      // }
    }  
  }
}