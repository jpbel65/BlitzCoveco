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

app.listen(process.env.PORT, function(){
	console.log('Ready');
});

function stack(puzzles){
	var result = [];
	for(var i = 0;i<puzzles.length;i++){
		result.push(algo(puzzles[i].origin.row, puzzles[i].origin.col, puzzles[i].end.row, puzzles[i].end.col, puzzles[i].scrambledPath));
	}
	return JSON.stringify(result);
}

function algo(oi,oj,ei,ej,path){
	var di = ei-oi;
	var dj = ej-oj;
	var pmak = [];
	var result = path;
	console.log('di: '+di+', dj: '+dj);
	for(var i = 0;i<path.length;i++){
		if(path[i] === 'r')--dj;
		if(path[i] === 'l')++dj;
		if(path[i] === 'u')++di;
		if(path[i] === 'd')--di;
		if(path[i] === '?')pmak.push(i);
	}
	console.log('di: '+di+', dj: '+dj);
	if(Math.abs(di+dj) === 0 && pmak.length > 0)return 'test';
	if(pmak.length !== Math.abs(di+dj))return 'nothing';
	for(var i = 0;i<pmak.length;i++){
		if(dj<0){
			dj++;
			result = result.replace("?","l");
		}
		if(dj>0){
			dj--;
			result = result.replace("?","r");
		}
		if(di<0){
			di++;
			result = result.replace("?","u");
		}
		if(di>0){
			di--;
			result = result.replace("?","d");
		}
	}
	return result;
}
