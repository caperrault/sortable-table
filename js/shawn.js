var fillProperty = "ac_tot"

.attr("class", ...)
.call(updateFill)
...

function updateFill(selection) {
  selection.attr("fill", function(d) {
    return quantize(d.properties[fillProperty]);
  });
}

function setFillProperty(property) {
  fillProperty = property;
  svg.selectAll("counties2").call(updateFill);
}

// <input type="radio" value="ac_tot"

radio.on("click", function() {
  setFillProperty(this.value);
});



// pie charts
d3.csv("blah.csv", function(err, data) {
  container.style("display", "none");
})

function setValue(value) {
  container.style("display", null);
}
})
