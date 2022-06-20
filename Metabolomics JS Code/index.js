/*with d3 u can select und manipulate all Objects at the same time. To have this Data-Binding and make sure, we react to changes, we need 3D.jS. This code snippet will render the Paragraphs for a div
*/
//https://www.youtube.com/watch?v=TOJ9yjvlapY 
//first div on the page
//select all Paragraphs
//Bind data to that Paragraph
// Give me all the Missing Elements
// Append/Render the missing Paragraph as they are required
// Set Text for every paragraph element. Data(dta) gives you Access to the Data for Each Datapoint in each Paragraph


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
          nestBySuperClass();
          //hierachyBySuperClass();
       //   groupBySuperClass();


       
          visualizeData();

      
      
      }
   })


}

output.innerHTML = slider.value;
slider.oninput = function() {
  output.innerHTML = this.value;
}

slider.addEventListener("input", function(){
  sliderValue = slider.value;
  var color = "linear-gradient(90deg, rgb(117,252,117)" + sliderValue + "%, rgb(214,214,214)" + sliderValue + "%";
  slider.style.background = color;
  console.log("Slider Value: "+ sliderValue)

if(dataLoaded == true){
  nestBySuperClass();
  visualizeData();
}
})

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
//console.log(CSdataSet);
//console.log(filteredCSdataSet);

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

 console.log(filteredCSdataSet);
}
   
/*
   d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json").then(function(data)
   "clustered_spectra_FractionProfiling_RPOS_ToF10_PreCheck_LTR_01_DDA_Filtered_merged.csv"
*/


function visualizeData(){

//console.log(hierarchy);
//console.log(nestedData[0]);

  var width = 480,
  height = 350,
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

 