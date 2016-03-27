function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);

        }
    }
    xobj.send(null);
}

loadJSON(function(response) {
    var data = JSON.parse(response);
    var nodes = data.nodes;
    var links = data.links;
    var width = 1280;
    var height = 720;
    var svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height);
    var force = d3.layout.force()
        .size([width, height])
        .nodes(nodes)
        .links(links)
        .linkDistance(50);
    var link = svg.selectAll('.link')
        .data(links)
        .enter().append('line')
        .attr('class', 'link');
    var node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node');
    force.on('end', function() {
        node.attr('r', 10)
            .attr('cx', function(d) { return d.x; })
            .attr('cy', function(d) { return d.y; });
        link.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });
    force.start();
    });
})
