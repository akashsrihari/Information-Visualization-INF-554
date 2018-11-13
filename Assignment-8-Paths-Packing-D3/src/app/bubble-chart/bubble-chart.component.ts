import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

export interface DataType {
  Country: string;
  GDP2016: number;
}

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const svg = d3.select('#bubblechart'),
      width = parseInt(svg.style('width'), 10),
      height = parseInt(svg.style('height'), 10);

    const pack = data => d3.pack()
      .size([width - 2, height - 2])
      .padding(3)
      (d3.hierarchy({children: data})
        .sum(d => parseFloat(d['GDP2016'])));

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

    d3.json('bubble_chart_data.json').then(function(data: Array<DataType>) {

      console.log(pack(data));

      const root = pack(data);
      const values = data.map(x => x.GDP2016);
      const color = d3.scaleLinear<string>().domain([d3.min(values), d3.max(values)])
        .range(['rgb(30,200,200)', 'rgb(30,100,100)']);

      const leaf = svg.selectAll('g')
        .data(root.leaves())
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`);

      leaf.append('circle')
        .attr('r', d => d.r)
        .attr('fill-opacity', 0.7)
        .attr('fill', d => color(parseFloat(d.data['GDP2016'])))
        .on('mouseover', function(d) {
          tooltip.text('GDP in 2016 - ' + d.data['GDP2016'] + ' trillion USD');
          tooltip.style('visibility', 'visible');
        })
        .on('mousemove', function() {
          return tooltip.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
        })
        .on('mouseout', function() {return tooltip.style('visibility', 'hidden'); });

      leaf.append('text')
        .attr('x', 0 )
        .attr('y', 5)
        .attr('text-anchor', 'middle')
        .attr('font-size', 16)
        .text(d => d.data['Country'])
        .attr('fill', 'white')
        .on('mouseover', function(d) {
          tooltip.text('GDP in 2016 - ' + d.data['GDP2016']  + ' trillion USD');
          tooltip.style('visibility', 'visible');
        })
        .on('mousemove', function() {
          return tooltip.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px');
        })
        .on('mouseout', function() {return tooltip.style('visibility', 'hidden'); });
    });

  }
}
