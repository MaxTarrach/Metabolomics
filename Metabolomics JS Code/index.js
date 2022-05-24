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
const uploadconfirm = document.getElementById('uploadconfirm').
addEventListener('click', () => {
  convertToJSON();
 // groupBySuperClass();


//loadCSVFile();



})


function loadCSVFile(){
  let file = document.getElementById('uploadfile').files[0];
  
console.log(file)
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

          groupBySuperClass();
          visualizeData();

          
      
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
  function(d) {return d.cf_class_ms2query_results}
);
console.log(groupedData);
console.log(groupedData.get('Benzenoids'));

let root = d3.hierarchy(groupedData);
console.log(root);


}


 // express.static("https://d3js.org/d3.v7.min.js");

    // set the dimensions and margins of the graph
    
    const margin = {top: 10, right: 10, bottom: 10, left: 10},
      width = 445 - margin.left - margin.right,
      height = 445 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    const svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            `translate(${margin.left}, ${margin.top})`);
    
   
/*
   d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json").then(function(data)


   "clustered_spectra_FractionProfiling_RPOS_ToF10_PreCheck_LTR_01_DDA_Filtered_merged.csv"
*/






function visualizeData(){ 
 
console.log(groupedData);





}


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

  