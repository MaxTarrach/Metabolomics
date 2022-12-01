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
var dataSlider = document.getElementById("dataRange");
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

/*
var s = new sigma(
  {
    renderer: {
      container: document.getElementById('sigma-container'),
      type: 'canvas'
    },
    settings: {
     minEdgeSize: 0.1,
     maxEdgeSize: 2,
     minNodeSize: 1,
     maxNodeSize: 8,
    }
  }
);

// Create a graph object
var graph = {
  nodes: [
    { id: "n0", label: "A node", x: 0, y: 0, size: 3, color: '#008cc2' },
    { id: "n1", label: "Another node", x: 3, y: 1, size: 2, color: '#008cc2' },
    { id: "n2", label: "And a last one", x: 1, y: 3, size: 1, color: '#E57821' }
  ],
  edges: [
    { id: "e0", source: "n0", target: "n1", color: '#282c34', type:'line', size:0.5 },
    { id: "e1", source: "n1", target: "n2", color: '#282c34', type:'curve', size:1},
    { id: "e2", source: "n2", target: "n0", color: '#FF0000', type:'line', size:2}
  ]
}

// Load the graph in sigma
s.graph.read(graph);
// Ask sigma to draw it
s.refresh();
*/
/*
// Function drawSigmaGraph NO LONGER NEEDED -> updateSigmaGraph() 
function drawSigmaGraph(){
  graph.clear(); 
  
  for(var i = 0; i < dataPoints.length; i++){

    if(dataPoints[i].getFilterStatus() == false)
    {
    graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y, size: 3, label: dataPoints[i].getCompoundName(), color: "rgb("+dataPoints[i].r+","+dataPoints[i].g+","+ dataPoints[i].b +")" });
    
  }else{
    graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y, size: 8, label: dataPoints[i].getCompoundName(), color: "rgb("+dataPoints[i].r+","+dataPoints[i].g+","+ dataPoints[i].b +")" });

    }
   // graph.clear();
   // graph.dropNode(i);
  }
  graph.addNode("Origin", { x: 0, y: 0, size: 5, label: "Origin", color: "yellow" });


  
  //graph.addNode("John", { x: 0, y: 10, size: 5, label: "John", color: "blue" });
 // graph.addNode("Mary", { x: 10, y: 0, size: 3, label: "Mary", color: "red" });
  
  graph.addEdge("John", "Mary");
  
// updateSigmaGraph();

} */
function updateSigmaGraph(){
  var colR;
  var colG;
  var colB
  var colorBrightness = 0.2;
  graph.clear(); 

  for(var i = 0; i < dataPoints.length; i++){
    // Datapoints with false Filterstatus => all Datapoints from the chemical space that are not found in the loaded samples
    if(dataPoints[i].getFilterStatus() == false){
     
     if(dataBaseHidden == false){

      graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y, size: 2, label: dataPoints[i].getCompoundName(), color: "rgb("+dataPoints[i].r+","+dataPoints[i].g+","+ dataPoints[i].b +")" });
     }else{
       //Darker Colors for "hidden" Objects (chemical data space) 
      colR = Math.floor(dataPoints[i].r * colorBrightness);
      colG = Math.floor(dataPoints[i].g * colorBrightness);
      colB = Math.floor(dataPoints[i].b * colorBrightness);
 
      graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y , size: 2, label: dataPoints[i].getCompoundName(), color: "rgb("+colR+","+colG+","+ colB +")" });
     }

     //Highlight all DataSamples that are in the chemical space: 
    }else{

      //Default Highlight found samples
      if(heatMapActive == false){
      //Class-Colors
      graph.addNode([i], { x:dataPoints[i].x , y: dataPoints[i].y, size: 9, label: dataPoints[i].getCompoundName(), color: "rgb("+dataPoints[i].r+","+dataPoints[i].g+","+ dataPoints[i].b +")" });
      
      }

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

        
        /*for(var i=0; i<hierarchy.length;i++)
        {
          if(dataPoints[i].getSmiles() === ){

          }
        }
        */


      }
    }
  }

 var kk = lookupNodeByKeyValue(renderer, 5);
 console.log(kk);
 // graph.dropNode(5);


}
var heatMapActive = false; 

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

console.log(CSdataSet);
//  countSimilarObjectsInArray();
//  nestBySuperClass();
filterFromTmap(); 
nestBySuperClass();
visualizeSunburst(); 
 
 // initTMap();

  console.log(CSdataSet);
  console.log(filteredAndFoundDataPoints);
  console.log(filteredAndFoundCSDataSet);
  var countedDataPoints = [];
  
  var countedSmiles = {};
  var foundSmiles = []; 





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

//console.log(countedDataPoints);

/*  for(var i = 0; i<filteredAndFoundDataPoints.length;i++){
   console.log(filteredAndFoundDataPoints[i].fileName);
  }
  */
}

function countSimilarObjectsInArray(){

/*
 let result = [];
  CSdataSet.forEach(function(a) {
      if (!this[a.Smiles_GNPS_results]) {
          this[a.Smiles_GNPS_results] = {
            Smiles_GNPS_results: a.Smiles_GNPS_results,
            Smiles_GNPS_results: 0
          };
          result.push(this[a.Smiles_GNPS_results]);
      }
      this[a.Smiles_GNPS_results].Smiles_GNPS_results += a.Smiles_GNPS_results;
  }, Object.create(null));
  let val = JSON.stringify(result);
  console.log(result);
  console.log(val);
*/
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



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderer = new Sigma(graph, container, {
 
     allowInvalidContainer: true
  
  // Register event to manage state hoveredNode

});

//Plotly Code START
const CSV ="https://raw.githubusercontent.com/chris3edwards3/exampledata/master/plotlyJS/dot.csv";


function plotFromCSV() {
Plotly.d3.csv(CSV, function(err, rows) {
    processData(rows);
});
}

function processData(allRows) {
let y = [];
let x1 = [];
let x2 = [];
let row;

let i = 0;
while (i < allRows.length) {
    row = allRows[i];
    y.push(row["Major"]);
    x1.push(row["Sal1"]);
    x2.push(row["Sal2"]);
    i += 1;
}

makePlotly(y, x1, x2);
}

function makePlotly(y, x1, x2) {
let traces = [
    {
        x: x1,
        y: y,
        name: "0-5 yrs Experience",
        mode: "markers",
        marker: {
            color: "#967e20",
            line: {
                color: "#967e20",
                width: 1
            },
            size: 10,
            symbol: "circle"
        }
    },
    {
        x: x2,
        y: y,
        name: "10+ yrs Experience",
        mode: "markers",
        marker: {
            color: "#224a15",
            line: {
                color: "#224a15",
                width: 1
            },
            size: 10,
            symbol: "circle"
        }
    }
];

let layout = {
    title: "<b>Metabolomics</b>",
    font: {
        color: "#2e3b2b"
    },
    hovermode: "closest",
    legend: {
        // x: 1,
        // xanchor: "right",
        // y: 1.175
    },
    paper_bgcolor: "#fffcf0",
    plot_bgcolor: "#fffcf0",
    xaxis: {
        range: [0, 200000],
        showgrid: false,
        showline: true,
        tickformat: "$,"
    },
    yaxis: {
        automargin: true,
        gridcolor: "#dbd6bf"
    }
};

let config = { responsive: true, editable: true };

//Plotly.newPlot("plotly-container", traces, layout, config);
}

//plotFromCSV();

//Plotly Code END






const uploadconfirm = document.getElementById('uploadconfirm').
addEventListener('click', () => {
  
//convert and save all data in one array(datacollector)
 for(var i = 0; i<document.getElementById('uploadfile').files.length;i++){
  fileNumber = i;   
  convertToJSON(i);
  console.log(fileNumber);
  

  
 }
 dataLoaded = true; 
 console.log(dataCollector);


//Show first uploaded Dataset, once all files got converted/stored


//convertToJSON(0);

 console.log(dataCollector);
        /*
          nestBySuperClass();
          filterFromTmap();
          scatterPoints(); 
          animate(); 
          visualizeSunburst(); 
          updateSigmaGraph();
          initTMap();
         */

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
           //   results.data[i].MassDiff_GNPS_results;
          // massDiffData.push(results.data[i].MassDiff_GNPS_results);
         
           uploadedData.push(results.data[i]);
          
          
       //    dataCollector.push(results.data[i]);
          
         //  CSdataSet.push(results.data[i]);
          }

        
          dataCollector.push(uploadedData);
         

          CSdataSet = uploadedData;
    
          console.log(CSdataSet);
        
          
  


       // CODE INIT Moved to uploadconfirm
          nestBySuperClass();
          filterFromTmap();
      //     scatterPoints(); 
           animate(); 
        
           updateSigmaGraph();
           initTMap();
           visualizeSunburst(); 
         //  plotFromCSV();
    

      
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

document.getElementById("heatMap").onclick = function(){
  showHeatMap();
 // cameraZoom = document.getElementById("zoomAmount").value;
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
    dataPoints[i].setCompoundName("["+[i]+ "] " + TMapData.Chemical_Space.labels[i]);

   // dataPoints[i].setCompoundName(TMapData.Chemical_Space[i].analog_compound_name_ms2query_results);
   //seperate Filtered Data from whole Dataset


    if(TMapData.Chemical_Space.dataFiltered[i] == true){

      dataPoints[i].setLineWidth(2);
      dataPoints[i].setPointSize(6);
      dataPoints[i].setFoundInTmap(true);
      dataPoints[i].setStrokeStyle("black"); 
      dataPoints[i].setClickable(true);
      
      //DataPoints should be labeled with the fileNumber only once at the beginning: 
      if(heatMapActive == false){
      dataPoints[i].setFileName("File: " + fileNumber);
      }  

      filteredAndFoundDataPoints.push(dataPoints[i]); 
      

    }else{
    dataPoints[i].setLineWidth(0.1);
    dataPoints[i].setPointSize(3);
    dataPoints[i].setFoundInTmap(false);
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
function drawfilteredAndFoundDataPoints(){
 /* for(let i = 0; i< filteredAndFoundDataPoints.length; i++){
    
     filteredAndFoundDataPoints[i].draw(); 
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
   // lockHiddenDataPoints(); 
    updateSigmaGraph();
    //testing 
   
    
  } else {
    console.log("Checkbox is not checked..");
    dataBaseHidden = false; 
   // lockHiddenDataPoints(); 
    updateSigmaGraph();
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
  
  console.log(filteredAndFoundDataPoints.length);
  for(let i =0; i< filteredAndFoundDataPoints.length; i++){
    if(dataBaseHidden==true){
      console.log("reached");
    filteredAndFoundDataPoints[i].setClickable(true);
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


//sampleDataPoint.draw();
//zeroPoint.draw();
//drawDataPoints();
//drawfilteredAndFoundDataPoints();
//drawPointCursor();
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

  if(heatMapActive){
    showHeatMap();
  }else{
  nestBySuperClass();
  filterFromTmap();
  visualizeSunburst();

  // scatterPoints();
  updateSigmaGraph();
    // Refresh rendering:
    renderer.refresh();
   
  }
}
})

dataSlider.oninput = function() {
  output.innerHTML = this.value;
}
var dataSliderValue; 

dataSlider.addEventListener("input", function(){
  dataSliderValue = dataSlider.value;
  var color = "linear-gradient(90deg, rgb(117,252,117)" + dataSliderValue + "%, rgb(214,214,214)" + dataSliderValue;
  dataSlider.style.background = color;
 // dataSlider.style.content = document.getElementById('uploadfile').files.length;


  console.log("DataSlider Value: "+ dataSliderValue);

  heatMapActive = false;
  convertToJSON(dataSliderValue);

})

var filteredAndFoundCSDataSet; 

function  filterFromTmap(){

//TMapData = ChemicalSpaceDataBackUp; 
//console.log(TMapData);
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
 dataPoints[i].setCompoundName("["+[i]+ "] " + TMapData.Chemical_Space.labels[i]);

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
else{
//  tempdata.splice(j, 1);
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

/*

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

*/

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






nestedData =  d3.nest()
.key(function(d) {return d.cf_kingdom_ms2query_results})
.key(function(d) {return d.cf_superclass_ms2query_results})
.key(function(d) {return d.cf_class_ms2query_results})
.key(function(d) {return d.cf_subclass_ms2query_results})
.key(function(d) {return d.analog_compound_name_ms2query_results})
//insert Sunburstdata here: 
.entries(filteredAndFoundCSDataSet);


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
    filteredCSdataSet.push(CSdataSet[i]);
   // console.log(filteredCSdataSet);slider
   // removeDoubleValues();
   // console.log(filteredCSdataSet);

    }
}
/*
for(var i = 0; i < filteredCSdataSet.length; i++){

  if (filteredCSdataSet[i].ms2query_model_prediction_ms2query_results < (sliderValue / 100)){
    filteredCSdataSet.splice(i, 1);
   
  
  }
}*/
filterFromTmap();
// console.log(filteredCSdataSet);



}
   
/*
   d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json").then(function(data)
   "clustered_spectra_FractionProfiling_RPOS_ToF10_PreCheck_LTR_01_DDA_Filtered_merged.csv"
*/

// Sunburst Diagram Visuals 
function visualizeSunburst(){
//remove existing svg in case of reloading 
d3.select("svg").remove();
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
//console.log(hierarchy);
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


//===== Alignment Chart Code ======

/*
var xValue = ['Product A', 'Product B', 'Product C'];
var yValue = [20, 14, 23];
*/
var xValue = [];
var yValue = [];

var trace1 = {
  x: xValue,
  y: yValue,
  type: 'bar',
  text: yValue,
  textposition: 'auto',
  hoverinfo: 'none',
  marker: {
    color: 'rgb(158,202,225)',
    opacity: 0.6,
    line: {
      color: 'rgb(8,48,107)',
      width: 1.5
    }
  }
};

var plotlyData = [trace1];

var plotlyLayout = {
  title: 'Alignment Chart',
  barmode: 'stack'
};

document.getElementById("plotlyButton").onclick = function(){

  for(var i = 0; i<filteredAndFoundDataPoints.length;i++){
    xValue.push(filteredAndFoundDataPoints[i].getSmiles());
    yValue.push(filteredAndFoundDataPoints[i].getSmilesCount());
  }


  Plotly.newPlot('plotlyDiv', plotlyData, plotlyLayout);
 
}
//Plotly.newPlot('plotlyDiv', plotlyData, plotlyLayout);



//===== Alignment Chart Code END ======