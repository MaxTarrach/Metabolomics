/*with d3 u can select und manipulate all Objects at the same time. To have this Data-Binding and make sure, we react to changes, we need 3D.jS. This code snippet will render the Paragraphs for a div
*/
//https://www.youtube.com/watch?v=TOJ9yjvlapY 
//first div on the page
//select all Paragraphs
//Bind data to that Paragraph
// Give me all the Missing Elements
// Append/Render the missing Paragraph as they are required
// Set Text for every paragraph element. Data(dta) gives you Access to the Data for Each Datapoint in each Paragraph



const massDiffData = [];
let CSdataSet = [];
let groupedData; 
let hierarchicalDataGroup;
let nestedData;
let hierarchy; 
const uploadconfirm = document.getElementById('uploadconfirm').
addEventListener('click', () => {
  convertToJSON();
  //loadCSVFile();
 // groupBySuperClass();






})


function loadCSVFile(){
  d3.csv(document.getElementById('uploadfile').files[0],function(data){

    console.log(data);
  });
  
  hierachyBySuperClass();
  groupBySuperClass();
  visualizeData();

 // let file = document.getElementById('uploadconfirm').files[0];

}

function convertToJSON(){
  Papa.parse(document.getElementById('uploadfile').files[0],
  {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(results){
        //  console.log(results);
          // console.log(results.data[5].MassDiff_GNPS_results);
          
          for (i = 0; i < results.data.length; i++){
           //   results.data[i].MassDiff_GNPS_results;
           massDiffData.push(results.data[i].MassDiff_GNPS_results);
           CSdataSet.push(results.data[i]);
          }
          console.log(massDiffData);
          console.log(CSdataSet);

          nestBySuperClass();
          hierachyBySuperClass();
          groupBySuperClass();
          visualizeData();

       d3.json("https://gist.githubusercontent.com/mbostock/4348373/raw/85f18ac90409caa5529b32156aa6e71cf985263f/flare.json",function(data){

console.log(data);
        });
      
      }
   })


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
console.log(groupedData);
console.log(groupedData.get('Benzenoids'));

hierarchy = d3.hierarchy(groupedData);
console.log(hierarchy);

}

function hierachyBySuperClass(){
hierarchicalDataGroup = d3.group(CSdataSet,
function(d) {return d.cf_superclass_ms2query_results},
function(d) {return d.cf_class_ms2query_results},
function(d) {return d.cf_subclass_ms2query_results},
//function(d) {return d.cf_direct_parent_ms2query_results},
//function(d) {return d.analog_compound_name_ms2query_results},
)
console.log(hierarchicalDataGroup);

//hierarchy = d3.hierarchy(hierarchicalDataGroup);
//console.log(hierarchy);
}

function nestBySuperClass(){
nestedData =  d3.nest()
.key(function(d) {return d.cf_kingdom_ms2query_results})
.key(function(d) {return d.cf_superclass_ms2query_results})
.key(function(d) {return d.cf_class_ms2query_results})
.key(function(d) {return d.cf_subclass_ms2query_results})
.key(function(d) {return d.analog_compound_name_ms2query_results})
.entries(CSdataSet);

console.log(nestedData[0]);


hierarchy = d3.hierarchy(nestedData[0],function(d) { return d.values; });
console.log(hierarchy);

}


   
/*
   d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json").then(function(data)


   "clustered_spectra_FractionProfiling_RPOS_ToF10_PreCheck_LTR_01_DDA_Filtered_merged.csv"
*/






function visualizeData(){

console.log(hierarchy);
console.log(nestedData[0]);

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




//hierarchy = d3.hierarchy(nestedData[0]);
//hierarchy = d3.hierarchy(nestedData[0],function(d) { return d.values; });
//hierarchy = d3.hierarchy(nestedData[0],function(d) { return d.MassDiff_GNPS_results; });
//hierarchy = d3.hierarchy(nestedData[0]);
//hierarchy = d3.hierarchy(nestedData[0]).sum(function (d){return d.values});
nestBySuperClass();
console.log(hierarchy);
hierarchy.sum(function(d) { return d.MassDiff_GNPS_results; });

//hierarchy.sum(function (d){return d.MassDiff_GNPS_results});
//d3.sum(CSdataSet, function(d){return d.MassDiff_GNPS_results;});
//sumMassOfSubClasses(hierarchy);

   


svg.selectAll("path")
    .data(partition(hierarchy).descendants())
  .enter().append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color((nestedData[0].values ? d : nestedData[0].parent).data.key); })
    .on("click", click)
  .append("title")
    .text(function(d) { return d.data.key + "\n" +
    //formatNumber(d.value) für ganze Zahlen
    //toFixed für Nachkommastellen
    //ohne alles maximale Nachkommastellen
    d.value.toFixed(2); });


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

 