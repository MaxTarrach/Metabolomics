function appendDataCollector(datacollector) {

  var nr_files = datacollector.length;
  var newArray = datacollector[0];
  if (nr_files > 1){
  for (let i = 1; i < nr_files; i++) {
    newArray = newArray.concat(datacollector[i])
  }
  return newArray;
  } 
  else {
    return newArray;
  }
}; 

//===== Data Table Code START ======

function createTable(data) { 

  console.log(data);

  var datatable = document.getElementById('dataTable');

  // Create table element
  var table = document.createElement("table");

  // Create table header row
  var headerRow = document.createElement("tr");

  // Die Zeile ist shit. Unten!! Data ist noch nicht definiert beim ersten Durchlauf
  var headers = Object.keys(data[0]);

  console.log(headers);

  headers.forEach(function(header) {
    var th = document.createElement("th");
    th.innerHTML = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Hier kommt es nicht mehr hin
  console.log("I WAS HERE");

  // Create table rows for data
  data.forEach(function(object) {
    var row = document.createElement("tr");
    headers.forEach(function(header) {
      var td = document.createElement("td");
      td.innerHTML = object[header];
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  // hier hin nicht mehr
  

  table.setAttribute('style', 'table-layout: fixed; width: 100%');
  // Append table to body
  datatable.appendChild(table);

  
}

//===== Data Table Code END ======


// Input: An Array containing Arrays with content of different Files 
// Return: One Array with concatenated Arrays from Input

