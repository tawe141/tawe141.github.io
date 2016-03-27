$(document).ready(function() {
    $.getJSON('data.json', function(json) {
        console.log(json);
        var data = json;
        visualize(data);
    });

    function visualize(data) {
        var width = 1280;
        height = 720;

        var links = data.edges;
        var nodes = data.nodes;

        console.log(nodes);
        console.log(links);

        var force = d3.layout.force()
        .size([width, height]);

        var svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);

        force.links(links).nodes(nodes).start();

        var link = svg.selectAll('.line')
            .data(links).enter().append('line')
            .attr('class', 'link');
        var node = svg.selectAll('.node')
            .data(nodes).enter().append('circle')
            .attr('class', 'node')
            .attr('r', 5)
            .call(force.drag);

        force.on('tick', function() {
            node.attr('cx', function(d) {return d.x;})
            .attr('cy', function(d) {return d.y;});
            link.attr('x1', function(d) {return d.source.x;})
            .attr('y1', function(d) {return d.source.y;})
            .attr('x2', function(d) {return d.target.x;})
            .attr('y2', function(d) {return d.target.y;});

        });
    }
})
