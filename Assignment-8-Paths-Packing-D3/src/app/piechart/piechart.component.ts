import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

export interface DataType {
  Country: string;
  GDP2016: number;
}

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})

export class PiechartComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const svg = d3.select('#piechart'),
      width = parseInt(svg.style('width'), 10),
      height = parseInt(svg.style('height'), 10),
      radius = Math.min(width, height) / 2,
      g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const pie = d3.pie<void, DataType>()
      .sort(null)
      .value(function(d: DataType) { return d.GDP2016; });
    const path = d3.arc<void, d3.PieArcDatum<DataType>>()
      .outerRadius(radius - 20)
      .innerRadius(0);
    const path1 = d3.arc<void, d3.PieArcDatum<DataType>>()
      .outerRadius(radius - 10)
      .innerRadius(0);
    const label = d3.arc<void, d3.PieArcDatum<DataType>>()
      .outerRadius(radius - 100)
      .innerRadius(radius - 40);

    d3.json('pie_chart_data.json').then(function (data: Array<DataType>) {

      console.log(pie(data));

      const values = data.map(x => x.GDP2016);
      const color = d3.scaleLinear<string>().domain([d3.min(values), d3.max(values)])
        .range(['rgb(30,200,200)', 'rgb(30,100,100)']);

      const arc = g.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');
      arc.append('path')
        .attr('class', function (d) {return d.data.Country + 'arc arcs'; } )
        .attr('d', path)
        .attr('fill', function(d) { return color(d.data.GDP2016); })
        .on('mouseover', function (d) {
          d3.select(this)
            .transition()
            .duration(100)
            .attr('d', path1);

          d3.select('#text1')
            .text('Country - ' + d.data.Country);
          d3.select('#text2')
            .text('GDP in 2016 - ' + d.data.GDP2016 + ' trillion USD');
        })
        .on('mouseout', function() {
          d3.select(this)
            .transition()
            .duration(100)
            .attr('d', path);

          d3.select('#text1')
            .text('Hover over pie chart');
          d3.select('#text2')
            .text('for more information');
        });


      arc.append('text')
        .attr('transform', function(d) { return 'translate(' + label.centroid(d) + ')'; })
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .text(function(d) { return d.data.Country; })
        .attr('fill', 'white')
        .on('mouseover', function (d) {
          d3.select('.' + d.data.Country + 'arc')
            .transition()
            .duration(100)
            .attr('d', path1);

          d3.select('#text1')
            .text('Country - ' + d.data.Country);
          d3.select('#text2')
            .text('GDP in 2016 - ' + d.data.GDP2016 + ' trillion USD');
        })
        .on('mouseout', function(d) {
          d3.select('.' + d.data.Country + 'arc')
            .transition()
            .duration(100)
            .attr('d', path);

          d3.select('#text1')
            .text('Hover over pie chart');
          d3.select('#text2')
            .text('for more information');
        });

    });

  }

}
