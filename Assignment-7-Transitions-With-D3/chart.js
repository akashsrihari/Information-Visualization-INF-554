var pageWidth = window.innerWidth || document.body.clientWidth;
console.log("Page width is "+pageWidth.toString())
var body = document.getElementById('main');
body.width = pageWidth - 100;
console.log("Body Width - ",body.width);
var data = []
var order = ""
var titleMapper = {
    "ascName" : "Alphabetic Order",
    "ascPop" : "Ascending Order (Population)",
    "descPop" : "Descending Order (Population)"
}

function plotter(initial=false) {

    var axisLeftMargin = 105;
    var transitionDuration = 800;
    var transitionDelay = 200;
    var barwidth = (body.width - axisLeftMargin - 50) / data.length;
    var barchart = d3.select('#barchart').attr("width", body.width-50);
    var bars = barchart.selectAll('rect').data(data);
    var barYAxis = barchart.select('.yAxis');
    var barXAxis = barchart.select('.xAxis');

    var maxPop = d3.max(data, function (d){ return d.Population});
    var yScale = d3.scaleLinear().domain([0,maxPop*1.02]).range([0,400]);
    var yAxisScale = d3.scaleLinear().domain([maxPop*1.02,0]).range([0,400]);
    var yAxis = d3.axisLeft(yAxisScale);

    var countries = data.map(a => a.Country);
    countries.unshift("")
    var codePositions = [20]
    for(var i=0;i<data.length;i++){
        codePositions.push((i * barwidth) + (axisLeftMargin)/2 + 7)
    }
    codePositions.push(pageWidth)
    var xScale = d3.scaleOrdinal().domain(countries).range(codePositions);
    var xAxis = d3.axisBottom(xScale)

    bars.transition()
        .duration(transitionDuration)
        .delay(function(d, i) { return i * transitionDelay; })
        .attr('class','rectangle')
        .attr('x', function (d, i) { return (i * barwidth) + axisLeftMargin; })
        .attr('y', function (d) {return 430-yScale(d.Population); })
        .attr('width', function () {
            if (data.length == 10)
                return barwidth - 10;
            else
                return (barwidth/2)-10;
        })
        .attr('height', function (d) { return yScale(d.Population); })
        .attr('fill', "#0069d9");

    bars.exit()
        .transition()
        .delay(transitionDelay)
        .duration(transitionDuration)
        .style("opacity", 0)
        .remove();

    bars.enter()
        .append('rect')
        .transition()
        .duration(transitionDuration)
        .delay(function(d, i) { return i * transitionDelay; })
        .attr('class','rectangle')
        .attr('x', function (d, i) { return (i * barwidth) + axisLeftMargin; })
        .attr('y', function (d) {return 430-yScale(d.Population); })
        .attr('width', function () {
            if (data.length == 10)
                return barwidth - 10;
            else
                return (barwidth/2)-10;
        })
        .attr('height', function (d) { return yScale(d.Population); })
        .attr('fill', "#0069d9");

    barYAxis.transition()
        .duration(transitionDuration)
        .delay(function(d, i) { return i * transitionDelay; })
        .attr('class','yAxis')
        .attr('transform','translate(95,30)')
        .call(yAxis)

    barXAxis.transition()
        .duration(transitionDuration)
        .delay(function(d, i) { return i * transitionDelay; })
        .attr('class','xAxis')
        .attr('transform','translate(75,430)')
        .call(xAxis);

    d3.select("#chartTitle")
        .text("Countries vs Population (" + titleMapper[order] + ") for " + data.length + " countries");

    if (initial){
        barchart.append('g')
            .transition()
            .duration(transitionDuration)
            .delay(function(d, i) { return i * transitionDelay; })
            .attr('class','yAxis')
            .attr('transform','translate(95,30)')
            .call(yAxis);

        barchart.append('g')
            .transition()
            .duration(transitionDuration)
            .delay(function(d, i) { return i * transitionDelay; })
            .attr('class','xAxis')
            .attr('transform','translate(75,430)')
            .call(xAxis);

        barchart.append('text')
            .attr('transform','translate(15,300)rotate(270)')
            .text("Population");

        barchart.append('text')
            .attr('transform','translate('+(body.width/2)+',470)')
            .text("Country");

        barchart.append('text')
            .attr('transform','translate(150,15)')
            .attr('id','chartTitle')
            .text("Countries vs Population (" + titleMapper[order] + ") for " + data.length + " countries");
    }
}

function retainOrder(d){
    if (order == "ascName") {
        data = d.sort(
            function (x, y) {
                return d3.ascending(x.Country, y.Country);
            }
        );
    }
    else if (order == "ascPop") {
        data = d.sort(
            function (x, y) {
                return d3.ascending(x.Population, y.Population);
            }
        );
    }
    else if (order == "descPop") {
        data = d
            .sort(function (x, y) {
                return d3.descending(x.Population, y.Population);
            });
    }
}

d3.json("data.json").then(function (d){
    data = d;
    order = "ascName";
    plotter(true);
});

d3.select("#allTen")
    .on("click", function () {
        d3.json("data.json").then(function (d) {
            retainOrder(d);
            plotter();
        });
    });

d3.select("#countryName")
    .on("click",function(){
        d3.json("data.json").then(function (d){
            data = d;
            order = "ascName";
            plotter();
        });
    });

d3.select("#ascCountry")
    .on("click", function(){
        data = data.sort(
            function(x,y){
                return d3.ascending(x.Country, y.Country);
            }
        );
        order = "ascName";
        plotter();
    });

d3.select("#topFive")
    .on("click",function(){
        d3.json("data.json").then(function (d){
            temp = d
                .sort(function(x,y){
                    return d3.descending(x.Population, y.Population);
                })
                .slice(0,5)
                .map(x => x.Country);
            retainOrder(d);
            data = data.filter(x => temp.includes(x.Country));
            plotter();
        });
    });

d3.select("#bottomFive")
    .on("click",function(){
        d3.json("data.json").then(function (d){
            temp = d
                .sort(function(x,y){
                    return d3.ascending(x.Population, y.Population);
                })
                .slice(0,5)
                .map(x => x.Country);
            retainOrder(d);
            data = data.filter(x => temp.includes(x.Country));
            plotter();
        });
    });

d3.select("#ascPop")
    .on("click",function(){
        data = data.sort(
            function(x,y){
                return d3.ascending(x.Population, y.Population);
            }
        );
        order = "ascPop";
        plotter();
    });

d3.select("#descPop")
    .on("click",function(){
        data = data.sort(function(x,y){
                return d3.descending(x.Population, y.Population);
            }
        );
        order = "descPop"
        plotter();
    });