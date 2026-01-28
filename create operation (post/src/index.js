const express = require("express")
const mongoose = require("mongoose")
const user = require('./model/user.model')

const app = express()

app.use(express.json())
const port = 6767
mongoose.connect('mongodb://127.0.0.1:27017/userDB')
    .then(() => {
        console.log("Congrats!! ,connected to DB");
    }).catch((err) => {
        console.log(err)
    })

app.get('/', (req, res) => {
    res.send("Hello Everyone")
})


app.post("/api/v1/users", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Missing required fields: name, email, and password are required."
            });
        }


        let newUser = await user.create({ name, email, password })
        res.status(201).json({ message: "sucees!", user: newUser })


        
        } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

// app.listen(port, ()=>{
// console.log(`server is runing on https://localhost:${port}`);
// })
app.listen(6767)