var express = require('express');
var app = express();

app.use(express.json());

app.get('/', function(req, res){
	res.send('Api for Blitz Coveo');
});

app.post('/', function(req, res){ 

	var result = stack(req.body.puzzles);

	var obj = JSON.parse('{'
		+'"teamName": "Pinguin",'
		+'"solutions": '+result+','
		+'"participants" : [{'
			+'"isCaptain": true,'
			+'"fullName": "jean-philippe belanger",'
			+'"email": "belanger.jean-philippe@videotron.ca",'
			+'"googleAccount": "vitrimel@gmail.com",'
			+'"school": "ulaval",'
			+'"schoolProgram": "GLO",'
			+'"graduationDate": 123'
		+'}]'
	+'}');
	res.send(obj);
});

app.listen(3000, function(){
	console.log('Ready');
});

function stack(puzzles){
	var result = [];
	for(var i = 0;i<puzzles.length;i++){
		result.push(algo(puzzles[i].origin.row, puzzles[i].origin.col, puzzles[i].end.row, puzzles[i].end.col, puzzles[i].scrambledPath));
	}
	return JSON.stringify(result);
}

function algo(oi,oj,ei,ej,path){;
	console.log(path);
	console.log(oi);
	console.log(oj);
	console.log(ei);
	console.log(ej);
	return path;
}
