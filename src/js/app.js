import '../scss/app.scss';
import _ from 'lodash';
import d3 from './d3';
import singleLine from '../data/single-line.json';
import multipleLine from '../data/multiple-line.json';
import updateLine from '../data/update.json';
// import fruithandler from '../data/update.json';
// import chart from './file-1';
// import chart from './file-2';
// import chart from './file-3';
// import chart from './file-4';
// import chart from './file-5';
// import chart from './file-6';
import chart from './head2head';

// import chart from './chart';
// const parseYear = d3.timeParse('%Y');
// Declare our singleLine chart module

var bullNames = [
["Salami Blessing","Bernard Bumpus",[1,16]],
["Duckens Nazon","Zeus de la Paz",[2,15]],
["Habakkuk Baldonado","Armagedon Draughn",[3,14]],
["Early Charlemagne","Miracle Crimes",[4,13]],
["Tuna Altuna","Phlandrous Fleming,Jr.",[5,12]],
["Mosthigh Thankgod","Fabulous Flournoy",[6,11]],
["Dr. Dimple Royalty","Jamez Brickhouse",[7,10]],
["Jimbob Ghostkeeper","Travis Couture-Lovelady",[8,9]]
]

var fruitNames = [
  ["Makenlove Petit-Fard", "Dr. Pitt Derryberry",[1,16]],
  ["Babucarr Fatty", "Sparkle Hayter",[2,15]],
  ["Shamoil Shipchandler", "Dr. Megha Panda",[3,14]],
  ["Corky Booze", "Darwin Tabacco",[4,13]],
  ["Dr. Birchann Paffenbarger", "Covadonga del Busto Naval",[5,12]],
  ["Blossom Albuquerque", "Obra Kernodle IV",[6,11]],
  ["SirZion Dance", "Devoid Couch",[7,10]],
  ["Rev. Dongo Pewee", "Jempy Drucker",[8,9]]
]

var dragonNames = [
  ["La Royce Lobster-Gaines","Christine Plentyhoops",[1,16]],
  ["Darthvader Williamson","Delicious Peters",[2,15]],
  ["Lola Honeybone","Chosen Roach",[3,14]],
  ["Chardonnay Beaver","Maverik Buffo",[4,13]],
  ["Crystal Patriarche","Forbes Thor Kiddoo",[5,12]],
  ["Quindarious Gooch","Mike Diaper",[6,11]],
  ["Candida Seasock","Adele Gorrilla",[7,10]],
  ["Ceejhay French-Love","YoHeinz Tyler",[8,9]]
];

d3.queue()
    .defer(d3.csv, "https://s3-us-west-2.amazonaws.com/energy2/social/fruithandler_regional.csv")    
    .defer(d3.csv, "https://s3-us-west-2.amazonaws.com/energy2/social/bulltron_regional.csv")    
    .defer(d3.csv, "https://s3-us-west-2.amazonaws.com/energy2/social/dragonwagon_regional.csv")    
    .await(ready);

function ready(error, fruithandler, bulltron, dragonwagon) {


  // Declare our charts
  const myFruit0 = new chart();
  const myFruit1 = new chart();
  const myFruit2 = new chart();
  const myFruit3 = new chart();
  const myFruit4 = new chart();
  const myFruit5 = new chart();
  const myFruit6 = new chart();
  const myFruit7 = new chart();

  const myBull0 = new chart();
  const myBull1 = new chart();
  const myBull2 = new chart();
  const myBull3 = new chart();
  const myBull4 = new chart();
  const myBull5 = new chart();
  const myBull6 = new chart();
  const myBull7 = new chart();

  const myDragon0 = new chart();
  const myDragon1 = new chart();
  const myDragon2 = new chart();
  const myDragon3 = new chart();
  const myDragon4 = new chart();
  const myDragon5 = new chart();
  const myDragon6 = new chart();
  const myDragon7 = new chart();


  // const myFruit8 = new chart();

  // This is the initial draw, using our create method.
  // It needs a selection string (html element), data and our custom props object.
  myFruit0.create('#fruit0', fruithandler, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => fruitNames[0][0],
    y2Name: d => fruitNames[0][1],
    rank: d => fruitNames[0][2],
    yAccessor: d => (d[fruitNames[0][0]] == undefined) ? -10 : +d[fruitNames[0][0]].replace(/,/g, ""),
    y2Accessor: d => (d[fruitNames[0][1]] == undefined) ? -10 : +d[fruitNames[0][1]].replace(/,/g, "")
  });

  myFruit1.create('#fruit1', fruithandler, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => fruitNames[1][0],
    y2Name: d => fruitNames[1][1],
    rank: d => fruitNames[1][2],
    yAccessor: d => (d[fruitNames[1][0]] == undefined) ? -10 : +d[fruitNames[1][0]].replace(/,/g, ""),
    y2Accessor: d => (d[fruitNames[1][1]] == undefined) ? -10 : +d[fruitNames[1][1]].replace(/,/g, "")
  });

  myFruit2.create('#fruit2', fruithandler, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => fruitNames[2][0],
    y2Name: d => fruitNames[2][1],
    rank: d => fruitNames[2][2],
    yAccessor: d => (d[fruitNames[2][0]] == undefined) ? -10 : +d[fruitNames[2][0]].replace(/,/g, ""),
    y2Accessor: d => (d[fruitNames[2][1]] == undefined) ? -10 : +d[fruitNames[2][1]].replace(/,/g, "")
  });

  myFruit3.create('#fruit3', fruithandler, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => fruitNames[3][0],
    y2Name: d => fruitNames[3][1],
    rank: d => fruitNames[3][2],
    yAccessor: d => (d[fruitNames[3][0]] == undefined) ? -10 : +d[fruitNames[3][0]].replace(/,/g, ""),
    y2Accessor: d => (d[fruitNames[3][1]] == undefined) ? -10 : +d[fruitNames[3][1]].replace(/,/g, "")
  });

  myFruit4.create('#fruit4', fruithandler, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => fruitNames[4][0],
    y2Name: d => fruitNames[4][1],
    rank: d => fruitNames[4][2],
    yAccessor: d => (d[fruitNames[4][0]] == undefined) ? -10 : +d[fruitNames[4][0]].replace(/,/g, ""),
    y2Accessor: d => (d[fruitNames[4][1]] == undefined) ? -10 : +d[fruitNames[4][1]].replace(/,/g, "")
  });

  myFruit5.create('#fruit5', fruithandler, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => fruitNames[5][0],
    y2Name: d => fruitNames[5][1],
    rank: d => fruitNames[5][2],
    yAccessor: d => (d[fruitNames[5][0]] == undefined) ? -10 : +d[fruitNames[5][0]].replace(/,/g, ""),
    y2Accessor: d => (d[fruitNames[5][1]] == undefined) ? -10 : +d[fruitNames[5][1]].replace(/,/g, "")
  });

  myFruit6.create('#fruit6', fruithandler, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => fruitNames[6][0],
    y2Name: d => fruitNames[6][1],
    rank: d => fruitNames[6][2],
    yAccessor: d => (d[fruitNames[6][0]] == undefined) ? -10 : +d[fruitNames[6][0]].replace(/,/g, ""),
    y2Accessor: d => (d[fruitNames[6][1]] == undefined) ? -10 : +d[fruitNames[6][1]].replace(/,/g, "")
  });

  myFruit7.create('#fruit7', fruithandler, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => fruitNames[7][0],
    y2Name: d => fruitNames[7][1],
    rank: d => fruitNames[7][2],
    yAccessor: d => (d[fruitNames[7][0]] == undefined) ? -10 : +d[fruitNames[7][0]].replace(/,/g, ""),
    y2Accessor: d => (d[fruitNames[7][1]] == undefined) ? -10 : +d[fruitNames[7][1]].replace(/,/g, "")
  });

  myBull0.create('#bull0', bulltron, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => bullNames[0][0],
    y2Name: d => bullNames[0][1],
    rank: d => bullNames[0][2],
    yAccessor: d => (d[bullNames[0][0]] == undefined) ? -10 : +d[bullNames[0][0]].replace(/,/g, ""),
    y2Accessor: d => (d[bullNames[0][1]] == undefined) ? -10 : +d[bullNames[0][1]].replace(/,/g, "")
  });

  myBull1.create('#bull1', bulltron, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => bullNames[1][0],
    y2Name: d => bullNames[1][1],
    rank: d => bullNames[1][2],
    yAccessor: d => (d[bullNames[1][0]] == undefined) ? -10 : +d[bullNames[1][0]].replace(/,/g, ""),
    y2Accessor: d => (d[bullNames[1][1]] == undefined) ? -10 : +d[bullNames[1][1]].replace(/,/g, "")
  });

  myBull2.create('#bull2', bulltron, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => bullNames[2][0],
    y2Name: d => bullNames[2][1],
    rank: d => bullNames[2][2],
    yAccessor: d => (d[bullNames[2][0]] == undefined) ? -10 : +d[bullNames[2][0]].replace(/,/g, ""),
    y2Accessor: d => (d[bullNames[2][1]] == undefined) ? -10 : +d[bullNames[2][1]].replace(/,/g, "")
  });

  myBull3.create('#bull3', bulltron, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => bullNames[3][0],
    y2Name: d => bullNames[3][1],
    rank: d => bullNames[3][2],
    yAccessor: d => (d[bullNames[3][0]] == undefined) ? -10 : +d[bullNames[3][0]].replace(/,/g, ""),
    y2Accessor: d => (d[bullNames[3][1]] == undefined) ? -10 : +d[bullNames[3][1]].replace(/,/g, "")
  });

  myBull4.create('#bull4', bulltron, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => bullNames[4][0],
    y2Name: d => bullNames[4][1],
    rank: d => bullNames[4][2],
    yAccessor: d => (d[bullNames[4][0]] == undefined) ? -10 : +d[bullNames[4][0]].replace(/,/g, ""),
    y2Accessor: d => (d[bullNames[4][1]] == undefined) ? -10 : +d[bullNames[4][1]].replace(/,/g, "")
  });

  myBull5.create('#bull5', bulltron, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => bullNames[5][0],
    y2Name: d => bullNames[5][1],
    rank: d => bullNames[5][2],
    yAccessor: d => (d[bullNames[5][0]] == undefined) ? -10 : +d[bullNames[5][0]].replace(/,/g, ""),
    y2Accessor: d => (d[bullNames[5][1]] == undefined) ? -10 : +d[bullNames[5][1]].replace(/,/g, "")
  });

  myBull6.create('#bull6', bulltron, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => bullNames[6][0],
    y2Name: d => bullNames[6][1],
    rank: d => bullNames[6][2],
    yAccessor: d => (d[bullNames[6][0]] == undefined) ? -10 : +d[bullNames[6][0]].replace(/,/g, ""),
    y2Accessor: d => (d[bullNames[6][1]] == undefined) ? -10 : +d[bullNames[6][1]].replace(/,/g, "")
  });

  myBull7.create('#bull7', bulltron, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => bullNames[7][0],
    y2Name: d => bullNames[7][1],
    rank: d => bullNames[7][2],
    yAccessor: d => (d[bullNames[7][0]] == undefined) ? -10 : +d[bullNames[7][0]].replace(/,/g, ""),
    y2Accessor: d => (d[bullNames[7][1]] == undefined) ? -10 : +d[bullNames[7][1]].replace(/,/g, "")
  });

  myDragon0.create('#dragon0', dragonwagon, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => dragonNames[0][0],
    y2Name: d => dragonNames[0][1],
    rank: d => dragonNames[0][2],
    yAccessor: d => (d[dragonNames[0][0]] == undefined) ? -10 : +d[dragonNames[0][0]].replace(/,/g, ""),
    y2Accessor: d => (d[dragonNames[0][1]] == undefined) ? -10 : +d[dragonNames[0][1]].replace(/,/g, "")
  });

  myDragon1.create('#dragon1', dragonwagon, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => dragonNames[1][0],
    y2Name: d => dragonNames[1][1],
    rank: d => dragonNames[1][2],
    yAccessor: d => (d[dragonNames[1][0]] == undefined) ? -10 : +d[dragonNames[1][0]].replace(/,/g, ""),
    y2Accessor: d => (d[dragonNames[1][1]] == undefined) ? -10 : +d[dragonNames[1][1]].replace(/,/g, "")
  });

  myDragon2.create('#dragon2', dragonwagon, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => dragonNames[2][0],
    y2Name: d => dragonNames[2][1],
    rank: d => dragonNames[2][2],
    yAccessor: d => (d[dragonNames[2][0]] == undefined) ? -10 : +d[dragonNames[2][0]].replace(/,/g, ""),
    y2Accessor: d => (d[dragonNames[2][1]] == undefined) ? -10 : +d[dragonNames[2][1]].replace(/,/g, "")
  });

  myDragon3.create('#dragon3', dragonwagon, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => dragonNames[3][0],
    y2Name: d => dragonNames[3][1],
    rank: d => dragonNames[3][2],
    yAccessor: d => (d[dragonNames[3][0]] == undefined) ? -10 : +d[dragonNames[3][0]].replace(/,/g, ""),
    y2Accessor: d => (d[dragonNames[3][1]] == undefined) ? -10 : +d[dragonNames[3][1]].replace(/,/g, "")
  });

  myDragon4.create('#dragon4', dragonwagon, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => dragonNames[4][0],
    y2Name: d => dragonNames[4][1],
    rank: d => dragonNames[4][2],
    yAccessor: d => (d[dragonNames[4][0]] == undefined) ? -10 : +d[dragonNames[4][0]].replace(/,/g, ""),
    y2Accessor: d => (d[dragonNames[4][1]] == undefined) ? -10 : +d[dragonNames[4][1]].replace(/,/g, "")
  });

  myDragon5.create('#dragon5', dragonwagon, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => dragonNames[5][0],
    y2Name: d => dragonNames[5][1],
    rank: d => dragonNames[5][2],
    yAccessor: d => (d[dragonNames[5][0]] == undefined) ? -10 : +d[dragonNames[5][0]].replace(/,/g, ""),
    y2Accessor: d => (d[dragonNames[5][1]] == undefined) ? -10 : +d[dragonNames[5][1]].replace(/,/g, "")
  });

  myDragon6.create('#dragon6', dragonwagon, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => dragonNames[6][0],
    y2Name: d => dragonNames[6][1],
    rank: d => dragonNames[6][2],
    yAccessor: d => (d[dragonNames[6][0]] == undefined) ? -10 : +d[dragonNames[6][0]].replace(/,/g, ""),
    y2Accessor: d => (d[dragonNames[6][1]] == undefined) ? -10 : +d[dragonNames[6][1]].replace(/,/g, "")
  });

  myDragon7.create('#dragon7', dragonwagon, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => dragonNames[7][0],
    y2Name: d => dragonNames[7][1],
    rank: d => dragonNames[7][2],
    yAccessor: d => (d[dragonNames[7][0]] == undefined) ? -10 : +d[dragonNames[7][0]].replace(/,/g, ""),
    y2Accessor: d => (d[dragonNames[7][1]] == undefined) ? -10 : +d[dragonNames[7][1]].replace(/,/g, "")
  });




  // RESIZE FUNCTION
  const resizeDb = _.debounce(() => {
    // myChart.resize();
    // myMultiLineChart.resize();
    myFruit0.resize()
    myFruit1.resize()
    myFruit2.resize()
    myFruit3.resize()
    myFruit4.resize()
    myFruit5.resize()
    myFruit6.resize()
    myFruit7.resize()
    myBull0.resize()
    myBull1.resize()
    myBull2.resize()
    myBull3.resize()
    myBull4.resize()
    myBull5.resize()
    myBull6.resize()
    myBull7.resize()
    myDragon0.resize()
    myDragon1.resize()
    myDragon2.resize()
    myDragon3.resize()
    myDragon4.resize()
    myDragon5.resize()
    myDragon6.resize()
    myDragon7.resize()
    // myFruit8.resize()    
  }, 400);

  window.addEventListener('resize', () => {
    resizeDb();
  });
}

// request('https://s3-us-west-2.amazonaws.com/energy2/social/fruithandler_regional.csv', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
     // var importedJSON = JSON.parse(body);
     // console.log(importedJSON);
    // console.log(body)
    // const parse = require('csv-parse')


//   }
// })
