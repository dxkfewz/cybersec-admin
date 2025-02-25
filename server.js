const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const prisma = new PrismaClient();

app.get('/', (req, res) => {
    res.send('Hello Word');
});

app.get('/user', async (req, res) => {
    const data = await prisma.user.findMany();
    res.json({
        message: 'ok',
        data: data
    });
});

app.post('/user',async (req, res) => {
    console.log(req.body);
    const response = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password
        }
    })
    res.json({
        message: 'add data successfully'
    });
});

app.listen(3000,() => {
    console.log('server is running on port 3000');
});