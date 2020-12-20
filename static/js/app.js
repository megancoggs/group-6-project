// var file = "././data/csv_files/cleaned_data/permits_by_category.csv"

url = "https://localhost:5000/api/PermitsCategory"

d3.json(url).then(data => {

    var categoryLabels = data.map(function(d) {return d.Category});
    var permitCounts = data.map(function(d) {return +d.EventID});

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: categoryLabels,
          datasets: [
            {
              data: permitCounts,
              backgroundColor: '#40E0D0'
            }
          ],
          
        },
        options: {
            title: {
                display: true,
                text: 'Number of Permits by Category 2012 - 2020',
                fontSize: 20,
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Categories',
                    fontSize: 16
                  }
                }],
                xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Number of Permits',
                      fontSize: 16
                    }
                  }]
            }
        }
      });
});


