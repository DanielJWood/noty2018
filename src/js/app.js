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
import plusminus from './plus-minus';
import compare from './compare';

// import chart from './chart';
// const parseYear = d3.timeParse('%Y');
// Declare our singleLine chart module
var ranks = {"Salami Blessing":1,"Bernard Bumpus":16,"Duckens Nazon":8,"Zeus de la Paz":9,"Habakkuk Baldonado":5,"Armagedon Draughn":12,"Early Charlemagne":4,"Miracle Crimes":13,"Tuna Altuna":6,"Phlandrous Fleming,Jr.":11,"Mosthigh Thankgod":3,"Fabulous Flournoy":14,"Dr. Dimple Royalty":7,"Jamez Brickhouse":10,"Jimbob Ghostkeeper":2,"Travis Couture-Lovelady":15,"Makenlove Petit-Fard":1,"Dr. Pitt Derryberry":16,"Babucarr Fatty":8,"Sparkle Hayter":9,"Shamoil Shipchandler":5,"Dr. Megha Panda":12,"Corky Booze":4,"Darwin Tabacco":13,"Dr. Birchann Paffenbarger":6,"Covadonga del Busto Naval":11,"Blossom Albuquerque":3,"Obra Kernodle IV":14,"SirZion Dance":7,"Devoid Couch":10,"Rev. Dongo Pewee":2,"Jempy Drucker":15,"La Royce Lobster-Gaines":1,"Christine Plentyhoops":16,"Darthvader Williamson":8,"Delicious Peters":9,"Lola Honeybone":5,"Chosen Roach":12,"Chardonnay Beaver":4,"Maverik Buffo":13,"Crystal Patriarche":6,"Forbes Thor Kiddoo":11,"Quindarious Gooch":3,"Mike Diaper":14,"Candida Seasock":7,"Adele Gorrilla":10,"Ceejhay French-Love":2,"YoHeinz Tyler":15,"Dr. Narwhals Mating":1,"Clinton Bacon":16,"Bramble Klipple":8,"Mahogany Loggins":9,"Rev. Hobbit Forrest":5,"Genuine Potts":12,"Beau Titsworth":4,"Palestine Ace":13,"Sixto Cancel":6,"Hallelujah Lulie":11,"Dr. Taekwondo Byrd":3,"Bucky Worboys":14,"Lukas Chalupa":7,"Gandalf Hernandez":10,"Shaka Licorish":2,"Tuesday DerMargosian":15};

var bullNames = [
["Salami Blessing","Bernard Bumpus",[1,16]],
["Duckens Nazon","Zeus de la Paz",[8,9]],
["Habakkuk Baldonado","Armagedon Draughn",[5,12]],
["Early Charlemagne","Miracle Crimes",[4,13]],
["Tuna Altuna","Phlandrous Fleming,Jr.",[6,11]],
["Mosthigh Thankgod","Fabulous Flournoy",[3,14]],
["Dr. Dimple Royalty","Jamez Brickhouse",[7,10]],
["Jimbob Ghostkeeper","Travis Couture-Lovelady",[2,15]]
]

var fruitNames = [
  ["Makenlove Petit-Fard", "Dr. Pitt Derryberry",[1,16]],
  ["Babucarr Fatty", "Sparkle Hayter",[8,9]],
  ["Shamoil Shipchandler", "Dr. Megha Panda",[5,12]],
  ["Corky Booze", "Darwin Tabacco",[4,13]],
  ["Dr. Birchann Paffenbarger", "Covadonga del Busto Naval",[6,11]],
  ["Blossom Albuquerque", "Obra Kernodle IV",[3,14]],
  ["SirZion Dance", "Devoid Couch",[7,10]],
  ["Rev. Dongo Pewee", "Jempy Drucker",[2,15]]
]

var dragonNames = [
  ["La Royce Lobster-Gaines","Christine Plentyhoops",[1,16]],
  ["Darthvader Williamson","Delicious Peters",[8,9]],
  ["Lola Honeybone","Chosen Roach",[5,12]],
  ["Chardonnay Beaver","Maverik Buffo",[4,13]],
  ["Crystal Patriarche","Forbes Thor Kiddoo",[6,11]],
  ["Quindarious Gooch","Mike Diaper",[3,14]],
  ["Candida Seasock","Adele Gorrilla",[7,10]],
  ["Ceejhay French-Love","YoHeinz Tyler",[2,15]]
];

var chrotchNames = [
  ["Dr. Narwhals Mating","Clinton Bacon",[1,16]],
  ["Bramble Klipple","Mahogany Loggins",[8,9]],
  ["Rev. Hobbit Forrest","Genuine Potts",[5,12]],
  ["Beau Titsworth","Palestine Ace",[4,13]],
  ["Sixto Cancel","Hallelujah Lulie",[6,11]],
  ["Dr. Taekwondo Byrd","Bucky Worboys",[3,14]],
  ["Lukas Chalupa","Gandalf Hernandez",[7,10]],
  ["Shaka Licorish","Tuesday DerMargosian",[2,15]]
];

var round21Names = [
  ["Salami Blessing","Duckens Nazon",[1,8]],
  ["Armagedon Draughn","Miracle Crimes",[12,13]],
  ["Tuna Altuna","Mosthigh Thankgod",[6,3]],
  ["Dr. Dimple Royalty","Jimbob Ghostkeeper",[7,2]],
  ["Makenlove Petit-Fard","Sparkle Hayter",[1,9]],
  ["Dr. Megha Panda","Corky Booze",[12,4]],
  ["Covadonga del Busto Naval","Obra Kernodle IV",[11,14]],
  ["Devoid Couch","Rev. Dongo Pewee",[10,2]]
]

var round22Names = [
  ["La Royce Lobster-Gaines","Delicious Peters",[1,9]],
  ["Chosen Roach","Chardonnay Beaver",[12,4]],
  ["Forbes Thor Kiddoo","Quindarious Gooch",[11,3]],
  ["Candida Seasock","YoHeinz Tyler",[7,15]],
  ["Dr. Narwhals Mating","Mahogany Loggins",[1,9]],
  ["Rev. Hobbit Forrest","Beau Titsworth",[5,4]],
  ["Hallelujah Lulie","Dr. Taekwondo Byrd",[11,3]],
  ["Gandalf Hernandez","Shaka Licorish",[10,2]]
]

var round31Names = [
  ["Salami Blessing","Miracle Crimes",[1,13]],
  ["Mosthigh Thankgod","Jimbob Ghostkeeper",[3,2]],
  ["Makenlove Petit-Fard","Dr. Megha Panda",[1,12]],
  ["Covadonga del Busto Naval","Rev. Dongo Pewee",[11,2]],
  ["Delicious Peters","Chardonnay Beaver",[9,4]],
  ["Quindarious Gooch","Candida Seasock",[3,7]],
  ["Dr. Narwhals Mating","Beau Titsworth",[1,4]],
  ["Dr. Taekwondo Byrd","Gandalf Hernandez",[3,10]]
];

var round41Names = [
  ["Salami Blessing","Jimbob Ghostkeeper",[1,2]],
  ["Makenlove Petit-Fard","Rev. Dongo Pewee",[1,2]],
  ["Delicious Peters","Quindarious Gooch",[9,3]],
  ["Dr. Narwhals Mating","Gandalf Hernandez",[1,10]]
];

d3.queue()
    .defer(d3.csv, "https://s3-us-west-2.amazonaws.com/energy2/social/fruithandler_regional.csv")    
    .defer(d3.csv, "https://s3-us-west-2.amazonaws.com/energy2/social/bulltron_regional.csv")    
    .defer(d3.csv, "https://s3-us-west-2.amazonaws.com/energy2/social/dragonwagon_regional.csv")    
    .defer(d3.csv, "https://s3-us-west-2.amazonaws.com/energy2/social/chrotchtangle_regional.csv")    
    .defer(d3.csv, "https://s3-us-west-2.amazonaws.com/energy2/social/round2_1.csv")    
    .defer(d3.csv, "https://s3-us-west-2.amazonaws.com/energy2/social/round2_2.csv")    
    .defer(d3.csv, "https://s3-us-west-2.amazonaws.com/energy2/social/round3_1.csv")    
    .defer(d3.csv, "https://s3-us-west-2.amazonaws.com/energy2/social/round4_1.csv")    
    .await(ready);

function ready(error, fruithandler, bulltron, dragonwagon, chrotchtangle, round2_1, round2_2,round3_1,round4_1) {

  var timetime = document.getElementById("time")
  const parseTime = d3.timeParse("%m/%d/%y %H:%M")
  const formatTime = d3.timeFormat("%H:%M (EDT), %B %d, %Y");

  timetime.innerHTML = formatTime(d3.timeHour.offset(parseTime(round4_1[round4_1.length - 1].date),-4));

  var dataRollup = compileData(fruithandler, bulltron, dragonwagon, chrotchtangle, round2_1, round2_2,round3_1,round4_1);

  dataRollup.sort(function(x, y){
   return d3.ascending(Math.abs(x.vote1-x.vote2), Math.abs(y.vote1-y.vote2));
  });

  const myCompare = new compare();

  myCompare.create('#compare', dataRollup, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    // yName: (d, i, o) => {
    //   console.log(d)
    //   console.log(i)
    //   console.log(o)
    //   console.log(dataRollup)
    //   return dataRollup
    // }

  });

  // Declare our charts

  //round4
  const myRound410 = new chart();
  const myRound411 = new chart();
  const myRound412 = new chart();
  const myRound413 = new chart();

  //round3
  const myRound310 = new chart();
  const myRound311 = new chart();
  const myRound312 = new chart();
  const myRound313 = new chart();
  const myRound314 = new chart();
  const myRound315 = new chart();
  const myRound316 = new chart();
  const myRound317 = new chart();

  // 
  const myTunaGod = new plusminus();

  // Round 2
  const myRound210 = new chart();
  const myRound211 = new chart();
  const myRound212 = new chart();
  const myRound213 = new chart();
  const myRound214 = new chart();
  const myRound215 = new chart();
  const myRound216 = new chart();
  const myRound217 = new chart();

  const myRound220 = new chart();
  const myRound221 = new chart();
  const myRound222 = new chart();
  const myRound223 = new chart();
  const myRound224 = new chart();
  const myRound225 = new chart();
  const myRound226 = new chart();
  const myRound227 = new chart();

  // Round 1
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

  const myChrotch0 = new chart();
  const myChrotch1 = new chart();
  const myChrotch2 = new chart();
  const myChrotch3 = new chart();
  const myChrotch4 = new chart();
  const myChrotch5 = new chart();
  const myChrotch6 = new chart();
  const myChrotch7 = new chart();

  // This is the initial draw, using our create method.
  // It needs a selection string (html element), data and our custom props object.
// #round 4

myRound410.create('#round4-1-0', round4_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round41Names[0][0],
    y2Name: d => round41Names[0][1],
    rank: d => round41Names[0][2],
    yAccessor: d => (d[round41Names[0][0]] == undefined) ? -10 : +d[round41Names[0][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round41Names[0][1]] == undefined) ? -10 : +d[round41Names[0][1]].replace(/,/g, "")
  });

  myRound411.create('#round4-1-1', round4_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round41Names[1][0],
    y2Name: d => round41Names[1][1],
    rank: d => round41Names[1][2],
    yAccessor: d => (d[round41Names[1][0]] == undefined) ? -10 : +d[round41Names[1][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round41Names[1][1]] == undefined) ? -10 : +d[round41Names[1][1]].replace(/,/g, "")
  });

  myRound412.create('#round4-1-2', round4_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round41Names[2][0],
    y2Name: d => round41Names[2][1],
    rank: d => round41Names[2][2],
    yAccessor: d => (d[round41Names[2][0]] == undefined) ? -10 : +d[round41Names[2][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round41Names[2][1]] == undefined) ? -10 : +d[round41Names[2][1]].replace(/,/g, "")
  });

  myRound413.create('#round4-1-3', round4_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round41Names[3][0],
    y2Name: d => round41Names[3][1],
    rank: d => round41Names[3][2],
    yAccessor: d => (d[round41Names[3][0]] == undefined) ? -10 : +d[round41Names[3][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round41Names[3][1]] == undefined) ? -10 : +d[round41Names[3][1]].replace(/,/g, "")
  });

//round 3

  myRound310.create('#round3-1-0', round3_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round31Names[0][0],
    y2Name: d => round31Names[0][1],
    rank: d => round31Names[0][2],
    yAccessor: d => (d[round31Names[0][0]] == undefined) ? -10 : +d[round31Names[0][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round31Names[0][1]] == undefined) ? -10 : +d[round31Names[0][1]].replace(/,/g, "")
  });

  myRound311.create('#round3-1-1', round3_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round31Names[1][0],
    y2Name: d => round31Names[1][1],
    rank: d => round31Names[1][2],
    yAccessor: d => (d[round31Names[1][0]] == undefined) ? -10 : +d[round31Names[1][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round31Names[1][1]] == undefined) ? -10 : +d[round31Names[1][1]].replace(/,/g, "")
  });

  myRound312.create('#round3-1-2', round3_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round31Names[2][0],
    y2Name: d => round31Names[2][1],
    rank: d => round31Names[2][2],
    yAccessor: d => (d[round31Names[2][0]] == undefined) ? -10 : +d[round31Names[2][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round31Names[2][1]] == undefined) ? -10 : +d[round31Names[2][1]].replace(/,/g, "")
  });

  myRound313.create('#round3-1-3', round3_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round31Names[3][0],
    y2Name: d => round31Names[3][1],
    rank: d => round31Names[3][2],
    yAccessor: d => (d[round31Names[3][0]] == undefined) ? -10 : +d[round31Names[3][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round31Names[3][1]] == undefined) ? -10 : +d[round31Names[3][1]].replace(/,/g, "")
  });

  myRound314.create('#round3-1-4', round3_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round31Names[4][0],
    y2Name: d => round31Names[4][1],
    rank: d => round31Names[4][2],
    yAccessor: d => (d[round31Names[4][0]] == undefined) ? -10 : +d[round31Names[4][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round31Names[4][1]] == undefined) ? -10 : +d[round31Names[4][1]].replace(/,/g, "")
  });

  myRound315.create('#round3-1-5', round3_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round31Names[5][0],
    y2Name: d => round31Names[5][1],
    rank: d => round31Names[5][2],
    yAccessor: d => (d[round31Names[5][0]] == undefined) ? -10 : +d[round31Names[5][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round31Names[5][1]] == undefined) ? -10 : +d[round31Names[5][1]].replace(/,/g, "")
  });

  myRound316.create('#round3-1-6', round3_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round31Names[6][0],
    y2Name: d => round31Names[6][1],
    rank: d => round31Names[6][2],
    yAccessor: d => (d[round31Names[6][0]] == undefined) ? -10 : +d[round31Names[6][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round31Names[6][1]] == undefined) ? -10 : +d[round31Names[6][1]].replace(/,/g, "")
  });

  myRound317.create('#round3-1-7', round3_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round31Names[7][0],
    y2Name: d => round31Names[7][1],
    rank: d => round31Names[7][2],
    yAccessor: d => (d[round31Names[7][0]] == undefined) ? -10 : +d[round31Names[7][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round31Names[7][1]] == undefined) ? -10 : +d[round31Names[7][1]].replace(/,/g, "")
  });

// special

  myTunaGod.create('#tunagod', round4_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round41Names[2][0],
    y2Name: d => round41Names[2][1],
    rank: d => round41Names[2][2],
    yAccessor: d => (d[round41Names[2][0]] == undefined) ? -10 : +d[round41Names[2][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round41Names[2][1]] == undefined) ? -10 : +d[round41Names[2][1]].replace(/,/g, "")
  });


// round 2
  myRound220.create('#round2-2-0', round2_2, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round22Names[0][0],
    y2Name: d => round22Names[0][1],
    rank: d => round22Names[0][2],
    yAccessor: d => (d[round22Names[0][0]] == undefined) ? -10 : +d[round22Names[0][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round22Names[0][1]] == undefined) ? -10 : +d[round22Names[0][1]].replace(/,/g, "")
  });

  myRound221.create('#round2-2-1', round2_2, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round22Names[1][0],
    y2Name: d => round22Names[1][1],
    rank: d => round22Names[1][2],
    yAccessor: d => (d[round22Names[1][0]] == undefined) ? -10 : +d[round22Names[1][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round22Names[1][1]] == undefined) ? -10 : +d[round22Names[1][1]].replace(/,/g, "")
  });

  myRound222.create('#round2-2-2', round2_2, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round22Names[2][0],
    y2Name: d => round22Names[2][1],
    rank: d => round22Names[2][2],
    yAccessor: d => (d[round22Names[2][0]] == undefined) ? -10 : +d[round22Names[2][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round22Names[2][1]] == undefined) ? -10 : +d[round22Names[2][1]].replace(/,/g, "")
  });

  myRound223.create('#round2-2-3', round2_2, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round22Names[3][0],
    y2Name: d => round22Names[3][1],
    rank: d => round22Names[3][2],
    yAccessor: d => (d[round22Names[3][0]] == undefined) ? -10 : +d[round22Names[3][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round22Names[3][1]] == undefined) ? -10 : +d[round22Names[3][1]].replace(/,/g, "")
  });

  myRound224.create('#round2-2-4', round2_2, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round22Names[4][0],
    y2Name: d => round22Names[4][1],
    rank: d => round22Names[4][2],
    yAccessor: d => (d[round22Names[4][0]] == undefined) ? -10 : +d[round22Names[4][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round22Names[4][1]] == undefined) ? -10 : +d[round22Names[4][1]].replace(/,/g, "")
  });

  myRound225.create('#round2-2-5', round2_2, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round22Names[5][0],
    y2Name: d => round22Names[5][1],
    rank: d => round22Names[5][2],
    yAccessor: d => (d[round22Names[5][0]] == undefined) ? -10 : +d[round22Names[5][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round22Names[5][1]] == undefined) ? -10 : +d[round22Names[5][1]].replace(/,/g, "")
  });

  myRound226.create('#round2-2-6', round2_2, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round22Names[6][0],
    y2Name: d => round22Names[6][1],
    rank: d => round22Names[6][2],
    yAccessor: d => (d[round22Names[6][0]] == undefined) ? -10 : +d[round22Names[6][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round22Names[6][1]] == undefined) ? -10 : +d[round22Names[6][1]].replace(/,/g, "")
  });

  myRound227.create('#round2-2-7', round2_2, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round22Names[7][0],
    y2Name: d => round22Names[7][1],
    rank: d => round22Names[7][2],
    yAccessor: d => (d[round22Names[7][0]] == undefined) ? -10 : +d[round22Names[7][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round22Names[7][1]] == undefined) ? -10 : +d[round22Names[7][1]].replace(/,/g, "")
  });


  myRound210.create('#round2-1-0', round2_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round21Names[0][0],
    y2Name: d => round21Names[0][1],
    rank: d => round21Names[0][2],
    yAccessor: d => (d[round21Names[0][0]] == undefined) ? -10 : +d[round21Names[0][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round21Names[0][1]] == undefined) ? -10 : +d[round21Names[0][1]].replace(/,/g, "")
  });

  myRound211.create('#round2-1-1', round2_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round21Names[1][0],
    y2Name: d => round21Names[1][1],
    rank: d => round21Names[1][2],
    yAccessor: d => (d[round21Names[1][0]] == undefined) ? -10 : +d[round21Names[1][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round21Names[1][1]] == undefined) ? -10 : +d[round21Names[1][1]].replace(/,/g, "")
  });

  myRound212.create('#round2-1-2', round2_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round21Names[2][0],
    y2Name: d => round21Names[2][1],
    rank: d => round21Names[2][2],
    yAccessor: d => (d[round21Names[2][0]] == undefined) ? -10 : +d[round21Names[2][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round21Names[2][1]] == undefined) ? -10 : +d[round21Names[2][1]].replace(/,/g, "")
  });

  myRound213.create('#round2-1-3', round2_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round21Names[3][0],
    y2Name: d => round21Names[3][1],
    rank: d => round21Names[3][2],
    yAccessor: d => (d[round21Names[3][0]] == undefined) ? -10 : +d[round21Names[3][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round21Names[3][1]] == undefined) ? -10 : +d[round21Names[3][1]].replace(/,/g, "")
  });

  myRound214.create('#round2-1-4', round2_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round21Names[4][0],
    y2Name: d => round21Names[4][1],
    rank: d => round21Names[4][2],
    yAccessor: d => (d[round21Names[4][0]] == undefined) ? -10 : +d[round21Names[4][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round21Names[4][1]] == undefined) ? -10 : +d[round21Names[4][1]].replace(/,/g, "")
  });

  myRound215.create('#round2-1-5', round2_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round21Names[5][0],
    y2Name: d => round21Names[5][1],
    rank: d => round21Names[5][2],
    yAccessor: d => (d[round21Names[5][0]] == undefined) ? -10 : +d[round21Names[5][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round21Names[5][1]] == undefined) ? -10 : +d[round21Names[5][1]].replace(/,/g, "")
  });

  myRound216.create('#round2-1-6', round2_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round21Names[6][0],
    y2Name: d => round21Names[6][1],
    rank: d => round21Names[6][2],
    yAccessor: d => (d[round21Names[6][0]] == undefined) ? -10 : +d[round21Names[6][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round21Names[6][1]] == undefined) ? -10 : +d[round21Names[6][1]].replace(/,/g, "")
  });

  myRound217.create('#round2-1-7', round2_1, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => round21Names[7][0],
    y2Name: d => round21Names[7][1],
    rank: d => round21Names[7][2],
    yAccessor: d => (d[round21Names[7][0]] == undefined) ? -10 : +d[round21Names[7][0]].replace(/,/g, ""),
    y2Accessor: d => (d[round21Names[7][1]] == undefined) ? -10 : +d[round21Names[7][1]].replace(/,/g, "")
  });

// round 1
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

  myChrotch0.create('#chrotch0', chrotchtangle, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => chrotchNames[0][0],
    y2Name: d => chrotchNames[0][1],
    rank: d => chrotchNames[0][2],
    yAccessor: d => (d[chrotchNames[0][0]] == undefined) ? -10 : +d[chrotchNames[0][0]].replace(/,/g, ""),
    y2Accessor: d => (d[chrotchNames[0][1]] == undefined) ? -10 : +d[chrotchNames[0][1]].replace(/,/g, "")
  });

  myChrotch1.create('#chrotch1', chrotchtangle, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => chrotchNames[1][0],
    y2Name: d => chrotchNames[1][1],
    rank: d => chrotchNames[1][2],
    yAccessor: d => (d[chrotchNames[1][0]] == undefined) ? -10 : +d[chrotchNames[1][0]].replace(/,/g, ""),
    y2Accessor: d => (d[chrotchNames[1][1]] == undefined) ? -10 : +d[chrotchNames[1][1]].replace(/,/g, "")
  });

  myChrotch2.create('#chrotch2', chrotchtangle, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => chrotchNames[2][0],
    y2Name: d => chrotchNames[2][1],
    rank: d => chrotchNames[2][2],
    yAccessor: d => (d[chrotchNames[2][0]] == undefined) ? -10 : +d[chrotchNames[2][0]].replace(/,/g, ""),
    y2Accessor: d => (d[chrotchNames[2][1]] == undefined) ? -10 : +d[chrotchNames[2][1]].replace(/,/g, "")
  });

  myChrotch3.create('#chrotch3', chrotchtangle, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => chrotchNames[3][0],
    y2Name: d => chrotchNames[3][1],
    rank: d => chrotchNames[3][2],
    yAccessor: d => (d[chrotchNames[3][0]] == undefined) ? -10 : +d[chrotchNames[3][0]].replace(/,/g, ""),
    y2Accessor: d => (d[chrotchNames[3][1]] == undefined) ? -10 : +d[chrotchNames[3][1]].replace(/,/g, "")
  });

  myChrotch4.create('#chrotch4', chrotchtangle, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => chrotchNames[4][0],
    y2Name: d => chrotchNames[4][1],
    rank: d => chrotchNames[4][2],
    yAccessor: d => (d[chrotchNames[4][0]] == undefined) ? -10 : +d[chrotchNames[4][0]].replace(/,/g, ""),
    y2Accessor: d => (d[chrotchNames[4][1]] == undefined) ? -10 : +d[chrotchNames[4][1]].replace(/,/g, "")
  });

  myChrotch5.create('#chrotch5', chrotchtangle, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => chrotchNames[5][0],
    y2Name: d => chrotchNames[5][1],
    rank: d => chrotchNames[5][2],
    yAccessor: d => (d[chrotchNames[5][0]] == undefined) ? -10 : +d[chrotchNames[5][0]].replace(/,/g, ""),
    y2Accessor: d => (d[chrotchNames[5][1]] == undefined) ? -10 : +d[chrotchNames[5][1]].replace(/,/g, "")
  });

  myChrotch6.create('#chrotch6', chrotchtangle, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => chrotchNames[6][0],
    y2Name: d => chrotchNames[6][1],
    rank: d => chrotchNames[6][2],
    yAccessor: d => (d[chrotchNames[6][0]] == undefined) ? -10 : +d[chrotchNames[6][0]].replace(/,/g, ""),
    y2Accessor: d => (d[chrotchNames[6][1]] == undefined) ? -10 : +d[chrotchNames[6][1]].replace(/,/g, "")
  });

  myChrotch7.create('#chrotch7', chrotchtangle, {
    // This is where you would overwrite props to change the name of the data to match your unique data (in this case multipleLine)
    // See above in single chart for changing the props
    yName: d => chrotchNames[7][0],
    y2Name: d => chrotchNames[7][1],
    rank: d => chrotchNames[7][2],
    yAccessor: d => (d[chrotchNames[7][0]] == undefined) ? -10 : +d[chrotchNames[7][0]].replace(/,/g, ""),
    y2Accessor: d => (d[chrotchNames[7][1]] == undefined) ? -10 : +d[chrotchNames[7][1]].replace(/,/g, "")
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
    myChrotch0.resize()
    myChrotch1.resize()
    myChrotch2.resize()
    myChrotch3.resize()
    myChrotch4.resize()
    myChrotch5.resize()
    myChrotch6.resize()
    myChrotch7.resize()
    myRound210.resize()
    myRound211.resize()
    myRound212.resize()
    myRound213.resize()
    myRound214.resize()
    myRound215.resize()
    myRound216.resize()
    myRound217.resize()
    myRound220.resize()
    myRound221.resize()
    myRound222.resize()
    myRound223.resize()
    myRound224.resize()
    myRound225.resize()
    myRound226.resize()
    myRound227.resize()
    myRound310.resize()
    myRound311.resize()
    myRound312.resize()
    myRound313.resize()
    myRound314.resize()
    myRound315.resize()
    myRound316.resize()
    myRound317.resize()
    myRound410.resize()
    myRound411.resize()
    myRound412.resize()
    myRound413.resize()
    myTunaGod.resize()

    // myFruit8.resize()    
  }, 400);

  window.addEventListener('resize', () => {
    resizeDb();
  });
}

function compileData(a,b,c,d,e,f,g,h) {
  var allData = [a,b,c,d,e,f,g,h]

  var finalData = [];

  for (var i = 0; i < allData.length; i++) {
    var Datalength = allData[i].length - 1;
    // console.log(allData[i][Datalength])    
    var j = 0;
    for (var item in allData[i][Datalength]) {      
      j+=1;
      if (item != "date") {

        if (j % 2 == 0) {
          

          finalData.push({
            "name1":  item,
            "name2":  0,
            "rank1":  ranks[item],
            "rank2":  0,
            "vote1":  +allData[i][Datalength][item].replace(/,/g, ""),
            "vote2":  0,
            "round":  i,
            "index":  j/2
          })
        }
        else {
          finalData[finalData.length-1].name2 = item;
          finalData[finalData.length-1].rank2 = ranks[item];
          finalData[finalData.length-1].vote2 = +allData[i][Datalength][item].replace(/,/g, "");
        }
        
      }
    }
  }
  console.log(finalData)
  return finalData;
}

// request('https://s3-us-west-2.amazonaws.com/energy2/social/fruithandler_regional.csv', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
     // var importedJSON = JSON.parse(body);
     // console.log(importedJSON);
    // console.log(body)
    // const parse = require('csv-parse')


//   }
// })
