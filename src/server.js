const Express = require("./lib/router.js")
const os = require("os")
const host = (os.networkInterfaces()["wlp3s0"][0].address)

const path = require("path")
const fs = require("fs/promises")
const PORT = process.env.PORT || 2000
const app = new Express()


const allGests = require('./controller/allGests.js')
const orederPost = require('./controller/orederPost.js')
const userPost = require('./controller/userPost.js')

app.get("/users",allGests)
app.get("/foods",allGests)
app.get("/orders",allGests)



app.post("/users",userPost)
app.post("/orders",orederPost)


app.listen(PORT,()=>console.log(`Connect server http://${host}:${PORT}.......`))









