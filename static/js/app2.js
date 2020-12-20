var file = "././data/csv_files/cleaned_data/permits_by_category_and_subcategory.csv"

d3.csv(file).then(makeChart);

function makeChart(data) {
    var category_selection = "Television";
    var filtered_data = data.filter(function(d) {return d.Category})

    var categoryLabels = data.map(function(d) {return d.Category});
    var subCategoryLabels = data.map(function(d) {return d.SubCategoryName})
    var permitCounts = data.map(function(d) {return +d.EventID});

    function subject_



        // Get sample data for selected subject only
        var subject_sample = data.samples.filter(sample => sample.id == select_id)[0]
        var subj_sample_values = subject_sample.sample_values;
        var subj_otu_labels = subject_sample.otu_labels;
        var subj_otu_ids = subject_sample.otu_ids;
        var subj_otu_id_strings = subj_otu_ids.map(id => `OTU ${id}`)

    function filterMovieRatings(movie) {
        return movie.imdbRating > 8.9;
        }
        
        // 2. Use filter() to pass the function as its argument
        var filteredMovies = topMovies.filter(filterMovieRatings);
        
        //  Check to make sure your are filtering your movies.
        console.log(filteredMovies);
        
        // 3. Use the map method with the arrow function to return all the filtered movie titles.
        var titles = filteredMovies.map(movies =>  movies.title);

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
                text: 'Number of Permits by Category',
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
};


