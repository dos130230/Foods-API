
const http = require("http")
const quryBaza = {}
const url = require("url")

function SERVER(req,res) {
	const reqUrl = url.parse(req.url).pathname
	req.jsonSend = function (data){
		res.setHeader("Content-Type","application/json")
		return res.end(JSON.stringify(data))
	}

	if(quryBaza[reqUrl]){
		return quryBaza[reqUrl][req.method](req,res)

	}
	else{
		res.end("Invalic query")
	}
}


function Express() {
	this.server = http.createServer(SERVER)

	this.listen = function (port,colback){
		this.server.listen(port,colback)
	}
	this.get = function (path,colback){
		quryBaza[path] = quryBaza[path] || {}
		quryBaza[path]["GET"] = colback
	}
	this.post  = function (path,colback){
		quryBaza[path] = quryBaza[path] || {}
		quryBaza[path]["POST"] = colback
	}
}


module.exports = Express