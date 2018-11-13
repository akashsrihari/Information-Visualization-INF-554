import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-world-proportional-symbol',
  templateUrl: './world-proportional-symbol.component.html',
  styleUrls: ['./world-proportional-symbol.component.css']
})
export class WorldProportionalSymbolComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const svg = d3.select('svg');
    const width = parseInt(svg.style('width'), 10);
    const height = parseInt(svg.style('height'), 10);
    const projection = d3.geoEquirectangular().scale(153).translate([width / 2 , height / 2]);
    const path = d3.geoPath().projection(projection);

    svg.append('text')
      .attr('x', 30)
      .attr('y', 282)
      .attr('font-weight', 'bold')
      .text('GDP (Trillion USD)');
    svg.append('circle')
      .attr('cx', 95)
      .attr('cy', 390)
      .attr('r', 20)
      .attr('fill', 'transparent')
      .attr('stroke', 'black');
    svg.append('circle')
      .attr('cx', 95)
      .attr('cy', 350)
      .attr('r', 15)
      .attr('fill', 'transparent')
      .attr('stroke', 'black');
    svg.append('circle')
      .attr('cx', 95)
      .attr('cy', 320)
      .attr('r', 10)
      .attr('fill', 'transparent')
      .attr('stroke', 'black');
    svg.append('circle')
      .attr('cx', 95)
      .attr('cy', 300)
      .attr('r', 5)
      .attr('fill', 'transparent')
      .attr('stroke', 'black');
    svg.append('text')
      .attr('x', 95)
      .attr('y', 392)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('font-size', '8')
      .text('20');
    svg.append('text')
      .attr('x', 95)
      .attr('y', 352)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('font-size', '8')
      .text('15');
    svg.append('text')
      .attr('x', 95)
      .attr('y', 322)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('font-size', '8')
      .text('10');
    svg.append('text')
      .attr('x', 95)
      .attr('y', 302)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('font-size', '8')
      .text('5');
    svg.append('rect')
      .attr('x', 20)
      .attr('y', 265)
      .attr('width', 170)
      .attr('height', 155)
      .attr('fill', 'transparent')
      .attr('stroke', 'black');

    d3.json('world.json').then(function(world) {
      const country = svg.append('g')
        .attr('class', 'boundary')
        .selectAll('boundary')
        .data(topojson.feature(world, world['objects'].countries).features)
        .enter();
      country.append('path')
        .attr('d', path)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', '0.5px');
      country.append('circle')
        .attr('r', function(d) {
          if (d['id'] !== '-99') {
            return d['properties'].GDP;
          } else {
            return 0;
          }
        })
        .attr('cx', function(d) {
          if (d['properties'].name === 'USA') {
            return path.centroid(<any>d)[0] + 13;
          }
          return path.centroid(<any>d)[0];
      })
        .attr('cy', function(d) {
          if (d['properties'].name === 'USA') {
            return path.centroid(<any>d)[1] + 13;
          }
          return path.centroid(<any>d)[1];
        })
        .attr('fill-opacity', '0.3')
        .attr('stroke', 'black');
      country.append('text')
        .attr('text-anchor', 'middle')
        .attr('font-weight', 'bold')
        .attr('x', function(d) {
          if (d['properties'].name === 'USA') {
            return path.centroid(<any>d)[0] + 13;
          }
          return path.centroid(<any>d)[0];
        })
        .attr('y', function(d) {
          if (d['properties'].name === 'USA') {
            return path.centroid(<any>d)[1] + d['properties'].GDP + 23;
          }
          return path.centroid(<any>d)[1] + d['properties'].GDP + 10;
        })
        .attr('font-size', '13')
        .text(function(d) {
          if (d['properties'].GDP !== 0) {
            return d['properties'].name;
          } else {
            return '';
          }
        });
    });
  }
}
