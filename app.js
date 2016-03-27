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
    console.log(nodes)
    console.log(links)
})
