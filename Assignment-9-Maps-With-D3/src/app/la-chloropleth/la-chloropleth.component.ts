import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-la-chloropleth',
  templateUrl: './la-chloropleth.component.html',
  styleUrls: ['./la-chloropleth.component.css']
})
export class LaChloroplethComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const svg = d3.select('#LAchloropleth');
    const width = parseInt(svg.style('width'), 10);
    const height = parseInt(svg.style('height'), 10);
    const projection = d3.geoEquirectangular()
      .scale(153)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);
    const g = svg.append('g')
      .attr('class', 'boundary')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(144)translate(15.72,-209.05)');
    const data = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
    const values = ['1 - 3', '4 - 7', '8 - 11', '12 - 15', '16 - 19', '>=20'];
    const color = d3.scaleThreshold<number, string>()
      .domain(data)
      .range(['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f']);
    svg.selectAll('legendsquare')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 30)
      .attr('y', function(d, i) {
        return (5 - i) * 22 + 380;
      })
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', function(d) {
        return color(d);
      });
    svg.selectAll('legendtext')
      .data(values)
      .enter()
      .append('text')
      .attr('x', 53)
      .attr('y', function(d, i) {
        return (5 - i) * 22 + 395;
      })
      .text(function(d) {
        return d;
      });
    svg.append('text')
      .attr('x', 30)
      .attr('y', 370)
      .attr('font-weight', 'bold')
      .text('Number of Museums');
    svg.append('rect')
      .attr('x', 20)
      .attr('y', 353)
      .attr('width', 190)
      .attr('height', 165)
      .attr('fill', 'transparent')
      .attr('stroke', 'black');

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
      .attr('width', '30px')
      .text('tooltip');

    d3.json('la-county-neighborhoods-with-museums.json').then(function(county) {
      const country = g.selectAll('boundary')
        .data(county['features'])
        .enter();
      country.append('path')
        .attr('d', path)
        .attr('fill', function(d) {
          if (d['properties'].numMuseums > 0) {
            return color((d['properties'].numMuseums / 20));
          }
          return 'white';
        })
        .attr('stroke', 'black')
        .attr('stroke-width', '0.001px')
        .on('mouseover', function(d, i) {
          tooltip.text(  'County - ' + d['properties'].name + ' Number of museums - ' + d['properties'].numMuseums);
          tooltip.style('visibility', 'visible');
        })
        .on('mousemove', function() {
          return tooltip.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
        })
        .on('mouseout', function() {return tooltip.style('visibility', 'hidden'); });
    });
  }
}
