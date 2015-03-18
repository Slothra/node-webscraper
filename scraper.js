var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var $;
var output = [];

var ifGets = function(error,response,body){
	if (!error && response.statusCode == 200) {
    $ = cheerio.load(body)
    $("tr").each(parse)
    fs.appendFile('output.csv', output.join('\n'), write)
  }
}

var parse = function( i, value ) {
	var a = ($(this).children('td:first-child').text());
	var b = ("http://substack.net/images/" + $(this).children('td').children('a').text());
	var c = (path.extname($(this).children('td:nth-child(3)').text()));
	var temp = [a,b,c];
	output.push(temp);
}

var write = function(err){
	if (!err) {
		console.log("done!");
	}
}

request('http://substack.net/images/', ifGets);