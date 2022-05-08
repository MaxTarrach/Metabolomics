/*with d3 u can select und manipulate all Objects at the same time. To have this Data-Binding and make sure, we react to changes, we need 3D.jS. This code snippet will render the Paragraphs for a div
*/
//https://www.youtube.com/watch?v=TOJ9yjvlapY 
//first div on the page
//select all Paragraphs
//Bind data to that Paragraph
// Give me all the Missing Elements
// Append/Render the missing Paragraph as they are required
// Set Text for every paragraph element. Data(dta) gives you Access to the Data for Each Datapoint in each Paragraph



/*
const DUMMY_DATA = [
    {id: 'd1', value: 10, region: 'China'},
    {id: 'd1', value: 11, region: 'Germany'},
    {id: 'd1', value: 12, region: 'Ukraine'},
    {id: 'd1', value: 6, region: 'Russia'},
   
]

//Scaling-Function helps to calculate the position of different data points, that are related to each other
//Scale the Bars in the Space that is available
const xScale = d3
.scaleBand()
.domain(DUMMY_DATA.map((dataPoint) => dataPoint.region)).rangeRound([0,250]).padding(0.1);
// Range of Values(0-15) in the coordinate system in the (200, 0) 
const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);

//container Rahmen render
const container = d3.select('svg')
.classed('container', true)

//Add Elements to container
const bars = container
.selectAll('.bar')
.data(DUMMY_DATA)
.enter()
.append('rect')
.classed('bar', true)
.attr('width', xScale.bandwidth())
.attr("height", (data) => 200 - yScale(data.value))
// 36:50min
.attr('x', data => xScale(data.region))
.attr('y',data => yScale(data.value));

*/



    
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
    
    // read json data
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json").then(function(data) {
    
      // Give the data to this cluster layout:
      const root = d3.hierarchy(data).sum(function(d){ return d.value}) // Here the size of each leave is given in the 'value' field in input data
    
      // Then d3.treemap computes the position of each element of the hierarchy
      d3.treemap()
        .size([width, height])
        .padding(2)
        (root)
    
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
    })