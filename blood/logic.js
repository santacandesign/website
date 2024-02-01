  // Create a tooltip element
  const tooltip = d3.select("#waffle-chart").append("div")
  .attr("id", "tooltip")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("opacity", 0)
  .style("background-color", "#452C2B")
  .style("color", "#FAD3BC")
  .style("padding", "10px")
  .style("border", "1px solid #ccc")
  .style("max-width", "250px")
  .style("box-shadow", "4px 4px 0px 0px rgba(51, 51, 51, 0.60)")  // Apply box-shadow
  .style("border", "none")
  .style("font-family", 'Love Ya Like A Sister');

// Function to create the waffle chart
function createWaffleChart(data) {
  const width = 60; // Width of each cell
  const height = 60; // Height of each cell
  const margin = { top: 10, right: 20, bottom: 50, left: 30 }; // Increased left margin
  const rows = 5;
  const columns = 6;

  const totalCells = rows * columns;
  console.log("it works yay")
  // Create a color scale
  const colorScale = d3.scaleOrdinal()
    .domain(["Bleeding", "Cramps and moodswings", "Live, Laugh, Love"])
    .range(["#FD6B62", "#BAB472", "#fefefe"]); // Red for Bleeding, Purple for Cramps and moodswings, None for Nothing

  // Create container for the waffle chart
  const waffleContainer = d3.select("#waffle-chart");

  // Draw cells based on data
  const cells = waffleContainer.selectAll(".waffle-cell")
    .data(data.slice(0, totalCells))
    .enter()
    .append("div")
    .attr("class", "waffle-cell")
    .on("mouseenter", function (event, d) {
    // Show tooltip on mouseover
    tooltip.transition().duration(200).style("opacity", 1);
    const cell = d3.select(this);

    const cellBounds = cell.node().getBoundingClientRect();

    const colorBox = tooltip.append("div")
        .attr("class", "color-box")
        .style("width", "20px")
        .style("height", "20px")
        .style("background-color", colorScale(d.state))
        .style("margin-right", "10px");

    const fillColor = cell.style("background-color");

    tooltip.html(`
        <div class="color-box" style="background-color: ${fillColor}; width: 20px; height: 20px; display: inline-block; margin-left: 8px;"></div>
        <strong style="font-size: 20px; horizontal-align: middle;">${event.state}</strong>
        <br><span style="font-size: 12px;">${event["how am I feeling"]}</span>
    `)
        .style("left", cellBounds.left + window.pageXOffset - 60 + "px")
        .style("top", cellBounds.top + window.pageYOffset + 80 + "px")
        .style("overflow", "visible");

    // Get the color of the hovered square
    const hoverColor = colorScale(d.state);

    // Set opacity for all squares based on the hoverColor
    waffleContainer
        .selectAll(".waffle-cell")
        .style("opacity", function (otherCellData) {
            return otherCellData.color === event.color ? 1 : 0.3;
        });
    })

    .on("mouseout", function () {
      // Hide tooltip on mouseout
      tooltip.transition().duration(500).style("opacity", 0);
      // Reset opacity for all cells on mouseout
      waffleContainer.selectAll(".waffle-cell").style("opacity", 1);
    });

  // Set background color for each cell
  cells.style("background-color", d => {
    // Conditionally set color for "Bleeding"
    if (d.state === "Bleeding") {
      if (d.day === 1 || d.day === 2) {
        return "#FD6B62"; // Red for days 1 and 2
      } else if (d.day === 3 || d.day === 4 || d.day === 5) {
        return "#FF9A94"; // Another color for days 3, 4, and 5
      }
    }
    // Conditionally set color for "Cramps and moodswings"
    if (d.state === "Cramps and moodswings") {
      if (d.day >= 1 && d.day <= 5) {
        return "#BAB472"; // One color for days 1 to 5
      } else if (d.day === 6 || d.day === 7) {
        return "#948753"; // Another color for days 6 and 7
      }
    }
    return colorScale(d.state); // Use the default color for other cases
  });

  // Append text for each day inside the cell
  cells.append("div")
    .attr("class", "cell-text")
    .style("line-height", "60px") // Center the text vertically
    .style("text-align", "center") // Center the text horizontally
    .style("font-family", 'Love Ya Like A Sister')
    .style("font-size", "20px")
    .style("color", "#452C2B")
    .text(d => d["Day of the month"]);

  // Create legend container
  const legendContainer = d3.select("#legend-container");

  const legend = legendContainer.selectAll(".legend-item")
            .data(colorScale.domain())
            .enter()
            .append("div")
            .attr("class", "legend-item");

        legend.each(function (category) {
            const legendItem = d3.select(this);

            // Manually specify colors for each category
            const colors = {
                "Bleeding": ["#FD6B62", "#FF9A94"],
                "Cramps and moodswings": ["#BAB472", "#948753"],
                "Live, Laugh, Love": ["#fefefe"]
            };

            // Add color boxes for each color in the category
            legendItem.selectAll(".legend-color")
                .data(colors[category])
                .enter()
                .append("div")
                .attr("class", "legend-color")
                .style("background-color", d => d);

            legendItem.append("div")
                .attr("class", "legend-text")
                .text(category);
        });
    }


// Fetch data from the JSON file
d3.json("color.json")
  .then(data => {
    // Call the function with the loaded data
    createWaffleChart(data);
  })
  .catch(error => console.error("Error loading data:", error));