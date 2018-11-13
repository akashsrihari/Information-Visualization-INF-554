# INF 554 Assignment 7

## Table of Contents

* [Data Source](#data-source)
* [Building and Publishing a8](#building-and-publishing-a8)
* [USC SCF Published Webpage](#usc-scf-published-webpage)
* [Creating components in angular](#creating-components-in-angular)
* [Type Scripting](#type-scripting)
* [Bubble Chart](#bubble-chart)
* [Line Chart](#line-chart)
* [Pie Chart](#pie-chart)
* [Bootstrap](#bootstrap)

## Data Source

The data source used for the assignment was the [UN database for GDP of countries](http://data.un.org/Data.aspx?q=GDP&d=SNAAMA&f=grID%3a101%3bcurrID%3aUSD%3bpcFlag%3a0).

## Building and Publishing a8

The following command was used to build the angular project that was published onto aludra.

```bash
ng build --prod --output-path a8 --base-href src
```

This was because index.html that gets rendered exists in src. Once all files were generated, the folder was moved to public_html in aludra to be published using the command below.

```bash
scp -r ~/a8-akashsrihari/a8 chinam@aludra.usc.edu:~/public_html
```

## USC SCF Published Webpage
   
The published webpage on USC SCF can be found [here](http://www-scf.usc.edu/~chinam/a8).

## Creating components in angular

Each chart was created as a separate component in this assignment. This was done using the following angular command.

```bash
ng generate component bubble-chart
```

Once created, these components were included in the webpage in the following way.

```html
<app-bubble-chart></app-bubble-chart>
<app-linechart></app-linechart>
<app-piechart></app-piechart>
```

## Type Scripting

Writing scripts in .ts files is different from the usual .js files as the programming is stricter. To import data with d3, custom data types have to be declared so that the imported data can be used without any errors.

```typescript
export interface Years {
  GDP: number;
  Year: string;
}

export interface DataType {
  Country: string;
  values: Array<Years>;
}
```

## Bubble Chart

The bubble chart uses a pack function available in d3 to fit in the bubbles in the svg container.

```typescript
const pack = data => d3.pack()
      .size([width - 2, height - 2])
      .padding(3)
      (d3.hierarchy({children: data})
        .sum(d => parseFloat(d['GDP2016'])));

const root = pack(data);
```

The data stored in root can now be used to render the circles in bubble chart. This created a bubble chart that is placed tightly in the svg.

## Line Chart

To create a line chart, paths are added for each country. To create a path the following function was used.

```typescript
const line = d3.line<Years>()
      .x(function(d) { return x(d['Year']); })
      .y(function(d) { return y(d['GDP']); });
```

The line chart had a legend created beside it using d3 data binding by created a one rectangle and text line per element. Each line in the line chart also gets highlighted when clicked, also highlighting its corresponding element in the legend.

## Pie Chart

The pie chart was created using arcs and pie availble in d3. It has mouseover functions to increase in size and display the values in a card beside it.

```typescript
const pie = d3.pie<void, DataType>()
      .sort(null)
      .value(function(d: DataType) { return d.GDP2016; });
const path = d3.arc<void, d3.PieArcDatum<DataType>>()
      .outerRadius(radius - 20)
      .innerRadius(0);
```

## Bootstrap

Bootstrap was used to create responsive containers in this assignment. In the case of the pie chart, it was used to make the card appear beside the pie chart in case there was space available. Otherwise it displays the card under the pie chart so that it can be read easily by scrolling.

```html
<div class="container">
  <div class="row">
    <div class="col">
      <svg id="piechart"></svg>
    </div>
    <div class="col align-self-center">
      <div class="card">
        <div class="card-body" id="text1">
          Hover over pie chart
        </div>
        <div class="card-body" id="text2">
          for more information
        </div>
      </div>
    </div>
  </div>
</div>

```
