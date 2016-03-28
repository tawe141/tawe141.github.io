$(document).ready(function() {
    $.getJSON('data.json', function(json) {
        console.log(json);
        var data = json;
        visualize(data);
    });

    function visualize(data) {
        var width = 960;
        var height = 500;

        var color = d3.scale.cubehelix();

        var links = data.edges;
        var nodes = data.nodes;

        var force = d3.layout.force()
            .size([width, height]);

        var svg = d3.select('#app').append('svg')
            .attr('width', width)
            .attr('height', height);

        force.links(links)
            .nodes(nodes)
            .linkStrength(5)
            .start();

        // svg.append("defs").selectAll("marker")
        //     .data(["suit", "licensing", "resolved"])
        //     .enter().append("marker")
        //     .attr("id", function(d) {
        //         return d;
        //     })
        //     .attr("viewBox", "0 -5 10 10")
        //     .attr("refX", 25)
        //     .attr("refY", 0)
        //     .attr("markerWidth", 6)
        //     .attr("markerHeight", 6)
        //     .attr("orient", "auto")
        //     .append("path")
        //     .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
        //     .style("stroke", "#4679BD")
        //     .style("opacity", "0.6");

        var link = svg.selectAll('.line')
            .data(links)
            .enter()
            .append('line')
            .attr('class', 'link');
            // .style("marker-end", "url(#suit)");

        var node = svg.append('g')
            .attr('class', 'node')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', 5)
            .call(force.drag);

        function compare(a, b) {
            if (a.source.index < b.source.index) {
                return -1;
            }
            else if (a.source.index > b.source.index) {
                return 1;
            }
            else {
                return 0;
            }
        }

        var sorted_links = links;
        sorted_links.sort(compare);

        console.log(sorted_links);

        node.on('mouseover', function(d) {
            d3.select(this)
                .attr('r', 10);
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
            .text(function(d) {
                return d.name
            });

        var text_offset = {
            x: 10,
            y: 4
        }

        force.on('tick', function() {
            node.attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y;
                });
            link.attr('x1', function(d) {
                    return d.source.x;
                })
                .attr('y1', function(d) {
                    return d.source.y;
                })
                .attr('x2', function(d) {
                    return d.target.x;
                })
                .attr('y2', function(d) {
                    return d.target.y;
                });
            text.attr('dx', function(d) {
                    return d.x + text_offset.x;
                })
                .attr('dy', function(d) {
                    return d.y + text_offset.y;
                })
        });
    };
})
