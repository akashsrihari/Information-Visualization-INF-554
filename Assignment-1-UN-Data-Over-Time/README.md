# INF 554 Assignment 1

## UN Data over time

The charts generated in this assignment were based on the data collected for the top 10 countries with the largest economies (found [here](https://www.investopedia.com/insights/worlds-top-economies/)). The data was collected, filtered, pivoted and stored in this [Google doc](https://docs.google.com/spreadsheets/d/12j52HkDqWc8gR1CMKEu_HGeD7os6rUUxCGyS7XV18qQ/edit#gid=805596724). Charts are already generated for the sheets labeled "GDP" and "Unemployment". For the sheet titled "Population", the chart is generated dynamically on the html page itself.

Further information and observations regarding these charts is available on the html file [index.html](index.html). Please see the instructions below to clone this repository and open the html file.

## Cloning this repository

Use the following commands to clone the dictionary and open the html page created for the assignment.

```bash
git clone https://github.com/INF554Fall18/a1-akashsrihari.git
cd a1-akashsrihari
open ./index.html
```

The html page will open in your default browser. Do not change the location of the file "Unemployment.png" as that will affect the rendering of the html page.

## Creation of index.html

The html page contains 3 sections. The first section imports a [chart from Google Sheets](https://docs.google.com/spreadsheets/d/12j52HkDqWc8gR1CMKEu_HGeD7os6rUUxCGyS7XV18qQ/edit#gid=1264931941) as an embedded iframe element. This chart shows the Gross Domestic Product (GDP) of the Top 10 economies mentioned on the html page itself. This chart is a stacked column chart, which is useful to see the individual changes of each country as well as their change as a group.

The [second chart](https://docs.google.com/spreadsheets/d/12j52HkDqWc8gR1CMKEu_HGeD7os6rUUxCGyS7XV18qQ/edit#gid=805596724) is generated dynamically using javascript on the webpage. It shows the Population over time for the same countries shown in the first chart. This chart is a line chart, which helps see the data as a flow for better visualization. The following is a javascript snippet that is used to fetch the data from the webpage dynamically.

```javascript
function drawChart() {
        var query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/12j52HkDqWc8gR1CMKEu_HGeD7os6rUUxCGyS7XV18qQ/edit#gid=805596724");
        query.send(handleQueryResponse);
    }
```

The [third chart](https://docs.google.com/spreadsheets/d/12j52HkDqWc8gR1CMKEu_HGeD7os6rUUxCGyS7XV18qQ/edit#gid=2082997371) (also a line chart) shows the number of unemployed people in each country. This chart helps us create a comparison to the first two charts to see how unemployment and its ratio to population in each country affects its GDP.