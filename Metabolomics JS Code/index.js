/*with d3 u can select und manipulate all Objects at the same time. To have this Data-Binding and make sure, we react to changes, we need 3D.jS. This code snippet will render the Paragraphs for a div
*/
//https://www.youtube.com/watch?v=TOJ9yjvlapY 
//first div on the page
//select all Paragraphs
//Bind data to that Paragraph
// Give me all the Missing Elements
// Append/Render the missing Paragraph as they are required
// Set Text for every paragraph element. Data(dta) gives you Access to the Data for Each Datapoint in each Paragraph
// testcommit
let clientX;
let clientY;
let mouseX;
let mouseY;
let toolTipActivated = false; 
var slider = document.getElementById("myRange");
var output = document.getElementById("value");
var sliderValue = 1;
var filteredCSdataSet =[]; 
const massDiffData = [];
let CSdataSet = [];
let groupedData; 
let hierarchicalDataGroup;
let nestedData;
let hierarchy; 
var dataLoaded; 
let dataBaseHidden = false; 
//var data; 
var TMapData = data;
var ChemicalSpaceDataBackUp = data;

var filteredTmapData = {

  Chemical_Space: {
    x: [],
    y: [],
    z: [],
    labels: [],
    colors: [{
        r: [],
        g: [],
        b: [],
    }, {
      r: [],
      g: [],
      b: [],
  },
  {
    r: [],
    g: [],
    b: [],
}
  ],
   dataFiltered:[],
   dataPoint: []
},
Chemical_Space_tree: {
    x: [],
    y: [],
    z: [],
}

};

const uploadconfirm = document.getElementById('uploadconfirm').
addEventListener('click', () => {
  convertToJSON();

})




function convertToJSON(){
  Papa.parse(document.getElementById('uploadfile').files[0],
  {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(results){
        //
          for (i = 0; i < results.data.length; i++){
           //   results.data[i].MassDiff_GNPS_results;
           massDiffData.push(results.data[i].MassDiff_GNPS_results);
           CSdataSet.push(results.data[i]);
          }

          //console.log(massDiffData);
          console.log(CSdataSet);
          dataLoaded = true; 
      
          //hierachyBySuperClass();
       //   groupBySuperClass();


      
         
         nestBySuperClass();
          filterFromTmap();
          scatterPoints(); 
          animate(); 
          visualizeData(); 
          initTMap();
       
      console.log(data);

      
      }
   })


}

let mainCanvas = document.getElementById("mainCanvas");
let ctx = mainCanvas.getContext("2d");

let toolTipCanvas = document.getElementById("toolTipCanvas");
let toolTipCtx = toolTipCanvas.getContext("2d");

toolTipCanvas.width =window.innerWidth;;
toolTipCanvas.height = window.innerHeight;

let smilesCanvas = document.getElementById("smilesCanvas");

//let smilesCtx = smilesCanvas.getContext("2d");




/* //CANVAS LAYERS
var canvasLayerStack = document.getElementById("canvasLayerStack")
var canvasLayerStackCtx = canvasLayerStack.getContext("2d"); 
canvasLayerStack.width = window.innerWidth;
canvasLayerStack.height = window.innerHeight;

var canvasStack = new CanvasStack("canvasLayerStack");
var layer1 = canvasStack.createLayer();
var layer1Ctx = document.getElementById(layer1).getContext("2d");
layer1Ctx.fillRect(0,0,100,100);
*/

//mainCanvas.width = window.innerWidth;
//mainCanvas.height = window.innerHeight;
const rect = mainCanvas.getBoundingClientRect(); 

//ZOOM-PAN-IMPLEMENTATION
//source: https://codepen.io/chengarda/pen/wRxoyB?editors=1111

let cameraOffset = { x: 0, y: 0 }
//let cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 }
let cameraZoom = 1
let MAX_ZOOM = 15
let MIN_ZOOM = 0.1
let SCROLL_SENSITIVITY = 0.003;
let zoomAmount; 

document.getElementById("zoomAmountButton").onclick = function(){
 
  cameraZoom = document.getElementById("zoomAmount").value;
}
document.getElementById("centerView").onclick = function(){
 cameraOffset.x = 0;
 cameraOffset.y = 0;
}

// Gets the relevant location from a mouse or single touch event
function getEventLocation(e)
{
    if (e.touches && e.touches.length == 1)
    {
        return { x:e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY)
    {
        return { x: e.clientX, y: e.clientY }        
    }
}

let isDragging = false
let dragStart = { x: 0, y: 0 }

function onPointerDown(e)
{
    isDragging = true
    dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x
    dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y
   // console.log("Pointer Clicked.");
}

function onPointerUp(e)
{
    isDragging = false
    initialPinchDistance = null
    lastZoom = cameraZoom
}


function onPointerMove(e)
{
  //Getting the MousePosition in Space (named clientX/Y)
  //e.clientX

  clientX = (e.clientX)/cameraZoom - cameraOffset.x - rect.left;
  clientY =  (e.clientY)/cameraZoom - cameraOffset.y  - rect.top;


  if(cameraZoom ==15){
    clientX = clientX +739;
    clientY = clientY +619;
  }

  /*
  if(cameraZoom <= 1.31 && cameraZoom >= 1.29){
    clientX = clientX +85 ;
    clientY = clientY +111 ;
  }
  if(cameraZoom <= 1.61 && cameraZoom >= 1.59){
    clientX = clientX +138;
    clientY = clientY + 180;
  }
  if(cameraZoom <= 1.91 && cameraZoom >= 1.89){
    clientX = clientX +175;
    clientY = clientY +227;
  }
  if(cameraZoom <= 2.21 && cameraZoom >= 2.19){
    clientX = clientX +201;
    clientY = clientY + 261;
  }
  if(cameraZoom <= 2.51 && cameraZoom >= 2.49){
    clientX = clientX +221;
    clientY = clientY +288;
  }
  if(cameraZoom <= 2.81 && cameraZoom >= 2.79){
    clientX = clientX+237;
    clientY = clientY+308;
  }
  if(cameraZoom <= 3.11 && cameraZoom >= 3.09){
    clientX = clientX+250;
    clientY = clientY+325;
  }
  if(cameraZoom <= 3.41 && cameraZoom >= 3.39){
    clientX = clientX+260;
    clientY = clientY+339;
  }
  if(cameraZoom <= 3.71 && cameraZoom >= 3.69){
    clientX = clientX+269;
    clientY = clientY+350;
  }
  if(cameraZoom <= 4.01 && cameraZoom >= 3.99){
    clientX = clientX+277;
    clientY = clientY+360;
  }
  if(cameraZoom <= 4.31 && cameraZoom >= 4.29){
    clientX = clientX+283;
    clientY = clientY+368;
  }
  if(cameraZoom <= 4.61 && cameraZoom >= 4.59){
    clientX = clientX+288;
    clientY = clientY+375;
  }
  if(cameraZoom <= 4.91 && cameraZoom >= 4.89){
    clientX = clientX+293;
    clientY = clientY+381;
  }
  if(cameraZoom <= 5.21 && cameraZoom >= 5.19){
    clientX = clientX+297;
    clientY = clientY+387;
  }
  if(cameraZoom <= 6.41 && cameraZoom >= 6.39){
    clientX = clientX+311;
    clientY = clientY+404;
  }
  if(cameraZoom <= 7.01 && cameraZoom >= 6.99){
    clientX = clientX+315;
    clientY = clientY+411;
  }
  if(cameraZoom <= 7.61 && cameraZoom >= 7.59){
    clientX = clientX+320;
    clientY = clientY+416;
  }
  if(cameraZoom <= 8.21 && cameraZoom >= 8.19){
    clientX = clientX+323;
    clientY = clientY+420;
  }
  if(cameraZoom <= 9.41 && cameraZoom >= 9.39){
    clientX = clientX+329;
    clientY = clientY+428;
  }
  if(cameraZoom <= 10.61 && cameraZoom >= 10.59){
    clientX = clientX+333;
    clientY = clientY+434;
  }
  if(cameraZoom <= 11.81 && cameraZoom >= 11.79){
    clientX = clientX+327;
    clientY = clientY+438;
  }
  if(cameraZoom <= 13.01 && cameraZoom >= 12.99){
    clientX = clientX+340;
    clientY = clientY+442;
  }
  if(cameraZoom <= 14.21 && cameraZoom >= 14.19){
    clientX = clientX+342;
    clientY = clientY+445;
  }
  if(cameraZoom <= 15.41 && cameraZoom >= 15.39){
    clientX = clientX+344;
    clientY = clientY+448;
  }
   */

/* 
4,3 283 368
4 276 359
4,3 283 368
4,6 288 375
4,9 293 381
5,2 297 387

5,8 305 396
6,4
7
7,6
8,2
8,8


*/
 /*
  clientX = (getEventLocation(e).x - rect.left)/cameraZoom - cameraOffset.x;
  clientY =  (getEventLocation(e).y- rect.top)/cameraZoom  - cameraOffset.y;
*/
  // PointCursorEnd


  //console.log(" CursorX: "+clientX + "\n CursorY: " +clientY + "\n Mouse X: "+ getEventLocation(e).x +"\n Mouse Y: " + getEventLocation(e).y + "\n Offset X: "+ cameraOffset.x +"\n Offset Y: " + cameraOffset.y + "\n Zoom: "+cameraZoom+ "\n RectLeft: "+rect.left + "\n RectTop: "+rect.top + "\n WindowsInnerWidth: "+window.innerWidth + "\n WindowsInnerHeight: "+window.innerHeight  );


    if (isDragging)
    {
        cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
        cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y

    }
}

function handleTouch(e, singleTouchHandler)
{
    if ( e.touches.length == 1 )
    {
        singleTouchHandler(e)
    }
    else if (e.type == "touchmove" && e.touches.length == 2)
    {
        isDragging = false
        handlePinch(e)
    }
}





let initialPinchDistance = null
let lastZoom = cameraZoom

function handlePinch(e)
{
    e.preventDefault()
    
    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }
    
    // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
    let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2
    
    if (initialPinchDistance == null)
    {
        initialPinchDistance = currentDistance
    }
    else
    {
        adjustZoom( null, currentDistance/initialPinchDistance )
    }
}

function adjustZoom(zoomAmount, zoomFactor)
{
    if (!isDragging)
    {
        if (zoomAmount)
        {
            cameraZoom += zoomAmount
        }
        else if (zoomFactor)
        {
            console.log(zoomFactor)
            cameraZoom = zoomFactor*lastZoom
        }
        
        cameraZoom = Math.min( cameraZoom, MAX_ZOOM )
        cameraZoom = Math.max( cameraZoom, MIN_ZOOM )
     

        //increase zoom speed when already zoomed in much
        if(cameraZoom > 5){
          SCROLL_SENSITIVITY = 0.006;
        }
        if(cameraZoom > 8){
          SCROLL_SENSITIVITY = 0.012;
        }
        if(cameraZoom < 5){
          SCROLL_SENSITIVITY = 0.003;
        }

      //  console.log(cameraZoom)
    }
}


mainCanvas.addEventListener('mousedown', onPointerDown);
mainCanvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown));
mainCanvas.addEventListener('mouseup', onPointerUp);
mainCanvas.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp));
mainCanvas.addEventListener('mousemove', onPointerMove);
mainCanvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove));
mainCanvas.addEventListener( 'wheel', (e) => 

adjustZoom(e.deltaY*SCROLL_SENSITIVITY));


mainCanvas.addEventListener('click', (event) => {
//console.log(event);

//show click-coordinates including CameraZoomPanOffset
/*
const rect = mainCanvas.getBoundingClientRect(); 
clientX = (event.clientX/cameraZoom -cameraOffset.x) - rect.left;
clientY = (event.clientY/cameraZoom -cameraOffset.y) - rect.top;
*/


  console.log(" CursorX: "+clientX + "\n CursorY: " +clientY + "\n Mouse X: "+ getEventLocation(event).x +"\n Mouse Y: " + getEventLocation(event).y + "\n Offset X: "+ cameraOffset.x +"\n Offset Y: " + cameraOffset.y + "\n Zoom: "+cameraZoom+ "\n RectLeft: "+rect.left + "\n RectTop: "+rect.top + "\n WindowsInnerWidth: "+window.innerWidth + "\n WindowsInnerHeight: "+window.innerHeight  );
//console.log(event.clientX);

sampleDataPoint.clicked();


//check, if Datapoint got clicked
for(let i = 0; i < filteredDataPoints.length; i++){
 
  filteredDataPoints[i].clicked();
 
}
for(let i = 0; i < dataPoints.length; i++){
  if(dataPoints[i].getFilterStatus() == false){
  dataPoints[i].clicked();


  }
}
//mouseY - 200 because the canvas is positioned -200px
mouseX = getEventLocation(event).x;
mouseY = getEventLocation(event).y - 200;

});



//ZOOM-PAN-IMPLEMENTATION END


window.onresize = function(){
resizeCanvas();
}

function zoomAndPan(){
      
    // Translate to the canvas centre before zooming - so you'll always zoom on what you're looking directly at
    ctx.translate( window.innerWidth / 2, window.innerHeight / 2 )
    ctx.scale(cameraZoom, cameraZoom)
    ctx.translate( -window.innerWidth / 2 + cameraOffset.x, -window.innerHeight / 2 + cameraOffset.y )
}

function resizeCanvas(){
  mainCanvas.width = window.innerWidth;
mainCanvas.height = window.innerHeight;

toolTipCanvas.width =window.innerWidth;;
toolTipCanvas.height = window.innerHeight;

smilesCanvas.width =window.innerWidth;;
smilesCanvas.height = window.innerHeight;
}

let dataPoint; 
let dataPoints = []; 
let filteredDataPoints = []; 
let isFiltered = false; 
let dataPointSize; 
let dataPosX; 
let dataPosY;


class DataPoint {

  constructor(x,y,dataPointSize,r,g,b, strokeStyle, lineWidth, isFiltered){
    this.x = x;
    this.y = y; 
    this.dataPointSize = dataPointSize;
    this.r = r;
    this.g = g;
    this.b = b; 
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle; 
    this.lineWidth = lineWidth; 
    this.isFiltered = isFiltered; 
    this.smiles; 
    var a;
    var b;
    var d;
    this.clickable = true; 
    this.gotClicked = false; 
  }

  draw(){
    ctx.fillStyle = "rgb("+this.r+","+this.g+","+ this.b +")";
    ctx.strokeStyle = this.strokeStyle; 
    ctx.lineWidth = this.lineWidth  / (0.7*cameraZoom);
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.dataPointSize / (0.7*cameraZoom) ,0,Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
  clicked(){
  //Calculate Distance(Pythagoras) between Center and Click, to check, if the mouse-click is in the radius
  var a = (clientX) - this.x ;
  var b = (clientY) - this.y; 

  var d = Math.sqrt(a*a + b*b);
  var hit = false; 
  //console.log("Zoom: " + cameraZoom);
  
//if Point is Clicked
  if (d < this.dataPointSize  / (0.7*cameraZoom)  && this.clickable == true){
    this.gotClicked = true; 

    console.log("SMILES: "+ this.smiles);
      console.log("ClientX: "+ clientX + " ClientY: "+ clientY + " d: " + d + " PointSize: " + this.dataPointSize);
    
      toolTipCtx.clearRect(0,0, mainCanvas.width, mainCanvas.height);
      drawToolTip();
      
    
   
   }else{
    this.gotClicked = false; 
    toolTipCtx.clearRect(0,0, mainCanvas.width, mainCanvas.height);
   }     
  }

  drawToolTip(){
     if(this.gotClicked == true){
      //delete Previous Tooltip
    

      toolTipCtx.fillStyle = "white";
      toolTipCtx.fillRect(mouseX,mouseY,150,150);

      toolTipCtx.fillStyle = "black";
      toolTipCtx.font = "12px Arial";
     this.drawSmiles();



    //  var txt = 'this is a very long text to print';

printAt(toolTipCtx, this.smiles, mouseX + 5, mouseY + 20, 20, 140 );

//Line-Break Function for Long Text/SMILES
function printAt( context , text, x, y, lineHeight, fitWidth)
{
    fitWidth = fitWidth || 0;
    
    if (fitWidth <= 0)
    {
         context.fillText( text, x, y );
        return;
    }
    
    for (var idx = 1; idx <= text.length; idx++)
    {
        var str = text.substr(0, idx);
       
        if (context.measureText(str).width > fitWidth)
        {
            context.fillText( text.substr(0, idx-1), x, y );
            printAt(context, text.substr(idx-1), x, y + lineHeight, lineHeight,  fitWidth);
            return;
        }
    }
    context.fillText( text, x, y );
}
      
    }
  }


  drawSmiles(){
    let options = {  width: 150 / window.devicePixelRatio,
    height: 150 / window.devicePixelRatio}
    
   smilesCanvas.style.top = mouseY +200 +"px";
    smilesCanvas.style.left = mouseX+"px";

    let smilesDrawer = new SmilesDrawer.Drawer(options);

    SmilesDrawer.parse(this.smiles, function(tree) {
      smilesDrawer.draw(tree, "smilesCanvas", 'light', false);
  console.log("parsed.");
    }, err => { console.log(err); });
    
  }
  

  getFilterStatus(){
    return this.isFiltered;
  }
  setFilterStatus(isFiltered){
    this.isFiltered = isFiltered; 
  }
  setStrokeStyle(strokeStyle){
    this.strokeStyle = strokeStyle; 
  }
  setLineWidth(lineWidth){
    this.lineWidth = lineWidth; 
  }
  setPointSize(pointSize){
    this.dataPointSize = pointSize; 
  }
  setPosition(x,y){
    this.x = x;
    this.y = y; 
  }
  setSmiles(smiles){
    this.smiles = smiles; 
  }
  getSmiles(){
    return this.smiles;
  }
  setClickable(clickable){
    this.clickable = clickable; 
  }
  getClickStatus(){
    return this.gotClicked; 
  }
 
/*
  stroke = "black";
  lineWidth = 1;
  dataPointSize = 3;
*/
}
let sampleDataPoint2 = new DataPoint(clientX,clientY,3,200,200,250,"black",2,false);
let zeroPoint = new DataPoint(0,0,3,20,20,20,"yellow",1,false);

function drawPointCursor(){
  sampleDataPoint2.setPosition(clientX, clientY)
  sampleDataPoint2.draw();
}
/*
function drawPoint(dataPosX, dataPosY, dataPointSize, r, g, b, dataPointStrokeStyle, lineWidth){

  ctx.fillStyle = "rgb("+r+","+g+","+ b +")";
  ctx.strokeStyle = dataPointStrokeStyle; 
  ctx.lineWidth = lineWidth  / (0.7*cameraZoom);
  ctx.beginPath();
  ctx.arc(dataPosX,dataPosY,dataPointSize / (0.7*cameraZoom) ,0,Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
}
*/ 

function scatterPoints(){
 //dataPoint = new DataPoint(); 



//init temp values 
  let isFiltered = false; 
  let lineWidth = 0 ;
  let dataPointSize = 3;
  let stroke = "black";

 // drawPoint(30,30,5,100,200,100);   
  for(let i = 0; i < TMapData.Chemical_Space.x.length; i++){
 
    //Fill Array with all Datapoints
    dataPoints[i] = new DataPoint(TMapData.Chemical_Space.x[i],TMapData.Chemical_Space.y[i],dataPointSize, TMapData.Chemical_Space.colors[0].r[i], TMapData.Chemical_Space.colors[0].g[i], TMapData.Chemical_Space.colors[0].b[i],stroke, lineWidth, isFiltered);
    
    dataPoints[i].setSmiles(TMapData.Chemical_Space.labels[i]);

   //seperate Filtered Data from whole Dataset
    if(TMapData.Chemical_Space.dataFiltered[i] == true){
      dataPoints[i].setLineWidth(2);
      dataPoints[i].setPointSize(6);
      dataPoints[i].setFilterStatus(true);
      dataPoints[i].setStrokeStyle("black"); 
      dataPoints[i].setClickable(true);
    
      filteredDataPoints.push(dataPoints[i]); 
      

    }else{
    dataPoints[i].setLineWidth(0.1);
    dataPoints[i].setPointSize(3);
    dataPoints[i].setFilterStatus(false);
    dataPoints[i].setStrokeStyle("black"); 

  }
 
}
//remove filtered Datapoints with status changed to false 

}

function drawToolTip(){
  toolTipCtx.fillStyle = "white";
  toolTipCtx.fillRect(mouseX,mouseY,100,100);
}



//console.log(TMapData.Chemical_Space.x[5]);
function drawDataPoints(){
for(let i = 0; i< dataPoints.length; i++){
 if(dataPoints[i].getFilterStatus() == false && dataBaseHidden != true){
  dataPoints[i].draw(); 
  }
 
}
}
function drawFilteredDataPoints(){
 /* for(let i = 0; i< filteredDataPoints.length; i++){
    
     filteredDataPoints[i].draw(); 
    }
 */
    for(let i = 0; i< dataPoints.length; i++){
    if(dataPoints[i].getFilterStatus() == true){
      dataPoints[i].draw(); 
      dataPoints[i].drawToolTip();
      
      }
    }
}

let hideCheckBox = document.getElementById("hide-checkbox");
hideCheckBox.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
    dataBaseHidden = true; 
    lockHiddenDataPoints(); 
  } else {
    console.log("Checkbox is not checked..");
    dataBaseHidden = false; 
    lockHiddenDataPoints(); 
  }
});

function lockHiddenDataPoints(){



  for(let i =0; i< dataPoints.length; i++){
    
    if(dataBaseHidden == true){
    dataPoints[i].setClickable(false);
    
    }else{
      dataPoints[i].setClickable(true);
    }
  }
  
  console.log(filteredDataPoints.length);
  for(let i =0; i< filteredDataPoints.length; i++){
    if(dataBaseHidden==true){
      console.log("reached");
    filteredDataPoints[i].setClickable(true);
    }
 
  }
}
/*
function drawSmiles(){
  SmilesDrawer.parse(sampleDataPoint.getSmiles(), function(tree) {
    smilesDrawer.draw(tree, "smilesCanvas", 'light', false);
console.log("parsed.");
  }, err => { console.log(err); });
  
}
*/

let sampleDataPoint = new DataPoint(100,100,50,200,10,250,"magenta",2,false);
sampleDataPoint.setSmiles("O=C1C2=C(N=CN2)N(C)C(N1C)=O");

function animate(){
//draw each Frame
//

mainCanvas.width = window.innerWidth;
mainCanvas.height = window.innerHeight; 

 zoomAndPan();
//Remove current drawing 
 ctx.clearRect(0,0, mainCanvas.width, mainCanvas.height);


sampleDataPoint.draw();
zeroPoint.draw();
drawDataPoints();
drawFilteredDataPoints();
drawPointCursor();
//drawSmiles();
if(toolTipActivated){
//drawToolTip(); 
}

//scatterPoints();
//scatterFilteredPoints();

requestAnimationFrame(animate);

}
//animate();




output.innerHTML = slider.value;
slider.oninput = function() {
  output.innerHTML = this.value;
}

slider.addEventListener("input", function(){
  sliderValue = slider.value;
  var color = "linear-gradient(90deg, rgb(117,252,117)" + sliderValue + "%, rgb(214,214,214)" + sliderValue + "%";
  slider.style.background = color;
  console.log("Slider Value: "+ sliderValue);
  


if(dataLoaded == true){
  nestBySuperClass();
  visualizeData();
  scatterPoints();
}
})

function  filterFromTmap(){

//TMapData = ChemicalSpaceDataBackUp; 
console.log(TMapData);

var tempdata = [];

//Achtung: könnte bei doppelaufrufen zu doppelten/dreifachen... tree führen 
filteredTmapData.Chemical_Space_tree = TMapData.Chemical_Space_tree;

console.log(ChemicalSpaceDataBackUp);
// Check if the Labels of the filteredCSDataSet are found in the chemical_space of the TMap
for(var i = 0; i < TMapData.Chemical_Space.labels.length; i++){


//Assign a false boolean to all (40k+) datapoints
TMapData.Chemical_Space.dataFiltered[i] = false;



 for(var j = 0; j < filteredCSdataSet.length; j++){




 
//filter out by smiles that are found in both filteredCSData and in TMap-Chemical-Space

  if(TMapData.Chemical_Space.labels[i] ===  filteredCSdataSet[j].Smiles_GNPS_results){

  //Change Booleans to true for filtered Data for later highlighting in TMapCode.js 
  TMapData.Chemical_Space.dataFiltered[i] = true;


//push the filtered Data into the yet empty  filteredtmapdata-structure
filteredTmapData.Chemical_Space.x.push(
  TMapData.Chemical_Space.x[i]);
filteredTmapData.Chemical_Space.y.push(
  TMapData.Chemical_Space.y[i]);
filteredTmapData.Chemical_Space.z.push(
  TMapData.Chemical_Space.z[i]);
filteredTmapData.Chemical_Space.labels.push(
  TMapData.Chemical_Space.labels[i]);
filteredTmapData.Chemical_Space.colors[0].r.push(TMapData.Chemical_Space.colors[0].r[i]);
filteredTmapData.Chemical_Space.colors[0].g.push(TMapData.Chemical_Space.colors[0].g[i]);
filteredTmapData.Chemical_Space.colors[0].b.push(TMapData.Chemical_Space.colors[0].b[i]);


tempdata.push(filteredCSdataSet[j]);

}
 }
 //console.log(TMapData.Chemical_Space.dataFiltered[i]);

}
console.log(tempdata);
// filteredTmapData = tempdata;
console.log(filteredTmapData);
console.log(TMapData.Chemical_Space.dataFiltered);

data = TMapData; 
//data = filteredTmapData;


}



function sumMassOfSubClasses(group){

return d3.sum(group, function(d){
  return d.MassDiff_GNPS_results;
});
}

function groupBySuperClass(){

 // data = CSdataSet
// console.log(CSdataSet);

groupedData = d3.rollup(CSdataSet, 
 sumMassOfSubClasses,
  function(d) {return d.cf_superclass_ms2query_results},
  function(d) {return d.cf_class_ms2query_results},
  function(d) {return d.cf_subclass_ms2query_results}
);
//console.log(groupedData);
//console.log(groupedData.get('Benzenoids'));
}

/*function hierachyBySuperClass(){
hierarchicalDataGroup = d3.group(CSdataSet,
function(d) {return d.cf_superclass_ms2query_results},
function(d) {return d.cf_class_ms2query_results},
function(d) {return d.cf_subclass_ms2query_results},
//function(d) {return d.cf_direct_parent_ms2query_results},
//function(d) {return d.analog_compound_name_ms2query_results},
)
console.log(hierarchicalDataGroup);
}
*/
function nestBySuperClass(){

filterByPredictionValue();
//remove double entries so Dataset doesnt get double nested/added 
removeDoubleValues(); 




console.log(filteredCSdataSet); 

nestedData =  d3.nest()
.key(function(d) {return d.cf_kingdom_ms2query_results})
.key(function(d) {return d.cf_superclass_ms2query_results})
.key(function(d) {return d.cf_class_ms2query_results})
.key(function(d) {return d.cf_subclass_ms2query_results})
.key(function(d) {return d.analog_compound_name_ms2query_results})
.entries(filteredCSdataSet);

//console.log(nestedData[0]);

hierarchy = d3.hierarchy(nestedData[0],function(d) { return d.values; });

console.log(hierarchy);

}

function removeDoubleValues(){
  filteredCSdataSet = filteredCSdataSet.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.query_spectrum_nr === value.query_spectrum_nr
  ))
)

}

function filterByPredictionValue(){

console.log(sliderValue);

for(var i = 0; i < CSdataSet.length; i++){

  if (CSdataSet[i].ms2query_model_prediction_ms2query_results > (sliderValue / 100)){
    filteredCSdataSet.push(CSdataSet[i]);
    removeDoubleValues();

    }
}

for(var i = 0; i < filteredCSdataSet.length; i++){

  if (filteredCSdataSet[i].ms2query_model_prediction_ms2query_results < (sliderValue / 100)){
    filteredCSdataSet.splice(i, 1);

  
  }
}
filterFromTmap();
 console.log(filteredCSdataSet);



}
   
/*
   d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json").then(function(data)
   "clustered_spectra_FractionProfiling_RPOS_ToF10_PreCheck_LTR_01_DDA_Filtered_merged.csv"
*/

// Sunburst Diagram Visuals 
function visualizeData(){

//console.log(hierarchy);
//console.log(nestedData[0]);

//w 480, height 350
  var width = 250,
  height = 250,
  radius = (Math.min(width, height) / 2) - 10;

var formatNumber = d3.format(",d");

var x = d3.scaleLinear()
  .range([0, 2 * Math.PI]);

var y = d3.scaleSqrt()
  .range([0, radius]);

var color = d3.scaleOrdinal(d3.schemeCategory20);

var partition = d3.partition();

var arc = d3.arc()
  .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
  .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
  .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
  .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


  //remove existing svg in case of reloading 
  d3.select("svg").remove();


var svg = d3.select("#sunburst").append("svg")
  .attr("width", width)
  .attr("height", height)
.append("g")
  .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");



//nestBySuperClass();


/*  Setting up the size of each Pie-Slice/Subgroup on the Diagram:  

hierarchy.sum(value) 
--> Determines which value is used to calculate the size of the "Pie-Slices" example: Mass


hierarchy.count(value like Mass from the list, example: every Entry that has a mass, should be counted as an object in this Node)
--> You can use this to Sort the Diagram by the Count/amount of objects in each Node 

*/

hierarchy.count();
console.log(hierarchy);
//hierarchy.sum(function(d) { return d.MassDiff_GNPS_results; });
//hierarchy.sum(function(d) { return d.precursor_mz_query_spectrum; }); 



svg.selectAll("path")
    .data(partition(hierarchy).descendants())
  .enter().append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color((nestedData[0].values ? d : nestedData[0].parent).data.key); })
    .on("click", click)
  .append("title")
    .text(function(d) { return d.data.key + "\n" +
    //formatNumber(d.value) für ganze Zahlen
    //toFixed(2) für 2 Nachkommastellen
    //ohne alles maximale Nachkommastellen
    formatNumber(d.value); });


    function click(d) {
      svg.transition()
          .duration(750)
          .tween("scale", function() {
            var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                yd = d3.interpolate(y.domain(), [d.y0, 1]),
                yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
            return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
          })
        .selectAll("path")
          .attrTween("d", function(d) { return function() { return arc(d); }; });
      }


    d3.select(self.frameElement).style("height", height + "px");
  






}


//standard Sunburst Code 
 /* 
function visualizeData(){ 
  var width = 960,
  height = 700,
  radius = (Math.min(width, height) / 2) - 10;

var formatNumber = d3.format(",d");

var x = d3.scaleLinear()
  .range([0, 2 * Math.PI]);

var y = d3.scaleSqrt()
  .range([0, radius]);

var color = d3.scaleOrdinal(d3.schemeCategory20);

var partition = d3.partition();

var arc = d3.arc()
  .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
  .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
  .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
  .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
.append("g")
  .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

d3.json(
  "https://gist.githubusercontent.com/mbostock/4348373/raw/85f18ac90409caa5529b32156aa6e71cf985263f/flare.json"

  , function(error, root) {
if (error) throw error;

root = d3.hierarchy(root);
root.sum(function(d) { return d.size; });
svg.selectAll("path")
    .data(partition(root).descendants())
  .enter().append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
    .on("click", click)
  .append("title")
    .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });
console.log(root);

    function click(d) {
      svg.transition()
          .duration(750)
          .tween("scale", function() {
            var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                yd = d3.interpolate(y.domain(), [d.y0, 1]),
                yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
            return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
          })
        .selectAll("path")
          .attrTween("d", function(d) { return function() { return arc(d); }; });
      }


    d3.select(self.frameElement).style("height", height + "px");
    console.log(groupedData);

});



}


*/ 



// ----------- Old Treemap VisualizeCode -------------
  /*
//d3.json oder d3.csv
d3.csv(groupedData).then(function(groupedData)

  { 
    console.log(groupedData);
    console.log(data)
      // Give the data to this cluster layout:
      const root = d3.hierarchy(groupedData).sum(function(d){ return d.value}) // Here the size of each leave is given in the 'value' field in input data
      
      // Then d3.treemap computes the position of each element of the hierarchy
      d3.treemap()
        .size([width, height])
        .padding(2)
        (root)
     console.log(root);
      // use this information to add rectangles:
      svg
        .selectAll("rect")
        .data(root.leaves())
        .join("rect")
          .attr('x', function (d) { return d.x0; })
          .attr('y', function (d) { return d.y0; })
          .attr('width', function (d) { return d.x1 - d.x0; })
          .attr('height', function (d) { return d.y1 - d.y0; })
          .style("stroke", "black")
          .style("fill", "slateblue")
    
      // and to add the text labels
      svg
        .selectAll("text")
        .data(root.leaves())
        .join("text")
          .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
          .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
          .text(function(d){ return d.data.name })
          .attr("font-size", "15px")
          .attr("fill", "white")
   
          console.log(groupedData);
    }
    )

  */

 