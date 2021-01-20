function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
};
  
file = "samples.json"

function optionChanged() {
    //d3.event.preventDefault();

    // Select the input value from the form
    var testsubject = d3.select("#selDataset").node().value;
    console.log(testsubject);

    // Update the Dashboard!
    updateDash(testsubject);
}


//updateDash function calls functions to update all graphics
function updateDash(testsubject) {
    buildTable(testsubject);
    buildBar(testsubject);
  }

//Update Demographics Panel
function buildTable(testsubject) {
    var demographics = d3.select("#sample-metadata")
}

//Update Bar Graph 
function buildBar(testsubject) {
    d3.json(file).then(function(data) {
    //Grab data for selected test subject
    var selection = data.samples.filter(d => d.id === testsubject)
    //Grab OTU_IDs and sample values from selected data
    var sample_values = (selection[0]).sample_values
    var otu_ids = (selection[0]).otu_ids
    //Plot collected data in bar graph
    var data = [
        {
            x: otu_ids,
            y: sample_values,
            type: 'bar'
        }
    ];

    Plotly.newPlot('bar', data);
    })
}
