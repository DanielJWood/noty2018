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
      xAccessor: d => d.date,
      yAccessor: d => null,
      y2Accessor: d => null,
      labelAccessor: null,
      yTicks: 3,
      xTicks: 3,
      // xTickFormat: null,
      // yTickFormat: null,
      // yTickSteps: null,
      // xTickFormat: d => `Q1 ${d3.timeFormat('%y')(d)}`,
      // yTickFormat: (d, i, o) => {
      //   if (i === o.length - 1) {
      //     return d3.format('.0f')(d);
      //   }
      //   return d;
      // },
      // yTickSteps: d3.range(20, 50, 10),      
      colorScaleRange: ["#ff00ff","#00ff80","#ff0e00"]
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
          top: 25,
          right: 30,
          left: 70,
          bottom: 80,
        };
        const innerWidth = width - margins.right - margins.left;
        const innerHeight = height - margins.top - margins.bottom;
        const parseYear = d3.timeParse('%Y');
        // const parseTime = d3.timeParse("%m/%d/%y %H:%M");
        // const bisectDate = d3.bisector(function(d) { return d.date; }).left;

        // Normalize data
        // array of array because you might have more than one series (multiple line chart)
        const childData = data.map(d => ({
          x: props.xAccessor(d),
          y: props.yAccessor(d),
          y2: props.y2Accessor(d),
        }));

        var childData1 = []
        var childData2 = []
        for (var i = 0; i < childData.length; i++) {          
          if (childData[i].y2 != -10) {            
            var lilFella1 = {x: childData[i].x, y: childData[i].y, label: "first"}              
            var lilFella2 = {x: childData[i].x, y: childData[i].y2, label: "second"}              
            childData1.push(lilFella1)
            childData2.push(lilFella2)
          }
        }

        const normData = [childData1,childData2];        

        // Calculate the extent (min/max) of our data
        // for both our x and y axes;
        const xExtent = d3.extent(
          _.flatten(normData.map(arr => d3.extent(arr, d => parseTime(d.x)))),
          d => d,
        );

        const yExtent = d3.extent(
          _.flatten(normData.map(arr => d3.extent(arr, d => d.y))),
          d => d,
        );      

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

        // If an extent is not provided as a prop, default to the min/max of our data
        const xScale = d3.scaleTime()
          .domain(xExtent)
          .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
          .domain(yExtent)
          .range([innerHeight, 0])
          .nice();

        const colorScale = d3.scaleOrdinal()
          .domain(_.flatten(normData.map(arr => arr.map(d => d.label))))
          .range(props.colorScaleRange);          

        // Axes
        const xAxis = d3.axisBottom(xScale)
          .tickFormat(props.xTickFormat)
          .ticks(props.xTicks)
          .tickPadding(0);

        const yAxis = d3.axisLeft(yScale)
          .tickFormat(props.yTickFormat)
          .tickSize(-innerWidth - margins.left)
          // .tickValues(props.yTickSteps)
          .ticks(props.yTicks)
          .tickPadding(10);         

        const line = d3.line()
          .x(d => xScale(parseTime(d.x)))
          .y(d => yScale(d.y));


        // Now, let's create our svg element using appendSelect!
        // appendSelect will either append an element that doesn't exist yet
        // or select one that already does. This is useful for making this
        // function idempotent. Use it this way:
        //
        // selection.appendSelect(<element selector>, <class string>)
        //
        // You can also chain calls like below:

        // console.log(selection)
        // console.log(props.yName())

        const title = d3.select(this)
          .appendSelect('div')
          .attr("class","title")
          .html(function(){
              return "<span class='pink'>#" + props.rank()[0] + " " + props.yName() + "</span><br>vs.<br>" + "<span class='green'>#" + props.rank()[1] + " " + props.y2Name() + "</span>"
            })

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
          .attr('transform', `translate(0,${innerHeight})`)
          // .call(xAxis);

        // Add our lines data
        const lines = g.selectAll('path.line')
          .data(normData);

        lines.enter()
          .append('path')
          .attr('class', 'line')
          .merge(lines)
          .attr('d', line)
          .style('stroke', (arr, i) => colorScale((arr[i].label)));


        g.appendSelect('text','margin')
          .attr('transform', `translate(${innerWidth-75},${innerHeight-10})`)
          .text(function(d,i){
            return "Margin: " + (Math.abs(+d[d.length-1][props.yName()].replace(/,/g, "")-+d[d.length-1][props.y2Name()].replace(/,/g, "")))
          })
          .attr("fill",function(d){
            if (+d[d.length-1][props.yName()].replace(/,/g, "")-+d[d.length-1][props.y2Name()].replace(/,/g, "") > 0) {
              return colorScale("first")
            } else {
              return colorScale("second")
            }
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
