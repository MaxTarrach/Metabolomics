//===== Alignment Chart Code ======

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

document.getElementById("ShowGraphButton").onclick = function(){
updateJSChartContent(); 
generateTable(); 
}



//===== Alignment Chart Code END ======


// ============= Chart JS Test Code ======

var chartJSObject = document.getElementById("chartJS");


var chartLabels = [""]; 
var chartCountData  = []; 

var JSChart = new Chart(chartJSObject, {
  type: "bar",
  data: {
    labels: chartLabels,
    datasets: [{
      label: "Counted Dataset",
      backgroundColor: 'rgba(65,105,225,0.4)',
      barPercentage: 1,
      data: chartCountData, 

    },
  ],
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],

    },
    maintainAspectRatio: false,
  }


});
function sortDataPointsByCount(){
//Sort Data descending from highest count to lowest SmileCount 
let sortedDataPoints = filteredAndFoundDataPoints.sort(
  (p1, p2) => (p1.getSmilesCount() < p2.getSmilesCount()) ? 1 : (p1.getSmilesCount() > p2.getSmilesCount()) ? -1 : 0);
filteredAndFoundDataPoints = sortedDataPoints; 
}

function updateJSChartContent(){
  
  //sorting isnt necessary, may delete
  sortDataPointsByCount(); 

  //get the Smiles+count Data Object and map it into an array
  let JSChartData = Object.keys(countedSmiles).map((key) => [String(key), countedSmiles[key]]);

// Sort this Array by Smiles Count
  let sortedJSChartData = JSChartData.sort(
    (p1, p2) => (p1[1] < p2[1]) ? 1 : (p1[1] > p2[1]) ? -1 : 0);

console.log(sortedJSChartData);
// Fill X and Y-Values for the Chart 
  for(var i = 0; i<sortedJSChartData.length;i++){
    chartLabels.push(sortedJSChartData[i][0]);
    chartCountData.push(sortedJSChartData[i][1]);
  }



console.log(countedSmiles);
console.log(Object.keys(countedSmiles));
console.log(Object.values(countedSmiles));  
  JSChart.update(); 
}

let tbl = document.createElement("table");
let tblBody = document.createElement("tbody");

function generateTable() {

  // creates a <table> element and a <tbody> element
  let tbl = document.createElement("table");
  let tblBody = document.createElement("tbody");

  // creating all cells
  for (let i = 0; i < 5; i++) {
    // creates a table row
    const row = document.createElement("tr");

    for (let j = 0; j < Object.keys(countedSmiles).length; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      const cell = document.createElement("td");
     cell.fitWidth = "25px";
      const cellText = document.createTextNode(chartCountData[j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "2");
  tbl.style.marginTop = "50px";
}

// Set Range Slider
let minCountRange = document.getElementById("minCount");
let maxCountRange = document.getElementById("maxCount");


document.getElementById("countRangeButton").onclick = function(){
 
  setChartJSRange();
  generateTable(); 
 
}

function setChartJSRange(){
  for(var i = 0; i<chartCountData.length; i++){

    if(chartCountData[i] > maxCountRange.value){
      chartCountData.splice(i, 1);
      chartLabels.splice(i,1);
    }

    if(chartCountData[i] < minCountRange.value){
      console.log("reached"); 
      chartCountData.splice(i, 1);
     chartLabels.splice(i,1);
    }
    
    JSChart.update();

}


console.log("Min:"+minCountRange.value+" Max:"+maxCountRange.value);
console.log(chartCountData);
console.log("chart updated");
}