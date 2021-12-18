const path = require("path")
const fs = require("fs/promises")
const url = require('url')
const qs = require('querystring')


async function ContorlerPOST(req,res){
	let data = ""
	req.on("data",buffer=>data+=buffer)
	req.on("end",async ()=>{
		const newdata = data?JSON.parse(data):{}

			const {userId,foodId,count}= newdata

			if(!userId||!foodId||!count) return res.end("Invalic keys!")
			if(!(typeof userId === 'number')) return res.end('Invalid userId!')
			if(!(typeof foodId === 'number')) return res.end('Invalid foodId!')
			if(!(typeof count === 'number')) return res.end('Invalid count!')

			let baza = await fs.readFile(path.join(process.cwd(),"src","database",`${req.url}.json`),"utf8") || "[]"
			baza = JSON.parse(baza)

			let double = baza.find(el=>el.userId==userId && el.foodId == foodId)
			let obj = {}
			if(double){
				double.count+=count
				obj=double
			}else{
				obj = {orderId:baza.length+1,userId,foodId,count}
				baza.push(obj)

			}

			await fs.writeFile(path.join(process.cwd(),"src","database",`${req.url}.json`),JSON.stringify(baza,null,4))
			return req.jsonSend(obj)


	})
}


module.exports = ContorlerPOST