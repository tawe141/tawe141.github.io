$(document).ready(function() {
    $.getJSON('data.json', function(json) {
        console.log(json);
        var data = json;
        visualize(data);
    });

    function visualize(data) {
        var width = 960;
        height = 500;

        var links = data.edges;
        var nodes = data.nodes;

        var force = d3.layout.force()
            .size([width, height]);

        var svg = d3.select('#app').append('svg')
            .attr('width', width)
            .attr('height', height);

        force.links(links)
            .nodes(nodes)
            .start();

        var link = svg.selectAll('.line')
            .data(links)
            .enter()
            .append('line')
            .attr('class', 'link');

        var node = svg.append('g')
            .attr('class', 'node')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', 5)
            .call(force.drag);

        node.on('mouseover', function(d) {
            d3.select(this)
                .attr('r', 10);

            d.links.forEach(function(l) {
                l.target.selection.attr('r', 8);
            })
        })

        node.on('mouseout', function(d) {
            d3.select(this)
                .attr('r', 6)
        })

        var text = svg.append('g')
            .attr('class', 'labels')
            .selectAll('text')
            .data(force.nodes())
            .enter()
            .append('text')
            .attr('dx', 30)
            .attr('dy', '.5em')
            .text(function(d) {return d.name});

        var text_offset = {
            x: 10,
            y: 4
        }

        force.on('tick', function() {
            node.attr('cx', function(d) {return d.x;})
                .attr('cy', function(d) {return d.y;});
            link.attr('x1', function(d) {return d.source.x;})
                .attr('y1', function(d) {return d.source.y;})
                .attr('x2', function(d) {return d.target.x;})
                .attr('y2', function(d) {return d.target.y;});
            text.attr('dx', function(d) {return d.x + text_offset.x;})
                .attr('dy', function(d) {return d.y + text_offset.y;})
        });
    }
})
