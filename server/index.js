import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDb from './mongodb/connect.js'
import post from './routes/post.js'
import aiimg from './routes/aiimg.js'
import Contact from '././mongodb/models/contact.js'


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({limit:'50mb'}))

app.use('/api/v1/posts',post)
app.use('/api/v1/aiimg',aiimg)

app.get('/',(req,res) => {
res.send('hehehe')
})

app.post('/api/contact', async (req,res) => {

    try {
        const data = req.body
        const insertCon = await Contact.create(data)
        console.log(insertCon)
        res.status(201).json({ data:data})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}





const startServer = async() => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port,() => {
            console.log(`listening on port ${port}`)
            })
    } catch (error) {
        console.log(error)
    }
}

startServer()