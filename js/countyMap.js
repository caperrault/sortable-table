d3.json("caFields9.json", function(err, ca) {

  var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

  var radio = d3.select(".ca")
              .append("input")
              .attr("type","Radio")

  var svg = d3.select(".ca");

  var group = svg.selectAll('g')
          .data(topojson.feature(ca, ca.objects.counties2).features)
          .enter()
          .append('g')

  var colorTOT = d3.scale.linear()
    .domain([30237, 993455, 12867928])
    .range(['rgb(255,245,96)','rgb(215,211,0)','rgb(35,132,67)'])
    .interpolate(d3.interpolateRgb);

  var colorACR = d3.scale.linear()
    .domain([0.01, 0.3228, 0.95])
    .range(['rgb(255,245,96)','rgb(205,211,0)','rgb(35,132,67)'])
    .interpolate(d3.interpolateRgb);

  var colorPOP = d3.scale.linear()
    .domain([0.01, 2.08, 368])
    .range(['rgb(255,245,96)','rgb(205,211,0)','rgb(35,132,67)'])
    .interpolate(d3.interpolateRgb);

  var projection = d3.geo.albers()
      .translate([480, 250])
      .scale(2700)
      .rotate([122.4183, 0])
      .center([0, 37.7750]);

  var path = d3.geo.path().projection(projection);

  var LegendW = 30;
      LegendH = 80;

  var svg = d3.select("body").append("svg:svg")
      .attr("width", LegendW)
      .attr("height", LegendH)
      .style("display", "none");

  var gradient = svg.append("svg:defs")
    .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

  gradient.append("svg:stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgb(35,132,67)")
      .attr("stop-opacity", 1);

  gradient.append("svg:stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgb(255,245,96)")
      .attr("stop-opacity", 1);

  svg.append("svg:rect")
      .attr("width", LegendW)
      .attr("height", LegendH)
      .style("fill", "url(#gradient)");

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x","50%")
      .attr("y","15%")
      .attr("dy",0)
      .text("+");

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x","50%")
      .attr("y","90%")
      .attr("dy",0)
      .text("-");

  d3.selectAll(".radio").on("change", function(){

  if (document.getElementById("ac_tot").checked) {
          counties.transition().duration(250)
               .style("fill", function (d) {return colorTOT(d.properties.ac_tot);});
          svg.transition().duration(300).style("display", null);
               }

  else if (document.getElementById("ACR_NORM_1").checked) {
          counties.transition().duration(250)
               .style("fill", function (d) {return colorACR(d.properties.ACR_NORM_1);});
          svg.transition().duration(300).style("display", null);
               }

  else if (document.getElementById("POP_NORM").checked) {
          counties.transition().duration(250)
               .style("fill", function (d) {return colorPOP(d.properties.POP_NORM);});
          svg.transition().duration(300).style("display", null);
               }
             });

  var counties = group.append('path')
            .attr('d',path)
            .attr("class", function(d) { return "counties2 " + d.id; })
            .classed("geo", true)
            .attr("d", path)
            .style("fill", "LightGray ")
            .on("mouseover", function(d) {
            div.transition().duration(300).style("opacity", 1);
            div.text(d.properties.name+" County")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY -30) + "px");})
            .on("mouseout", function (d) { div.transition().duration(300).style("opacity", 0);})
            .on("click", function(d) {
            d3.select(".selected").classed("selected", false);
            d3.select(this).classed("selected", true).transition().duration(300);
            updatePie1(d.properties.name);
            updatePie2(d.properties.name);
            updateCountyName(d.properties.name);
        });

});
