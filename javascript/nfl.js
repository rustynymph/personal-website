var loadedData = false;

var cheerleader;
var numCheerleaders;

var canvas_width, canvas_height;

var sel;
var teams = [{key: 'Arizona Cardinals', value: 'ARI'}, {key: 'Atlanta Falcons', value: 'ATL'},
			{key: 'Baltimore Ravens', value: 'BAL'}, {key: 'Buffalo Bills', value: 'BUF'}, 
			{key: 'Carolina Panthers', value: 'CAR'},
			{key: 'Chicago Bears', value: 'CHI'}, {key: 'Cincinnati Bengals', value: 'CIN'},
			{key: 'Cleveland Browns', value: 'CLE'}, {key: 'Dallas Cowboys', value: 'DAL'},
			{key: 'Denver Broncos', value: 'DEN'}, {key: 'Detroit Lions', value: 'DET'},
			{key: 'Green Bay Packers', value: 'GB'}, {key: 'Houston Texans', value: 'HOU'},
			{key: 'Indianapolis Colts', value: 'IND'}, {key: 'Jacksonville Jaguars', value: 'JAC'},
			{key: 'Kansas City Chiefs', value: 'KAN'}, {key: 'Miami Dolphins', value: 'MIA'},
			{key: 'Minnesota Vikings', value: 'MIN'}, {key: 'New England Patriots', value: 'NE'},
			{key: 'New Orleans Saints', value: 'NO'}, {key: 'New York Giants', value: 'NYG'},
			{key: 'New York Jets', value: 'NYJ'}, {key: 'Oakland Raiders', value: 'OAK'},
			{key: 'Philadelphia Eagles', value: 'PHI'}, {key: 'Pittsburgh Steelers', value: 'PIT'},
			{key: 'San Diego Chargers', value: 'SD'}, {key: 'San Francisco 49ers', value: 'SF'},
			{key: 'Seattle Seahawks', value: 'SEA'}, {key: 'St. Louis Rams', value: 'LA'},
			{key: 'Tampa Bay Buccaneers', value: 'TB'}, {key: 'Tennessee Titans', value: 'TEN'},
			{key: 'Washington Redskins', value: 'WAS'}, {key: 'Arizona Cardinals', value: 'ARI'}];


function preload(){
	cheerleader = loadGif('/images/cheerleader.gif');
}

function setup(){
  canvas_height = window.innerHeight;
  canvas_width = window.innerWidth;
  cnv = createCanvas(canvas_width,canvas_height);
  cnv.position(0, 0);
  cnv.parent('nfl');
  sel = createSelect();
  sel.position(10, 10);
  for (var i = 0; i < teams.length; i++){
  	sel.option(teams[i]["key"]);
  }
  sel.changed(mySelectEvent);  
}

function draw(){
	background(0);
	translate(canvas_width/2, canvas_height/2);
	drawField();
	drawCheerleaders();
}

window.onresize = function() {
  canvas_height = window.innerHeight;
  canvas_width = window.innerWidth;
  resizeCanvas(canvas_width, canvas_height);	
}

function drawField(){
	fill(0, 255, 0);
	rect(-canvas_width/2, 0, canvas_width, canvas_height/2);
}

function drawCheerleaders(){
	if (cheerleader.width > 0){
		numCheerleaders = canvas_width/cheerleader.width;
	} else {
		numCheerleaders = 0;
	}
	var x = -1*(canvas_width/2+cheerleader.width);
	for (var i = 0; i < numCheerleaders; i++){
		x += cheerleader.width;
		image(cheerleader, x, canvas_height/2-cheerleader.height);
	}		
}

function mySelectEvent() {
  var item = sel.value();
  var teamCode = getTeamCode(item);
  getTopCrimes(teamCode);
}

function getTeamCode(team){
	for (var i = 0; i < teams.length; i++){
		if (team == teams[i]["key"]){
			return code = teams[i]["value"];
		}
	}
	return null
}

function getTopCrimes(team){
	var listOfCrimes = [];
	var url = 'http://nflarrest.com/api/v1/team/topCrimes/' + team;
	$.ajax({
	  url: url,
	  beforeSend: function( xhr ) {
	    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
	  }
	})
	  .done(function( data ) {
	  	loadedData = true;
	    if (console && console.log) {
	    	data = data.substring(1, data.length-1);
	    	data = data.split('},');
	    	for (var i = 0; i < data.length; i++){
	    		if (data[i][data[i].length-1] == '}'){
	    			listOfCrimes.push(JSON.parse(data[i]));
	    		} else {
	    			listOfCrimes.push(JSON.parse(data[i]+'}'));
	    		}
	    	}
	      console.log(listOfCrimes[0]["Category"], listOfCrimes[1]["Category"], listOfCrimes[2]["Category"]);
	    }
	  });
}