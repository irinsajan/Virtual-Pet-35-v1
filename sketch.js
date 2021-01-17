var database;
var food, dog;
var dogImage, happyDogImage;

function preload(){
  dogImage = loadImage("images/dog.png");
  happyDogImage = loadImage("images/happyDog.png");
}
	


function setup() {
  createCanvas(500,500);

  database = firebase.database();
  
  dog = createSprite(250,300);
  dog.addImage(dogImage);
  dog.scale = 0.35;

  var foodStockRef = database.ref('FoodStock');
  foodStockRef.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);

  textSize(15);
  fill(255);
  text("Press 'UP' to feed the Puppy", width/2-80,50);

  if (food!==undefined){
    textSize(18);
    fill(255);
    text("Food Remaining: "+food, width/2-100,450);
  }
  drawSprites();
  

}

function readStock(data){
  food = data.val();
}

function keyPressed(){
  if (keyCode === UP_ARROW){
    writeStock(food);
    dog.addImage(happyDogImage);
  }
}

function writeStock(x){
  if (x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    FoodStock: x
  });
}



