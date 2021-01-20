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
    d3.json(file).then(function(data) {
        testsubject = parseInt(testsubject);
        var person = data.metadata.filter(d => d.id === testsubject);
        console.log(person);
    });
}

//Update Bar Graph 
function buildBar(testsubject) {
    d3.json(file).then(function(data) {
    //Grab data for selected test subject
    var selection = data.samples.filter(d => d.id === testsubject);
    console.log(selection)
    //Grab OTU_IDs and sample values from selected data
    var sample_values = (selection[0].sample_values);
    var otu_ids = (selection[0].otu_ids);
    //Plot collected data in bar graph
    var data = [
        {
            type: 'bar',
            y: otu_ids,
            x: sample_values,
            orientation: 'h'
        }
    ];


    Plotly.newPlot('bar', data);
    });
}
