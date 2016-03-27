var data;

// d3.json("data.json", function(err, json) {
//     if (err) throw err;
//     data = json;
//     visualize();
// });

$.getJSON('data.json', function(json) {
    data = json;
    visualize();
});

function visualize() {
    var width = 1280;
        height = 720;

    var nodes = data.nodes;
    var links = data.edges;

    console.log(nodes);
    console.log(links);

    var force = d3.layout.force()
        .size([width, height]);

    force.nodes(nodes)
        .links(links)
        .start();

    var node = d3.selectAll('circle')
        .data(nodes).enter().append('circle')
        .attr('r', 5);
    var link = d3.selectAll('line')
        .data(links).enter().append('line');

    force.on('tick', function() {
        node.attr('cx', function(d) {return d.x;})
            .attr('cy', function(d) {return d.y;});
        link.attr('x1', function(d) {return d.source.x;})
            .attr('y1', function(d) {return d.source.y;})
            .attr('x2', function(d) {return d.target.x;})
            .attr('y2', function(d) {return d.target.y;});

    });
}
