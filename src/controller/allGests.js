const path = require("path")
const fs = require("fs/promises")
const url = require('url')
const qs = require('querystring')


async function ContorlerGET(req,res){
	const queryString = url.parse(req.url).query
	const query = qs.parse(queryString)
	const reqUrl = url.parse(req.url).pathname

	let users = await fs.readFile(path.join(process.cwd(),"src","database",`${reqUrl}.json`),"utf8") ||"[]"
	let foods = await fs.readFile( path.join(process.cwd(),"src", 'database', 'foods.json'), 'utf8' )  || "[]"
	users = JSON.parse(users)
	foods = JSON.parse(foods)
	if(req.url == "/orders"){
		users = users.map( order => {
			order.food = foods.find( food => food.foodId == order.foodId )
			delete order.foodId
			return order
		} )
	}
	if(queryString){
		let son = users.filter(user=>user.userId == query.userId)
		return req.jsonSend(son)

	}else return req.jsonSend(users)

}



module.exports = ContorlerGET