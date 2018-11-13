import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {ContainerElement} from 'd3';

export interface NewYears {
  GDP: number;
  Year: Date;
}

export interface Years {
  GDP: number;
  Year: string;
}

export interface NewDataType {
  Country: string;
  values: Array<NewYears>;
}

export interface DataType {
  Country: string;
  values: Array<Years>;
}

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const svg = d3.select('#linechart'),
      margin = {top: 0, right: 150, bottom: 100, left: 60},
      width = parseFloat(svg.style('width')) - margin.left - margin.right,
      height = parseFloat(svg.style('height')) - margin.top - margin.bottom,
      g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    console.log(width, height);

    const x = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      z = d3.scaleLinear<string>().range(['rgb(30,200,200)', 'rgb(30,100,100)']);

    const line = d3.line<NewYears>()
      .x(function(d) { return x(d['Year']); })
      .y(function(d) { return y(d['GDP']); });

    const tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('color', 'white')
      .style('padding', '8px')
      .style('background-color', 'rgba(0, 0, 0, 0.75)')
      .style('border-radius', '6px')
      .style('font', '12px sans-serif')
      .text('tooltip');

    d3.json('line_chart_data.json').then(function(data: Array<DataType>) {

      const countries: Array<NewDataType> = data.map(function(tuple: DataType) {
        return {
          Country: tuple.Country,
          values: tuple.values.map(function(innerTuple: Years) {
            return {Year: new Date(innerTuple.Year), GDP: innerTuple.GDP / 1000000000};
          })
        };
      });

      console.log(countries);

      const startYear = d3.min(countries, function(c) { return d3.min(c.values, function(d) { return d.Year; }); });
      const endYear = d3.max(countries, function(c) { return d3.max(c.values, function(d) { return d.Year; }); });
      x.domain([startYear, endYear]);

      y.domain([0,
        d3.max(countries, function(c) { return d3.max(c.values, function(d) { return d.GDP; }); })
      ]);

      z.domain([
        d3.min(countries, function(c) { return d3.min(c.values, function(d) { return d.GDP; }); }),
        d3.max(countries, function(c) { return d3.max(c.values, function(d) { return d.GDP; }); })
      ]);

      g.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

      g.append('g')
        .attr('transform', 'translate(0,0)')
        .call(d3.axisLeft(y));

      const country = g.selectAll('.country')
        .data(countries)
        .enter()
        .append('g')
        .attr('class', 'country');

      country.append('path')
        .attr('class', 'line')
        .attr('fill', 'transparent')
        .attr('d', function(d) {return line(d.values); })
        .attr('stroke', function(d) {return z(d.values[d.values.length - 1].GDP); })
        .attr('stroke-width', '3px')
        .attr('pointer-events', 'visibleStroke')
        .on('mouseover', function(d) {
          const year = x.invert(d3.mouse(<ContainerElement>this)[0] + 3).getFullYear();
          tooltip.text( d.Country + 's GDP in the year ' + year + ' - ' + d.values[year - 1970].GDP + ' billion USD');
          tooltip.style('visibility', 'visible');
        })
        .on('mousemove', function(d) {
          const year = x.invert(d3.mouse(<ContainerElement>this)[0] + 3).getFullYear();
          tooltip.text( d.Country + 's GDP in the year ' + year + ' - ' + d.values[year - 1970].GDP + ' billion USD');
          tooltip.style('top', (d3.event.pageY) + 'px').style('left', (d3.event.pageX) + 'px');
        })
        .on('mouseout', function() {tooltip.style('visibility', 'hidden'); })
        .on('click', function(d) {
          d3.selectAll(' .square')
            .attr('fill', function (d1: NewDataType) {return z(d1.values[d1.values.length - 1].GDP); });

          d3.select('.' + d.Country)
            .attr('fill', 'firebrick');
          d3.selectAll('.line')
            .attr('stroke-width', '2.5px')
            .attr('stroke', function(d1: NewDataType) {return z(d1.values[d1.values.length - 1].GDP); });
          d3.select(this)
            .attr('stroke-width', '2.5px')
            .attr('stroke', 'firebrick');
        });

      country.append('text')
        .attr('x', width + 27)
        .attr('y', function(d, i) {return 70 + i * 30; })
        .text(function(d) { return d.Country; });

      country.append('rect')
        .attr('x', width + 13)
        .attr('y', function(d, i) { return 60 + i * 30; })
        .attr('height', 10)
        .attr('width', 10)
        .attr('fill', function(d) {return z(d.values[d.values.length - 1].GDP); })
        .attr('class', function(d) {return d.Country + ' square'; });

      g.append('rect')
        .attr('x', width + 10)
        .attr('y', 50)
        .attr('height', 300)
        .attr('width', 105)
        .attr('fill', 'transparent')
        .attr('stroke', 'black')
        .attr('stroke-width', '0.5px');
      g.append('text')
        .attr('x', width / 2)
        .attr('y', height + 35)
        .text('Year');
      g.append('text')
        .attr('transform', 'translate(-45,' + height / 2 + ')rotate(270)')
        .text('GDP');
    });
  }
}
