// Author: David Kosel & Maximilian Tarrach
// Metabolomics is the scientific study of chemical processes involving metabolites


let clientX;
let clientY;
let mouseX;
let mouseY;
let toolTipActivated = false; 
var slider = document.getElementById("myRange");
// var dataSlider = document.getElementById("dataRange");
var output = document.getElementById("value");
var sliderValue = 1;
var filteredCSdataSet =[]; 
const massDiffData = [];
let CSdataSet = [];
let groupedData; 
let hierarchicalDataGroup;
let nestedData;
let hierarchy; 
var dataCollector = []; 
var dataLoaded = false; 
let dataBaseHidden = false; 
//var data; 
var TMapData = data;
var ChemicalSpaceDataBackUp = data;

var cursorX; 
var cursorY;


let limit = 0; 

var filteredTmapData = {

  Chemical_Space: {
    x: [],
    y: [],
    z: [],
    labels: [],
    ids: [],
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

function updateSigmaGraph(){

  graph.clear(); 

  for(var i = 0; i < dataPoints.length; i++){
    // Datapoints with false Filterstatus => all Datapoints from the chemical space that are not found in the loaded samples
    if(dataPoints[i].getFilterStatus() == false){
     
     if(dataBaseHidden == false){

      //graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y, size: 2, label: dataPoints[i].getCompoundName(), color: "rgb("+dataPoints[i].r+","+dataPoints[i].g+","+ dataPoints[i].b+")" });
      graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y, size: 2, color: "rgb(100,100,100)"});
    }else{
     
      var red = Math.round(dataPoints[i].r / 2);
      var green = Math.round(dataPoints[i].g / 2);
      var blue = Math.round(dataPoints[i].b / 2);

      graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y , size: 2, label: dataPoints[i].getCompoundName(), color: "rgb("+red+","+green+","+ blue +")" });
     }

     //Highlight all DataSamples that are in the chemical space: 
    }else{


      // Smiles of current DataPoint
      var smilesForNodes =  dataPoints[i].smiles; 

      //Find Compound Name via Smiles 
      const nameFromSmiles = filteredCSdataSet.find(item => item.Smiles_GNPS_results === smilesForNodes); 

      //Default Highlight found samples
      if(heatMapActive == false){
      //Class-Colors
      //graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y, size: 10, label: dataPoints[i].getCompoundName(), color: "rgb("+dataPoints[i].r+","+dataPoints[i].g+","+ dataPoints[i].b +")" });
      s.graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y, size: 10, label: "Hey", color: "rgb("+dataPoints[i].r+","+dataPoints[i].g+","+ dataPoints[i].b +")" });
      
      s.on('clickNode', function(event){

        
        // ^^^^^^^ HAHAHAH HIER WEITER ARBEITEN MORGEN HURENSOHNE ZEILE ^^^^^^^^^^^
        console.log(event); 
        console.log(event.node); 
        console.log(dataPoints[event.node].smiles); 

        var smilesString = dataPoints[event.node].smiles; 

        document.getElementById("smilesDrawer").setAttribute("data-smiles", `${smilesString}`); 
        //document.getElementById("smilesDrawer").setAttribute("data-smiles-options", "{'width':300, 'height':300 }");
        //document.getElementById("smilesDrawer").setAttribute("data-smiles", smilesString);

        createSubstancePopUp(String(smilesString)); 

      }); 

      }; 

      // Heatmap colorization = Gradient and not just 4 colors 

      if(heatMapActive == true){
        //heatmap colorization
         
       // get the max, min SmilesCount value
        var smilesCounts = filteredAndFoundDataPoints.map(object => { return object.SMILEScount; });
        console.log(smilesCounts);
        
        var highestSmilesCount= Math.max(...smilesCounts); 
        var lowestSmilesCount = Math.min(...smilesCounts); 
 
        // Using 4 colors: Green, yellow, orange, red
    
        //green 
     if(dataPoints[i].getSmilesCount() <= (highestSmilesCount/4)){

        graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y, size: 9, label: dataPoints[i].getCompoundName(), color: "rgb(0,250,0)" });
        }
         //yellow 
       else if(dataPoints[i].getSmilesCount() <= (highestSmilesCount/4 *2)){

        graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y, size: 9, label: dataPoints[i].getCompoundName(), color: "rgb(255,255,0)" });
        }
       //orange
       else if(dataPoints[i].getSmilesCount() <= (highestSmilesCount/4 *3)){

         graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y, size: 9, label: dataPoints[i].getCompoundName(), color: "rgb(255,140,0)" });
    }

        //red 
       else if(dataPoints[i].getSmilesCount() <= (highestSmilesCount)){

          graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y, size: 9, label: dataPoints[i].getCompoundName(), color: "rgb(250,0,0)" });
          }

      }
    }
  }

}
var heatMapActive = false; 
var countedSmiles = {};
var foundSmiles = []; 

function showHeatMap(){
  
  heatMapActive = true; 
  uploadedData = [];
  filteredCSdataSet = [];
  filteredAndFoundCSDataSet = [];
  filteredAndFoundDataPoints = [];
  console.log(dataCollector);
  CSdataSet = []; 
  for(var i = 0; i<dataCollector.length; i++){
    for(var j = 0; j<dataCollector[i].length;j++){
      CSdataSet.push(dataCollector[i][j]);
    }
  
}

filterFromTmap(); 
nestBySuperClass();
visualizeSunburst(); 

  var countedDataPoints = [];
  
  countedSmiles = {};
  foundSmiles = []; 

  //Find similar SMILES in the DataPoint-List and count them
  for(var i = 0; i<filteredAndFoundDataPoints.length;i++){
      foundSmiles.push(filteredAndFoundDataPoints[i].getSmiles());
  }
console.log(foundSmiles);


//Count Smiles and store them in "countedSmiles"
foundSmiles.forEach(val => countedSmiles[val] = (countedSmiles[val] || 0)+1);

console.log(countedSmiles);
console.log(Object.keys(countedSmiles).length);



for(var i = 0; i<filteredAndFoundDataPoints.length;i++){
  for(var j = 0; j<Object.keys(countedSmiles).length;j++){
   
    if(filteredAndFoundDataPoints[i].getSmiles() == Object.keys(countedSmiles)[j]){

      filteredAndFoundDataPoints[i].setSmilesCount(Object.values(countedSmiles)[j]);
      
    }
  }

}  
console.log(filteredAndFoundDataPoints);

updateSigmaGraph();

}

function lookupNodesByKeyValue(sigmaInstance, key, value) {
  return sigmaInstance.graph.nodes().filter(node => node[key] === value);
}
function lookupNodeByKeyValue(sigmaInstance, key, value) {
  return lookupNodesByKeyValue(sigmaInstance, key, value).pop();
}
function lookupNodeById(sigmaInstance, value) {
  return lookupNodeByKeyValue(sigmaInstance, 'id', value);
}
const state = { searchQuery: "" };
let hoveredNode; 
const container = document.getElementById("sigma-container");

var graph = new graphology.Graph();

const {UndirectedGraph, DirectedGraph} = graphology;


var s = new Sigma(graph, container, {
 
     allowInvalidContainer: true,
     nodeHoverPrecision: 10, // set the hover precision to 10 pixels
     labelThreshold: 10 // set the label threshold to 10 pixels

});


const uploadconfirm = document.getElementById('uploadconfirm').
addEventListener('click', () => {
  
//convert and save all data in one array(datacollector)
 for(var i = 0; i<document.getElementById('uploadfile').files.length;i++){
  fileNumber = i;   
  convertToJSON(i);
  console.log(fileNumber);
  
 }
 dataLoaded = true; 

 var tableData = appendDataCollector(dataCollector);

 createTable(tableData); 
}


)
function convertToJSON(fileNumber){
  var uploadedData = [];
  filteredCSdataSet = [];
  filteredAndFoundCSDataSet = [];


  Papa.parse(document.getElementById('uploadfile').files[fileNumber],
  {
    
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(results){
        console.log(results);
        console.log(dataLoaded);
          for (i = 0; i < results.data.length; i++){
             uploadedData.push(results.data[i]);        
          }

        // alle hochgeladenen Files 
          dataCollector.push(uploadedData);
         
          // einzelne Files
          CSdataSet = uploadedData;


          //if(functionCalled == false) {

            //createSubstancePopUp();

//}

          

          // Hierarchien erstellen 
          nestBySuperClass();
          // Vergleiche unsere Datensamples(195+ Stoffe) mit der Datenbank(20k Stoffe) 
          filterFromTmap(); 
          updateSigmaGraph();
          visualizeSunburst(); 
          renderLegend(); 
 
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

// An dieser Stelle den Code ändern zu: Toggle Signal interpretieren 

document.getElementById("switch").onclick = function(){
  
  if (heatMapActive == false) {

    showHeatMap();

  }
  
  else {

  }


 // cameraZoom = document.getElementById("zoomAmount").value;
}



//document.getElementById("centerView").onclick = function(){
// cameraOffset.x = 0;
// cameraOffset.y = 0;
//}

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
  clientX = (e.clientX)/cameraZoom - cameraOffset.x - rect.left;
  clientY =  (e.clientY)/cameraZoom - cameraOffset.y  - rect.top;


  if(cameraZoom ==15){
    clientX = clientX +739;
    clientY = clientY +619;
  }

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

  console.log(" CursorX: "+clientX + "\n CursorY: " +clientY + "\n Mouse X: "+ getEventLocation(event).x +"\n Mouse Y: " + getEventLocation(event).y + "\n Offset X: "+ cameraOffset.x +"\n Offset Y: " + cameraOffset.y + "\n Zoom: "+cameraZoom+ "\n RectLeft: "+rect.left + "\n RectTop: "+rect.top + "\n WindowsInnerWidth: "+window.innerWidth + "\n WindowsInnerHeight: "+window.innerHeight  );
//console.log(event.clientX);

sampleDataPoint.clicked();


//check, if Datapoint got clicked
for(let i = 0; i < filteredAndFoundDataPoints.length; i++){
 
  filteredAndFoundDataPoints[i].clicked();
 
}
for(let i = 0; i < dataPoints.length; i++){
  if(dataPoints[i].getFilterStatus() == false){
  dataPoints[i].clicked();


  }
}
//mouseY - 200 because the canvas is positioned -200px
mouseX = getEventLocation(event).x;
mouseY = getEventLocation(event).y-200;

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
let filteredAndFoundDataPoints = []; 
let isFiltered = false; 
let dataPointSize; 
let dataPosX; 
let dataPosY;
let compoundName;
let fileNumber;
let fileName = ""; 

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
    this.compoundName = compoundName; 
    this.fileNumber = fileNumber;
    this.fileName = fileName;
    this.SMILEScount = 1; 
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
  setFoundInTmap(isFiltered){
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
  setSmilesCount(SMILEScount){
    this.SMILEScount = SMILEScount; 
  }
  countSMILE(){
    this.SMILEScount += this.SMILEScount;
  }
  getSmilesCount(){
    return this.SMILEScount;
  }
  setClickable(clickable){
    this.clickable = clickable; 
  }
  getClickStatus(){
    return this.gotClicked; 
  }
  setCompoundName(compoundName){
    this.compoundName = compoundName; 
  }
  getCompoundName(){
    return this.compoundName;
  }
  setFileNumber(fileNumber){
    this.fileNumber = fileNumber; 
  }
  getFileNumber(){
    return this.fileNumber;
  }

  setFileName(fileName){
    this.fileName = fileName; 
  }
  getFileName(){
    return this.fileName;
  }
}
let sampleDataPoint2 = new DataPoint(clientX,clientY,3,200,200,250,"black",2,false);
let zeroPoint = new DataPoint(0,0,3,20,20,20,"yellow",1,false);

function drawPointCursor(){
  sampleDataPoint2.setPosition(clientX, clientY)
  sampleDataPoint2.draw();
}


function drawToolTip(){
  toolTipCtx.fillStyle = "white";
  toolTipCtx.fillRect(mouseX,mouseY,100,100);
}


let hideCheckBox = document.getElementById("hide-checkbox");
hideCheckBox.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
    dataBaseHidden = true; 
    updateSigmaGraph();
    //testing 
   
    
  } else {
    console.log("Checkbox is not checked..");
    dataBaseHidden = false; 
    updateSigmaGraph();
  }
});


let sampleDataPoint = new DataPoint(100,100,50,200,10,250,"magenta",2,false);
sampleDataPoint.setSmiles("O=C1C2=C(N=CN2)N(C)C(N1C)=O");


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

  if(heatMapActive){
    showHeatMap();
  }else{
  nestBySuperClass();
  filterFromTmap();
  visualizeSunburst();

  // scatterPoints();
  updateSigmaGraph();
  // Refresh rendering:
  s.refresh();
   
  }
}
})


var filteredAndFoundCSDataSet; 

function  filterFromTmap(){

//TMapData = ChemicalSpaceDataBackUp; 
console.log(TMapData);
filteredAndFoundDataPoints = [];
var tempdata = [];

//Achtung: könnte bei doppelaufrufen zu doppelten/dreifachen... tree führen 
filteredTmapData.Chemical_Space_tree = TMapData.Chemical_Space_tree;

//console.log(ChemicalSpaceDataBackUp);
// Check if the Labels of the filteredCSDataSet are found in the chemical_space of the TMap
for(var i = 0; i < TMapData.Chemical_Space.labels.length; i++){


//Assign a false boolean to all (40k+) datapoints
TMapData.Chemical_Space.dataFiltered[i] = false;

//init temp values (only for CanvasMode, not for SigmaGraph. Delete from Datapoint class, if unused)
let isFiltered = false; 
let lineWidth = 0 ;
let dataPointSize = 3;
let stroke = "black";

 //Fill Array with all Datapoints
 dataPoints[i] = new DataPoint(TMapData.Chemical_Space.x[i],TMapData.Chemical_Space.y[i],dataPointSize, TMapData.Chemical_Space.colors[0].r[i], TMapData.Chemical_Space.colors[0].g[i], TMapData.Chemical_Space.colors[0].b[i],stroke, lineWidth, isFiltered);
    
 dataPoints[i].setSmiles(TMapData.Chemical_Space.labels[i]);
 //dataPoints[i].setCompoundName("["+[i]+ "] " + TMapData.Chemical_Space.labels[i]);

 //dataPoints[i].setCompoundName(dataCollector[0][i].Compound_Name_GNPS_results);


 if(heatMapActive == false){
  dataPoints[i].setFileName("File: " + fileNumber);
  }  

 for(var j = 0; j < filteredCSdataSet.length; j++){

//filter out by smiles that are found in both filteredCSData and in TMap-Chemical-Space

  if(TMapData.Chemical_Space.labels[i] ===  filteredCSdataSet[j].Smiles_GNPS_results){

  //Change Booleans to true for filtered Data for later highlighting in TMapCode.js 
  TMapData.Chemical_Space.dataFiltered[i] = true;
  dataPoints[i].setFoundInTmap(true);
  filteredAndFoundDataPoints.push(dataPoints[i]); 


  //Count how many Datapoints with same SMILES/Label there are


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

filteredAndFoundCSDataSet = tempdata;
}
 }
 //console.log(TMapData.Chemical_Space.dataFiltered[i]);

}


//console.log(tempdata);
console.log(filteredAndFoundCSDataSet);
console.log(filteredAndFoundDataPoints);
// filteredTmapData = tempdata;
console.log(filteredTmapData);
//console.log(TMapData.Chemical_Space.dataFiltered);

data = TMapData; 
}

function nestBySuperClass(){

filterByPredictionValue();

nestedData =  d3.nest()
.key(function(d) {return d.cf_kingdom_ms2query_results})
.key(function(d) {return d.cf_superclass_ms2query_results})
.key(function(d) {return d.cf_class_ms2query_results})
.key(function(d) {return d.cf_subclass_ms2query_results})
.key(function(d) {return d.analog_compound_name_ms2query_results})
//insert Sunburstdata here: 
.entries(CSdataSet);

//console.log(nestedData[0]);
console.log(hierarchy);
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
filteredCSdataSet = []; 
for(var i = 0; i < CSdataSet.length; i++){

if (CSdataSet[i].ms2query_model_prediction_ms2query_results > (sliderValue / 100)){
  //Rohdaten nach Prediction-Value  
    filteredCSdataSet.push(CSdataSet[i]);
    }
}
filterFromTmap();

}


function renderLegend(){
  
 // var divLegend = document.getElementById("tmapLegend");
 //Not in Use: 
 let legendContainer = document.getElementById("legendContainer");
 let sunburst = document.getElementById("sunburst");
 legendContainer.appendChild(sunburst);
}
renderLegend();


// Sunburst Diagram Visuals 
function visualizeSunburst(){
//remove existing svg in case of reloading 
d3.select("svg").remove();


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


  


var svg = d3.select("#sunburst").append("svg")
  .attr("width", width)
  .attr("height", height)
.append("g")
  .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");


/*  Setting up the size of each Pie-Slice/Subgroup on the Diagram:  

hierarchy.sum(value) 
--> Determines which value is used to calculate the size of the "Pie-Slices" example: Mass


hierarchy.count(value like Mass from the list, example: every Entry that has a mass, should be counted as an object in this Node)
--> You can use this to Sort the Diagram by the Count/amount of objects in each Node 

*/

hierarchy.count();
 

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

//===== TABS Code ======
function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

//open first Tab by default
document.getElementById("defaultOpen").click();
//===== TABS Code END ======


// ========= File Navigation in Tmap START ==========

const decrementButton = document.querySelector("#decrement");
const incrementButton = document.querySelector("#increment");
const incdecCount = document.querySelector("#incdecCount");


decrementButton.addEventListener("click", () => {

  if (document.getElementById("incdecInput").value == 1) {

    incdecCount.innerText = parseInt(incdecCount.innerText);
    document.getElementById("incdecInput").value = 0;
    convertToJSON(incdecCount.innerText);
    heatMapActive = false; 

  }

  else {

    document.getElementById("incdecInput").value = document.getElementById("incdecInput").value - 1;
    convertToJSON(document.getElementById("incdecInput").value-1); 
    heatMapActive = false; 

  };

});

incrementButton.addEventListener("click", () => {

  if (document.getElementById("incdecInput").value == document.getElementById('uploadfile').files.length) {

    document.getElementById("incdecInput").value = document.getElementById("incdecInput").value;
    convertToJSON(document.getElementById("incdecInput").value-1);
    heatMapActive = false; 

  }

  else {

    document.getElementById("incdecInput").value = parseInt(document.getElementById("incdecInput").value) + 1;
    convertToJSON(parseInt(document.getElementById("incdecInput").value)-1);
    heatMapActive = false; 

  }
  
});


// Implementation of entering a Filenumber via Enter Press

var input_file_selector = document.getElementById("incdecInput"); 

input_file_selector.addEventListener("keypress", function(event){

  if (event.key === "Enter") {

    event.preventDefault();
    convertToJSON(parseInt(document.getElementById("incdecInput").value)-1);
     
  } 

});


// ========= File Navigation in Tmap END ==========




var functionCalled = false; 

// ======== Substance PopUp START ============

function createSubstancePopUp(smiles){

  functionCalled = true; 

  // dataCollector sind alle Dateien => nur die Datei nötig, die gerade angezeigt wird


  var index = dataCollector[0].findIndex(item => item.Smiles_GNPS_results === smiles); 

  console.log(index); 

  // Bestimmtes Element aus dem Datensatz erhalten
  console.log(dataCollector[0][index])


  // Methode ändern => Nicht append sondern ersetzen 

  // Add Header Name also add the Prediction value 
  var paragraph_header = document.getElementById("substance-header"); 
  var text_substance_header = document.createTextNode(dataCollector[0][index].analog_compound_name_ms2query_results); 
  paragraph_header.appendChild(text_substance_header); 

  // Add mass Info
  var paragraph_mass = document.getElementById("mass-popup"); 
  var text_mass_popup = document.createTextNode(dataCollector[0][index].MassDiff_GNPS_results); 
  paragraph_mass.appendChild(text_mass_popup); 

  // Add Superclass Info
  var paragraph_superclass = document.getElementById("superclass-popup"); 
  var text_superclass_popup = document.createTextNode(dataCollector[0][index].cf_superclass_ms2query_results); 
  paragraph_superclass.appendChild(text_superclass_popup); 

  // Class Info
  var paragraph_class = document.getElementById("class-popup"); 
  var text_class_popup = document.createTextNode(dataCollector[0][index].cf_class_ms2query_results); 
  paragraph_class.appendChild(text_class_popup); 

  // Add Subclass Info
  var paragraph_subclass = document.getElementById("subclass-popup"); 
  var text_subclass_popup = document.createTextNode(dataCollector[0][index].cf_subclass_ms2query_results); 
  paragraph_subclass.appendChild(text_subclass_popup); 

  console.log(dataCollector[0][index].Smiles_GNPS_results);

}

// ======== Substance PopUp END ============





