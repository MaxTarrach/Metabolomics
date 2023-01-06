d3.text("clustered_spectra_FractionProfiling_RPOS_ToF10_PreCheck_LTR_01_DDA_Filtered_merged (2).csv", function(data) {
    var parsedCSV = d3.csv.parseRows(data);

    var container = d3.select("body")
        .append("table");

            
        // headers

        container.selectAll("tr")
            .data(parsedCSV).enter()
            .append("tr")

            .selectAll("td")
                .data(function(d) { return d; }).enter()
                .append("td")
                .text(function(d) { return d; });
});


function deleteSample() {

// delete current displayed files from table


}; 


function loadSample(){



};