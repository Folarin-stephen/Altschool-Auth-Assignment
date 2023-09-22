const express = require("express");
const path = require("path");
const fs = require("fs").promises
const PORT = 3003;

const app = express();

app.use(express.static('Public'));
const HomepagePath = path.join(__dirname, 'public', 'index.html')
const NotFoundPagePath = path.join(__dirname, 'public', '404.html')

const handleHomePage = async (req, res) => {
    const file = await fs.readFile(HomepagePath)

    res.status(200).sendFile(file)
}

app.get('/index.html', handleHomePage);

app.use( function (req, res) {
    res.status(401).json({ error: "Page not Found" });
})
// app.get('*', async (req, res) => {
//     const file = await fs.readFile(NotFoundPagePath)
//     res.sendFile(file)
// })
{"name":"Coco pops","price":"7000","uuid":"0e9ac2b3-d4b7-4679-b807-208235f0b78f","size":"Big"}


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})