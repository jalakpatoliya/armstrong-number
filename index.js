const express = require('express');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const checkArmStrong = require('./armstrong');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

/**
 * route for calculation
 */
app.post('/api/calc', async (req, res) => {
    try {
        const input = req.body.input;
        const data = await checkArmStrong(input)

        res.status(200).json({ status: "success", data })
    } catch (error) {
        res.status(500).json({ status: "fail", error: error.message })
    }
})

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'))
})


http.createServer(app).listen(PORT, console.log(`server started at port:${PORT}`));