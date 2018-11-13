var pageWidth = window.innerWidth || document.body.clientWidth;
console.log("Page width is "+pageWidth.toString())
var body = document.getElementById('main');
body.width = pageWidth - 200;
console.log("Body Width - ",body.width);

d3.csv("RuralPopulation.csv").then( function(data) {
    console.log(data);
    var table = d3.select('#table1').attr("width", body.width);
    var thead = table.append('thead');
    var tbody = table.append('tbody');

    thead.append("tr")
        .selectAll("th")
        .data(data.columns)
        .enter()
        .append("th")
        .text(function (d) { return d })
        .attr('bgcolor', 'lightgrey');

    tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')
        .attr('bgcolor', function (d, i) { return i % 2 ? "lightgrey" : "white" })
        .selectAll('td')
        .data(function (d) { return Object.values(d)})
        .enter()
        .append('td')
        .text(function (d) { return d; });

    var barchart = d3.select('#barchart').attr("width", body.width);
    var bars = barchart.selectAll('rect').data(data).enter();

    var barwidth = (body.width - 40) / 20;
    console.log("Bar width - ", barwidth);

    var countryCodes = [""]
    var codePositions = [5]
    for (var i=0;i<data.length;i++){
        countryCodes.push(data[i][data.columns[1]])
        codePositions.push((i * barwidth) + 40)
    }

    countryCodes.push("")
    codePositions.push((data.length * barwidth) + 40)

    var xScale = d3.scaleOrdinal().domain(countryCodes).range(codePositions)
    var xAxis = d3.axisBottom(xScale)

    var yScale = d3.scaleLinear().domain([100,0]).range([0,300])
    var yAxis = d3.axisLeft(yScale)

    bars.append('rect')
        .attr('x', function (d, i) { return (i * barwidth) + 40; })
        .attr('y', function (d) { return 300 - (3 * d[data.columns[2]]) + 5; })
        .attr('width', function () { return barwidth - 10; })
        .attr('height', function (d) { return 3 * d[data.columns[2]]; })
        .attr('fill', function (d) { return gradient(d[data.columns[2]]); });

    bars.append('g')
        .attr("transform","translate(25,5)")
        .call(yAxis)

    bars.append('g')
        .attr("transform","translate(20,305)")
        .call(xAxis)

    var scatterplot = d3.select("#scatterplot").attr("width", body.width);
    var scatter = scatterplot.selectAll('circle').data(data).enter();

    scatter.append('circle')
        .attr('cx', function (d, i) { return (i * barwidth) + 60;})
        .attr('cy', function (d) { return 300 - (3 * d[data.columns[2]]) + 5; })
        .attr('r', function () { return 7.5; })
        .attr('fill', function (d) { return gradient(d[data.columns[2]]); });

    scatter.append('g')
        .attr("transform","translate(25,5)")
        .call(yAxis)

    scatter.append('g')
        .attr("transform","translate(20,305)")
        .call(xAxis)
});

d3.csv("RuralPopulationTwoYears.csv").then( function (data){
    var slopegraph = d3.select("#slopegraph").attr("width", body.width);
    var slope = slopegraph.selectAll('line').data(data).enter();

    var yScale = d3.scaleLinear().domain([100,60]).range([0,1000])

    slopegraph.append('text')
        .attr('x', 30)
        .attr('y', 30)
        .attr('font-size', '24px')
        .attr('fill', 'black')
        .attr('font-weight','bold')
        .text("1960");

    slopegraph.append('text')
        .attr('x', body.width - 130)
        .attr('y', 30)
        .attr('font-size', '24px')
        .attr('fill', 'black')
        .attr('font-weight','bold')
        .text("2017");

    slope.append('line')
        .attr('x1', 180)
        .attr('y1', function(d) { return yScale(d[data.columns[2]]); })
        .attr('x2', body.width-160)
        .attr('y2', function(d) { return yScale(d[data.columns[3]]); })
        .attr("stroke", function (d) {
            console.log(gradient(d[data.columns[3]]));
            return gradient(d[data.columns[3]]);
        })
        .attr("stroke-width", 3);

    slope.append('text')
        .attr('x', 20)
        .attr('y', function(d) {return yScale(d[data.columns[2]]);})
        .attr('font-size', '12px')
        .attr('fill', 'black')
        .text(function (d) { return d[data.columns[0]] + " " + d[data.columns[2]]; });

    slope.append('text')
        .attr('x', body.width-150)
        .attr('y', function(d) {return yScale(d[data.columns[3]]);})
        .attr('font-size', '12px')
        .attr('fill', 'black')
        .text(function (d) { return d[data.columns[0]] + " " + d[data.columns[3]]; });


});

function gradient(p){
    const grd = (1-(0.5 + (p-76.1)/(2*(91.73-76.1))))*255;
    return "#" + Math.round(grd).toString(16) + Math.round(grd).toString(16) + Math.round(grd).toString(16);
}