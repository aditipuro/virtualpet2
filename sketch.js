//Create variables here
var dog, happyDog, database, foodS, foodStock;
var happyDogImg, dogImg;
var readStock; 
var milkBottle;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()  {
  //load images here
  happyDogImg = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png");

  }


function setup() {
  createCanvas(1000, 500);
  dog = createSprite(250, 250, 20, 20);
  dog.scale = 0.5;
  dog.addImage(dogImg);

  happyDog = createSprite(250, 250, 20, 20);
  happyDog.scale = 0.5;
 
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
}


function draw() {  
background(46, 139, 87);

/*if(keyWentDown(UP_ARROW)) {
writeStock(foodS);
dog.visible = false;
happyDog.addImage(happyDogImg);
happyDog.visible = true;
} */

fedTime = database.ref('feedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
});

foodObj.display();

fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: " + lastFed%12 + " PM", 350, 30);
    }
  else if(lastFed == 0){
    text("Last Feed: 12 AM", 350, 30);
  }
  else  {
    text("Last Feed: " + lastFed + " AM", 350, 30);
        }

  drawSprites();
}


function readStock(data){
  foodS = data.val();
  }


function writeStock(x){
  if(x <= 0 ) {
    x = 0;
    } 
  else {
    x = x-1;
    }

   database.ref('/').update({
      Food:x
    })
  }


  function feedDog() {
    dog.visible = false;
happyDog.addImage(happyDogImg);
happyDog.visible = true;
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      feedTime:hour()
    })
  }

  
  function addFoods() {
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
    
  }


