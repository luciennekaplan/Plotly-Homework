file = "samples.json"

//Load on landing page
function init() {
    //Select all IDs from data
    d3.json(file).then(function(data) {
        subjectIDs = data.names;
        //Select Drop Down
        subjectIdOption = d3.select("#selDataset");
        //Assign each subject ID as dropdown option
        subjectIDs.forEach(function(d) {
            subjectIdOption.append("option").text(d);
        });
        updateDash("940");
});
}

function optionChanged() {
    //d3.event.preventDefault();

    // Select the input value from the form
    var testsubject = d3.select("#selDataset").node().value;

    // Update the Dashboard!
    updateDash(testsubject);
}


//updateDash function calls functions to update all graphics
function updateDash(testsubject) {
    buildTable(testsubject);
    buildBar(testsubject);
    buildBubble(testsubject);
    buildGauge(testsubject);
  }

//Update Demographics Panel
function buildTable(testsubject) {
    d3.json(file).then(function(data) {
        testsubject = parseInt(testsubject);
        var person = data.metadata.filter(d => d.id === testsubject);
        var demographics = d3.select("#sample-metadata");
        demographics.text("")
        person.forEach(function(d) {
            demographics.append("div").text(`ID: ${d.id}`);
            demographics.append("div").text(`Ethnicity: ${d.ethnicity}`);
            demographics.append("div").text(`Gender: ${d.gender}`);
            demographics.append("div").text(`Age: ${d.age}`);
            demographics.append("div").text(`Location: ${d.location}`);
            demographics.append("div").text(`BB Type: ${d.bbtype}`);
            demographics.append("div").text(`Wfreq: ${d.wfreq}`);
        });
    });
}

//Update Bar Graph 
function buildBar(testsubject) {
    d3.json(file).then(function(data) {
    //Grab data for selected test subject
    var selection = data.samples.filter(d => d.id === testsubject);
    //Grab OTU_IDs and sample values from selected data
    var sample_values = (selection[0].sample_values);
    var otu_ids = (selection[0].otu_ids);
    var otu_labels = (selection[0].otu_labels);
    var y_ticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    //Plot collected data in bar graph
    var data = [
        {
            type: 'bar',
            y: y_ticks,
            x: sample_values.slice(0, 10).reverse(),
            orientation: 'h',
            text: otu_labels.slice(0, 10).reverse()
        }
    ];


    Plotly.newPlot('bar', data);
    });
}

//Update Bubble Chart
function buildBubble (testsubject) {
    d3.json(file).then(function(data) {
    // Grab data for selected test subject
    var selection = data.samples.filter(d => d.id === testsubject);
    var sample_values = (selection[0].sample_values);
    var otu_ids = (selection[0].otu_ids);
    var otu_labels = (selection[0].otu_labels);
    //Plot collected data in bubble chart
    var data = [
        {
            mode: 'markers',
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            marker: { size : sample_values, 
                color: otu_ids}
        }
    ];
    var layout = {
        xaxis : {
            title: {
            text: 'OTU ID',
            size: 18
            }
        }
    }

    Plotly.newPlot('bubble', data, layout);
    });
}

//Update Gauge Chart
function buildGauge (testsubject) {
    d3.json(file).then(function(data) {
    //Grab data for selected test subject
    testsubject = parseInt(testsubject);
    var person = data.metadata.filter(d => d.id === testsubject);
    var identifier = person[0].id;
    var frequency = person[0].wfreq;
    //Create/update gauge 
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: frequency,
            title: { text: "Belly Button Washing Frequency" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 9] },
                bar: {color: "midnightblue"},
                steps: [
                    { range: [0, 1], color: "white" },
                    { range: [1, 2], color: "ivory" },
                    { range: [2, 3], color:"linen"},
                    { range: [3, 4], color:"lavenderblush"},
                    { range: [4, 5], color:"pink"},
                    { range: [5, 6], color:"lightpink"},
                    { range: [6, 7], color:"violet"},
                    { range: [7, 8], color:"orchid"},
                    { range: [8, 9], color:"darkorchid"},
                      ],
                }
            }];
    Plotly.newPlot('gauge', data);
});
}



init();