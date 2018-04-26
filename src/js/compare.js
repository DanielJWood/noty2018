// Import lodash + our custom d3 module
import _ from 'lodash';
import d3 from './d3';

// Here we create our own chart module that can be exported
// and imported in other projects, just like we did with our custom d3 script above.
export default () => ({

  // Here's where the bulk of our chart code lives.
  // In our render function, we pass in customizable properties specific to our chart.
  // We also create an inner chart function where we pass in a HTML element and data for our chart.
  render() {
    // This is our props object.
    // We set default chart properties in this object that users can overwrite
    // with a props object when they call their chart (We will do this in app.js).
    const parseTime = d3.timeParse("%m/%d/%y %H:%M")

// d3.timeHour.offset(d,-4);
    let props = {
      // xAccessor: d => d.date,
      // yAccessor: d => null,
      // y2Accessor: d => null,
      // labelAccessor: null,
      yTicks: 3,
      xTicks: 3,
      // xTickFormat: null,
      // yTickFormat: null,
      // yTickSteps: null,
      xTickFormat: d => +d,
      // yTickFormat: (d, i, o) => {
      //   if (i === o.length - 1) {
      //     return d3.format('.0f')(d);
      //   }
      //   return d;
      // },
      // yTickSteps: d3.range(20, 50, 10),      
      colorScaleRange: ["#00ff80","#ff00ff","#ff0e00","#00eeff","purple","blue"]
    };

    function chart(selection) {
      selection.each(function (data) { // eslint-disable-line func-names
        // This is the inner chart function where we actually draw our chart.
        // Here we'll set up our chart width and height
        // And pass our chart data.

        // "this" refers to the selection
        // bbox is a convenient way to return your element's width and height        

        const bbox = this.getBoundingClientRect();
        const { width } = bbox;
        const { height } = bbox;
        const margins = {
          top: 100,
          right: 70,
          left: 100,
          bottom: 80,
        };
        const innerWidth = width - margins.right - margins.left;
        const innerHeight = height - margins.top - margins.bottom;
        // const parseYear = d3.timeParse('%Y');
        // const parseTime = d3.timeParse("%m/%d/%y %H:%M");
        // const bisectDate = d3.bisector(function(d) { return d.date; }).left;

        // Normalize data
        // array of array because you might have more than one series (multiple line chart)
        // console.log(data)
        const normData = []

        for (var i = 0; i < data.length; i++) {
          var rounder;
          if (data[i].round <= 3) {
            rounder = 1;
          }
          else if (data[i].round <= 5) {
            rounder = 2;
          } else if (data[i].round == 6) {
            rounder = 3
          } else if (data[i].round == 7) {
            rounder = 4
          } else if (data[i].round == 8) {
            rounder = 5
          } else if (data[i].round == 9) {
            rounder = 6
          }

          // if (data[i].vote1 > data[i].vote2) {
            normData.push({
              y: (Math.abs(data[i].vote1-data[i].vote2)),
              x: data[i].vote1+data[i].vote2,
              xName: (data[i].vote1 > data[i].vote2) ? data[i].name1 : data[i].name2, 
              yName: (data[i].vote1 > data[i].vote2) ? data[i].name2: data[i].name1, 
              xRank: (data[i].vote1 > data[i].vote2) ? data[i].rank1 : data[i].rank2,
              yRank: (data[i].vote1 > data[i].vote2) ? data[i].rank2: data[i].rank1,
              round: rounder              
            })
          // } else {
          //   normData.push({
          //     y: data[i].vote2,
          //     x: data[i].vote1,
          //     yName: data[i].name2,
          //     xName: data[i].name1,
          //     yRank: data[i].rank2,
          //     xRank: data[i].rank1,
          //     round: rounder              
          //   })
          // }
        }

        // console.log(normData)

        // const normData = [childData1,childData2];        

        // Calculate the extent (min/max) of our data
        // for both our x and y axes;
        const xExtent = d3.extent(normData, d => d.x);      

        const yExtent = d3.extent(normData, d => d.y);      

        // xExtent[0] = 0;
        // xExtent[1] = 6000
        yExtent[0] = yExtent[1];
        yExtent[1] = 0;
        // const yExtent = d3.extent(
        //   _.flatten(normData.map(arr => d3.extent(arr, d => (d.y-d.y2)))),
        //   d => d,
        // );      

        // var yExtent2 = []

        // if (Math.abs(yExtent[1]) > Math.abs(yExtent[0])) {
        //   yExtent2 = [-yExtent[1],yExtent[1]]
        // } else {
        //   yExtent2 = [yExtent[0],(yExtent[0]*-1)]
        // }

        var roundIndex = ["First Round","Second Round","Sweet Sixteen","Elite Eight","Final Four","Championship"]

        // If an extent is not provided as a prop, default to the min/max of our data
        const xScale = d3.scaleTime()
          .domain(xExtent)
          .range([0, innerWidth])
          .nice();

        const yScale = d3.scaleLinear()
          .domain(yExtent)
          .range([innerHeight, 0])
          .nice();

        const colorScale = d3.scaleOrdinal()
          .domain(normData.map(d => d.round))
          .range(props.colorScaleRange);          

        // Axes
        const xAxis = d3.axisTop(xScale)
          .tickFormat(props.xTickFormat)
          .ticks(10)
          .tickPadding(0);

        const yAxis = d3.axisLeft(yScale)
          .tickFormat(props.yTickFormat)
          .tickSize(-innerWidth)
          .ticks(props.yTicks)
          .tickPadding(10);         

        const g = d3.select(this)
          .appendSelect('svg')
          .attr('width', width)
          .attr('height', height)
          .appendSelect('g', 'chart')
          .attr('transform', `translate(${margins.left}, ${margins.top})`);


        g.appendSelect('g', 'y axis')
          .attr('transform', 'translate(0, 0)')
          .call(yAxis)

        g.appendSelect('g', 'x axis')
          .attr('transform', 'translate(0,0)')
          .call(xAxis);


        g.appendSelect("text","label")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", -80)
            .attr("x",`-${innerHeight/2}`)
            .attr("dy", "0.4em")
            .attr("text-anchor", "middle")
            .text("Vote Margin");

        g.appendSelect("text","label2")
            .attr("fill", "#000")
            // .attr("transform", "")
            .attr("y", -50)
            .attr("x",`${innerWidth/2}`)
            .attr("dy", "0.4em")
            .attr("text-anchor", "middle")
            .text("Total Votes");            

        // Add our dots data

        // g.appendSelect("line", "fart")
        //   .attr("class","fart")
        //   // .merge(line)
        //   .attr("x1",xScale(0))
        //   .attr("y1",yScale(0))
        //   .attr("x2",xScale(6000))
        //   .attr("y2",yScale(6000))
        //   .style("stroke","#ddd")

        const toolTop = g.appendSelect("text","tooltip2")
            .attr("fill", "#000")
            .attr("id","top")
            .attr("class","tooltip2")
            .attr("y", -100)
            .attr("x",-100)
            .attr("text-anchor", "start")
            .text("");  

        const tool = g.appendSelect("text","tooltip")
            .attr("fill", "#000")
            .attr("id","det")
            .attr("class","tooltip")
            .attr("y", -100)
            .attr("x",-100)
            .attr("text-anchor", "start")
            .text("");    

        const dots = g.selectAll('circle.dot')
          .data(normData);

        dots.enter()
          .append('circle')
          .attr('class','dot')
          .merge(dots)
          .attr('cx', d => xScale(d.x))
          .attr('cy', d => yScale(d.y))
          .attr('r',5)
          .style('stroke',d => colorScale(d.round))
          .style('fill','transparent')
          .on("mouseover",function(){
            var text = "#" + d3.select(this).data()[0].xRank + " " + d3.select(this).data()[0].xName + " def. " + "#" + d3.select(this).data()[0].yRank + " "  + d3.select(this).data()[0].yName
            var text2 = roundIndex[d3.select(this).data()[0].round-1] 

            d3.select(this)
              .attr('r',8)

            g.select('text.tooltip')
              .attr("y", -40)
              .attr("x",0)
              .text(text);    

            g.select('text.tooltip2')
              .attr("y", -60)
              .attr("x",0)
              .text(text2);                  

            // console.log(this)
            // console.log(this.cx)
            // console.log(d3.select(this).data())
          })
          .on("mouseout",function(){
            d3.select(this)
              .attr('r',5)
          })
          
      });
    }

    // Right outside of chart function is an important piece of boilerplate code.
    // It's known as a getter-setter.
    // What that means, in our case, is it merges default properties with
    // user provided properties.
    chart.props = (obj) => {
      if (!obj) return props;
      props = Object.assign(props, obj);
      return chart;
    };
    // Here's where we return our chart function
    return chart;
  },

  // Here's where we actually draw our chart using our render function.
  // We also pass in our chart properties here.
  draw() {
    const chart = this.render()
      .props(this._props);

    d3.select(this._selection)
      .datum(this._data)
      .call(chart);
  },

  // We use the create method to initially draw our chart
  // Unlike the update and resize methods, this method expects our actual html selector
  // (which is needed by our chart function to actually draw the chart)
  // We also pass in our data and custom props object here.
  create(selection, data, props) {
    this._selection = selection;
    this._data = data;
    this._props = props || {};

    this.draw();
  },

  // Method that is useful for updating our chart with new data.
  update(data) {
    this._data = data;
    this.draw();
  },

  // Helper method to resize our chart and make it responsive.
  resize() {
    this.draw();
  },
});
