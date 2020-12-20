// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level                 
var myMap = L.map("map", {
    center: [40.7127, -73.98],
    zoom: 13
  });
    
    // Adding a tile layer (the background map image) to our map
    // We use the addTo method to add objects to our map
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
   {id: 'MapID', attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a>'})
  .addTo(myMap);
  
  d3.csv("data/csv_files/cleaned_data/film_permits_clean.csv").then(function(filmData) {
    
    // change the type and format of date 
    filmData.forEach(data =>{
      data.StartDateTime = new Date(data.StartDateTime);
      data.StartDateTime = data.StartDateTime.getFullYear();
      // console.log(typeof data.StartDateTime)
    })  
    
    // console.log(filmData)
    var currentLayer;
    function init() {
      var heatArray = [];
  
      filmData.forEach(data => {
        var location = [data.Latitude, data.Longitude];
        //console.log(location)
  
        heatArray.push(location)
      })
      var layer = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
      }); 
  
      if (currentLayer) {
        myMap.removeLayer(currentLayer);
      }
      myMap.addLayer(layer);
      currentLayer=layer;
    }  
    //on change to the DOM, call optionChanged
      var selectOption=d3.selectAll("#selDataset");
      selectOption.on("change", optionChanged);
  
      // function called by DOM changes
      function optionChanged() {
        
        // assign the value of the dropdown menu option to a variable
        var dropdownMenu = d3.select("#selDataset");
        var dataset = dropdownMenu.property("value");
        // console.log(typeof dataset)
        if (dataset === 'showall') {
          var heatArray = [];
  
          filmData.forEach(data => {
            var location = [data.Latitude, data.Longitude];
            //console.log(location)
  
            heatArray.push(location)
          })
          var layer = L.heatLayer(heatArray, {
            radius: 20,
            blur: 35
          }); 
  
          // if (currentLayer) {
          //   myMap.removeLayer(currentLayer);
          // }
          // myMap.addLayer(layer);
          // currentLayer=layer;
        }  
  
        else {
        // filter the data by the value in the dropdown menu
          var newfilterData = filmData.filter(year => year.StartDateTime === parseInt(dataset));
  
          var newheatArray = [];
  
          newfilterData.forEach(data =>{
            var newLocation = [data.Latitude, data.Longitude];
  
            newheatArray.push(newLocation);
          });
  
          var newlayer = new L.heatLayer(newheatArray, {
            radius: 20,
            blur: 35
          })
  
          if (currentLayer) {
            myMap.removeLayer(currentLayer);
          }
  
          myMap.addLayer(newlayer);
          currentLayer= newlayer;
      } 
    }      
    init();
  })
  
  