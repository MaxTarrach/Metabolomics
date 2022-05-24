let data = [
    {
      "Title": "Adaptation",
      "Distributor": "Sony Pictures",
      "Genre": "Comedy",
      "Worldwide_Gross": 22498520,
      "Rating": 91
    },
    {
      "Title": "Air Bud",
      "Distributor": "Walt Disney Pictures",
      "Genre": "Comedy",
      "Worldwide_Gross": 27555061,
      "Rating": 45
    },
    {
      "Title": "Air Force One",
      "Distributor": "Sony Pictures",
      "Genre": "Action",
      "Worldwide_Gross": 315268353,
      "Rating": 78
    },

  ];
console.log(data);
  function sumWorldwideGross(group) {
    return d3.sum(group, function(d) {
      return d.Worldwide_Gross;
    });
  }
  
  let groups = d3.rollup(data,
                         sumWorldwideGross,
                         function(d) { return d.Distributor; },
                         function(d) { return d.Genre; }
                        );
console.log(groups.get('Sony Pictures'));


// das ganze mal mit einem kleinen Sample vom Datenarray (rauskopiert) probieren
