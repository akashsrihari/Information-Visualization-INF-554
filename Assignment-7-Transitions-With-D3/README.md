# INF 554 Assignment 7

## Table of Contents

* [Data Source](#data-source)
* [Publishing files to Aludra server](#publishing-files-to-aludra-server)
* [USC SCF Published Webpage](#usc-scf-published-webpage)
* [Cloning this repository](#cloning-this-repository)
* [Dynamic Alignment](#dynamic-alignment)
* [Events](#events)
* [Transitions](#transitions)

## Data Source

The data used in this assignment was taken from the [UN website](http://data.un.org/Data.aspx?q=Population&d=PopDiv&f=variableID%3a12) and was modified to focus on the [top 10 countries with the largest economies](https://www.investopedia.com/insights/worlds-top-economies/).

## Publishing files to Aludra server

The files necessary to load [a7.html](a7.html) were published to Aludra (including min.js files that come with the packages installed with npm). These files were published using scp. Directories created on aludra needed different permissions to let the html page access rest of the files.

### Commands used to create repositories and change permissions
```bash
cd public_html
mkdir -p node_modules/bootstrap/dist/js
chmod -R 755 node_modules/bootstrap/dist/js
```

### Commands to send files to aludra
```bash
scp ~/a7-akashsrihari/node_modules/bootstrap/dist/js/bootstrap.min.js chinam@aludra.usc.edu:~/public_html/node_modules/bootstrap/dist/js
```

## USC SCF Published Webpage
   
The published webpage on USC SCf can be found [here](http://www-scf.usc.edu/~chinam/a7.html)

## Cloning this repository

Use the following commands to clone the dictionary and open the html page created for the assignment. The html page will open in your default browser.

```bash
git clone https://github.com/INF554Fall18/a7-akashsrihari.git
cd a7-akashsrihari
open ./a7.html
```

## Dynamic Alignment

Dynamic alignment was previously done by setting the width of the body to be 100px less than the width of the entire html page using the following javascript snippet.

```javascript
var pageWidth = window.innerWidth || document.body.clientWidth;
var body = document.getElementById('main');
body.width = pageWidth - 100;
```

In this assignment, another way to dynamically align the elements based on browser width was by using bootstrap containers (for svg and buttons). The container used for the barchart svg crops without scrolling ability when screen width is reduced. The container for buttons rearranges the buttons so that all of them are rearranged when screen width is reduced. Given below is an html snippet that demonstrates the use of bootstrap.

```html
<div class="container">
    <svg id="barchart" height="480px"></svg>
</div>
<div class="centered" id="buttons">
    <div class="btn-block">
        <button type="button" class="btn btn-primary" id="countryName">Default (Alphabetic order)</button>
        <button type="button" class="btn btn-primary" id="allTen">Show All 10</button>
        <button type="button" class="btn btn-primary" id="topFive">Top 5 (Population)</button>
        <button type="button" class="btn btn-primary" id="bottomFive">Bottom 5 (Population)</button>
        <button type="button" class="btn btn-primary" id="ascCountry">Order By Country Name (Alphabetic)</button>
        <button type="button" class="btn btn-primary" id="ascPop">Order By Population (Ascending)</button>
        <button type="button" class="btn btn-primary" id="descPop">Order By Population (Descending)</button>
    </div>
</div>
```

By using the classes "btn btn-primary" and "container", it is possible to achieve dynamic page structures.

## Events

There are 7 buttons on [a7.html](a7.html) to modify the data used to build the bar chart. Each button was assigned an onclick function that modifies the data and re-renders the bar chart. Onclick functions were added in the file [chart.js](chart.js) using the following snippet:

```javascript
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
```  

The plotter function updates data and removes previous elements. It is called from every onclick function to re-render the bar chart.

## Transitions

To make the re-rendering of the bar chart look smooth and easy on the users eyes, transition effects were added. The following snippet was used in the plotter function mentioned above to apply transitions to the rectangles that are added to the svg.

```javascript
bars.enter()
    .append('rect')
    .transition()
    .duration(transitionDuration)
    .delay(function(d, i) { return i * transitionDelay; })
    .attr('class','rectangle')
    .attr('x', function (d, i) { return (i * barwidth) + axisLeftMargin; })
    .attr('y', function (d) {return 530-yScale(d.Population); })
    .attr('width', function () {
        if (data.length == 10)
            return barwidth - 10;
        else
            return (barwidth/2)-10;
    })
    .attr('height', function (d) { return yScale(d.Population); })
    .attr('fill', "#0069d9");
```