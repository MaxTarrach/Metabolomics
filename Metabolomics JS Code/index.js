/*with d3 u can select und manipulate all Objects at the same time. To have this Data-Binding and make sure, we react to changes, we need 3D.jS. This code snippet will render the Paragraphs for a div
*/
//https://www.youtube.com/watch?v=TOJ9yjvlapY 
//first div on the page
//select all Paragraphs
//Bind data to that Paragraph
// Give me all the Missing Elements
// Append/Render the missing Paragraph as they are required
// Set Text for every paragraph element. Data(dta) gives you Access to the Data for Each Datapoint in each Paragraph
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

/*d3.select('div')
  .selectAll('p')
  .data(DUMMY_DATA)
  .enter()
  .append('p')
  .text(dta => dta.region); 
 */