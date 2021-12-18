const path = require("path")
const fs = require("fs/promises")
const url = require('url')
const qs = require('querystring')


async function ContorlerPOST(req,res){
	let data = ""
	req.on("data",buffer=>data+=buffer)
	req.on("end",async ()=>{
		const newdata = data?JSON.parse(data):{}

			const {username,contact}= newdata
			if(!username||!contact) return res.end("Invalic keys!")
			if(!(typeof username === 'string') || username.length > 50) return res.end('Invalid username!')
			if(!(typeof contact === 'string') || !(contact.length == 12)) return res.end('Invalid contact!')

			let baza = await fs.readFile(path.join(process.cwd(),"src","database",`${req.url}.json`),"utf8") || "[]"
			baza = JSON.parse(baza)
			let obj = {userId:baza.length+1,username,contact}

			baza.push(obj)
			await fs.writeFile(path.join(process.cwd(),"src","database",`${req.url}.json`),JSON.stringify(baza,null,4))
		
			return req.jsonSend(obj)
		

	})
}


module.exports = ContorlerPOST
