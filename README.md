# NICAR 2018 Reusable charts session

## Using the repo

### Development

To start developing with this repository, run the following:

```
$ npm install
$ npm start
```

Then, visit localhost:3000 in your browser. You should see the page load.

### Building

To build the project into production-ready Javascript, run `npm run build`

NOTES:
As long as there is a package.json, it’s a publishable package
Public facing repo
Aim for a finished code example and copy and paste from there

How do you demonstrate reusability?
- Pass in props
- Different data sets: two data sets (time axes vs. ordinal axes)
- Call update function
- Small multiples

Lecture Notes:
## A basic d3 line chart we've all built ... too many times to count.

## Introducing our friend `appendSelect`
Let's walk through some of the files in our project.

First things first, you'll notice even though d3 is installed in our project (see `node_modules` folder and `package.json`) we still have a `d3.js` file in the root of our js folder. And that's because we use a version of d3 in our chart modules where we've created custom methods we can call to make our lives easier. Our d3 methods `moveToFront` and `moveToBack` are useful for tooltip events, but today we're going to focus on our bread and butter method `appendSelect`.

What this method does is checks to see if an element already exists. If the element doesn't exist, the element is appended (with a class). But if the element already exists, it will not be appended again — instead the first existing element that matches the given selector will be returned.

It takes two parameters. A selector (i.e. `svg`, `g`, `circle`, etc.) and the selector's class.

Which means we get to write this when we create new chart elements:
`const svg = d3.select('#chart').appendSelect('svg', 'chart');`

Instead of this ...
`const svg = d3.select('#chart').select('svg.chart').size() === 0 ?
  d3.select('#chart').append('svg').attr('class', 'chart') :
  d3.select('#chart').select('svg.chart');`

`appendSelect` is an important method to make our chart reusable as it allows us to do 3 key things:
1. We can update our chart with different slices of data without re-rendering our chart.
2. We can call separate instances of our chart on the same page using different data.
3. It ensures our chart module is responsive.

## The basic structure of our chart module
Now that we've covered the key concept behind our appendSelect method, let's go over the basic structure your chart module should have out of the box. First of all, our chart is wrapped in an `export default()` function so we can easily import it into other projects.

Second, our chart has 5 methods by which you can access it/call it.
1. `render()`
2. `draw()`
3. `create()`
4. `update()`
5. `resize()`

But of these 5 methods, it's really two functions doing all the work – `render()` and `draw()`.

Our `render()` function is where the chart logic lives. It's where we pass our chart data, append svg elements and perform fancy animations.

And it's in our `draw()` function where we call our `render()` function logic and actually draw our chart. You can see that in `draw()`, we use d3 to select our chart's html selector, where we then pass our chart data and call our actual chart function to draw the chart.

So then, if we take a look a our last three chart methods: `create()`, `update()` and `resize()`, you'll notice they all have one method in common. `this.draw()`.

At this stage, it might seem as if these three methods are redundant — and you'd be right, but as you'll soon see, it's helpful to breakout these methods, so we can easily pass our chart new data through our `update()` function.

## Let's start building our chart
Ok, so let's get to coding. All of our chart code excluding props we set (and more on that in a minute) is going to live in our chart function inside our render function.

There you can see we've already set up your svg element. Let's start our webserver and inspect the page.

## The power of props

## Let's call our chart!
Main app ... + index
So far, we've just looked at our `starter-chart.js`. But let's pop over to our index file where we actually call our chart.

There you'll see a div with an id of chart.

```
<div id="chart"></div>
<script src="./js/app.js"></script>
<script>
// Global which will contain an instance of our chart
// lineChart is defined in app.js
var myChart = new lineChart();
// This is the initial draw, which needs a selection string and data.
// You can also pass a props object.
myChart.create("#chart", null, {
  stroke: '#333',
  fill: '#000'
});
</script>
```

Use
