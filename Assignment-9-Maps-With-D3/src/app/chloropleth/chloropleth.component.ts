import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-chloropleth',
  templateUrl: './chloropleth.component.html',
  styleUrls: ['./chloropleth.component.css']
})
export class ChloroplethComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const svg = d3.select('#chloropleth');
    const width = parseInt(svg.style('width'), 10);
    const height = parseInt(svg.style('height'), 10);
    const projection = d3.geoEquirectangular().scale(153).translate([width / 2 , height / 2]);
    const path = d3.geoPath().projection(projection);
    const values = ['1 - 3', '4 - 7', '8 - 11', '12 - 15', '16 - 19', '>=20'];
    const data = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
    const color = d3.scaleThreshold<number, string>()
      .domain(data)
      .range(['white', '#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f']);
    svg.selectAll('legendsquare')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 30)
      .attr('y', function(d, i) {
        return (5 - i) * 22 + 250;
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
        return (5 - i) * 22 + 265;
      })
      .text(function(d) {
        return d;
      });
    svg.append('text')
      .attr('x', 30)
      .attr('y', 242)
      .attr('font-weight', 'bold')
      .text('GDP (Trillion USD)');
    svg.append('rect')
      .attr('x', 20)
      .attr('y', 225)
      .attr('width', 165)
      .attr('height', 165)
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
        .attr('fill', function(d) {
          if (d['properties'].GDP && d['properties'].GDP !== 0) {
            return color(d['properties'].GDP / 20);
          }
          return 'white';
        })
        .attr('stroke', 'black')
        .attr('stroke-width', '0.5px');

      country.append('text')
        .attr('text-anchor', 'middle')
        .attr('font-weight', 'bold')
        .attr('x', function(d) {
          return path.centroid(<any>d)[0];
        })
        .attr('y', function(d) {
          return path.centroid(<any>d)[1];
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
