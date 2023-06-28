//importing the json file
import obj from "../json/latest.json" assert { type: "json" }; 
const colorArray=[
  "redCars",
  "blackCars",
  "bronzeCars"
]
const wheelArray=[
  "5126GreyWheel",
  "5125GreyWheel",
  "5125SteelWheel"
]
//declaring and initilaizing varaibles with default values
var color="blackCars";
var wheel="5126GreyWheel";
var PaintPrice=200;
var WheelPrice=200;
var image="carImgSrc";
var bgContainer;
var carCard;
var index;
var wheelCard;
var bgImg;

//calculating the final amount of default displayed car
if(PaintPrice==200 && WheelPrice==200)
{
   document.querySelector('.final-price').addEventListener('click',()=>{
   document.querySelector('.color-price').innerText=PaintPrice;
   document.querySelector('.wheel-price').innerText=WheelPrice;
   document.querySelector('.total-amount').innerText=PaintPrice + WheelPrice;
  })
}
/*
   @Function: displayCar
   @Description: It  adds background image to section 
   @Param: null
   @Returns: null
*/
function displayCar(){
   bgImg=obj[color][wheel][image];
   bgContainer=document.querySelector(".bg-img");
   bgContainer.style.backgroundImage="url("+bgImg+")";
   document.querySelector('.final-price').addEventListener('click',()=>{
   document.querySelector('.color-price').innerText=obj[color][wheel][PaintPrice];
   document.querySelector('.wheel-price').innerText=obj[color][wheel][WheelPrice];
   document.querySelector('.total-amount').innerText=obj[color][wheel][PaintPrice] + obj[color][wheel][WheelPrice];  
  })
}

carCard=document.querySelectorAll(".colors li");
carCard.forEach((item,index)=>
carCard[index].addEventListener("click",()=>{
//getting the index
  index=item.dataset.color;
  color=colorArray[index];
  image="carImgSrc";
  PaintPrice="PaintPrice";
  WheelPrice="WheelPrice"
  displayCar();
}));

wheelCard=document.querySelectorAll(".wheels li");
wheelCard.forEach((item,index)=>
wheelCard[index].addEventListener("click",()=>{
  index=item.dataset.wheel;
  console.log(index);
  wheel=wheelArray[index];
  image="carWheelImg";
  displayCar();
}));
