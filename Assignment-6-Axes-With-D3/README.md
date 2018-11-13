# INF 554 Assignment 6

## Table of Contents

  * [Data Source](#data-source)
  * [Publishing files to Aludra server](#publishing-files-to-aludra-server)
  * [USC SCF Published Webpage](#usc-scf-published-webpage)
  * [Cloning this repository](#cloning-this-repository)
  * [Dynamic Alignment](#dynamic-alignment)
  * [Debugging in Javascript](#debugging-in-javascript)
  * [Style Inheritance](#style-inheritance)
  * [Gradient Coloring](#gradient-coloring)
  * [Using D3 in Javascript](#using-d3-in-javascript)
  * [Slope graph](#slope-graph)

## Data Source

The data used in this assignment was taken from World Bank's data on [Rural Population](https://data.worldbank.org/indicator/SP.RUR.TOTL.ZS)

## Publishing files to Aludra server

The following commands were used to publish the html page onto the USC SCF server

```bash
scp ~/a6-akashsrihari/a6.html chinam@aludra.usc.edu:~/public_html
scp ~/a6-akashsrihari/style.css chinam@aludra.usc.edu:~/public_html
scp ~/a6-akashsrihari/chart.js chinam@aludra.usc.edu:~/public_html
scp ~/a6-akashsrihari/RuralPopulation.csv chinam@aludra.usc.edu:~/public_html
scp ~/a6-akashsrihari/RuralPopulationTwoYears.csv chinam@aludra.usc.edu:~/public_html
```

## USC SCF Published Webpage

The published webpage on USC SCf can be found [here](http://www-scf.usc.edu/~chinam/a6.html)

## Cloning this repository

Use the following commands to clone the dictionary and open the html page created for the assignment. The html page will open in your default browser.

```bash
git clone https://github.com/INF554Fall18/a6-akashsrihari.git
cd a6-akashsrihari
open ./a6.html
```

## Dynamic Alignment

To create a tailored fit of the html page, the widths of objects in the webpage were dynamically generated using javascript commands stored in [chart.js](chart.js). The width of the webpage is calculated and then assigned to the body, after which each element is also given the same width. For the UNICEF infographic, 65% of the width is given and 35% for the Huffington Post infographic. Shown below is the snippet used to calculate page width.

```javascript
var pageWidth = window.innerWidth || document.body.clientWidth
var body = document.getElementById('main')
```

## Debugging in Javascript

Debugging can be done in the [chart.js](chart.js) file using console messages as shown below.

```javascript
console.log("Page width is "+pageWidth.toString())
console.log("Body Width - ",body.width);
```

## Style Inheritance

By applying certain styles to the parent element, the children elements also get the same styles. Shown below are two div style elements which are nested in the html page to create centered text but with the same remaining properties as the other text elements in the web page.

```css
div.text {
    display: block;
    text-align: left;
    justify-content: left;
}

div.centered {
    text-align: center;
}
```

```html
<div class="text">
    <div class="centered">
        <!-- Centered text here -->
    </div>
</div>
```

## Gradient Coloring

In all the charts in [a4.html](a4.html), the color scheme was set so that elements with higher values got assigned darker colors. This was done using the following javascript function.

```javascript
function gradient(p){
    const grd = (1-(0.5 + (p-76.1)/(2*(91.73-76.1))))*255;
    return "#" + Math.round(grd).toString(16) + Math.round(grd).toString(16) + Math.round(grd).toString(16);
}
```

## Using D3 in Javascript

In the previous assignment d3 was only used to load data onto the page. In this assignment, d3 was used to draw axes for charts. The scales used were ordinal and linear (for text and numerical data). Shown below is an example of how each of those scales were created.

```javascript

// Linear scale
var yScale = d3.scaleLinear().domain([100,60]).range([0,1000])

// Values for the ordinal scale
var countryCodes = [""]
var codePositions = [5]
for (var i=0;i<data.length;i++){
    countryCodes.push(data[i][data.columns[1]])
    codePositions.push((i * barwidth) + 40)
    }
countryCodes.push("")
codePositions.push((data.length * barwidth) + 40)

// Ordinal Scale
var xScale = d3.scaleOrdinal().domain(countryCodes).range(codePositions)
```

## Slope graph

A slope graph was created on the webpage to show the transition of rural population over time. The dataset used for this was similar to the dataset used for the rest of the charts, except with an additional column to show rural population in 1960. Another difference is that this dataset contains information on only 10 countries as there was a huge overlap when the 20 countries used for other charts were displayed.
