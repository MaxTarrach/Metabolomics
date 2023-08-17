//handler for out data
d3.csv("clustered_spectra_sample.csv", function(data){
 //   console.log(data);

    //container
    var canvas = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500)

    canvas.selectAll("rect")
    .data(data)
    .enter()
        .append("rect")
        // Bsp.: return d.age property ausgeben 
        .attr("width", function (d) {return d.MassDiff_GNPS_results})
        .attr("height", 50)
        .attr("y", function(d, i){return i * 50;})
        .attr("fill", "blue")
    
      //  console.log(data);
    })
