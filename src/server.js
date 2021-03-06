const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http');
const server = http.createServer(app);
const Datastore = require('nedb');
const database = new Datastore('database/score.db');
const database2 = new Datastore('database/score2.db');
const acc = new Datastore('database/acc.db');
database.loadDatabase();
database2.loadDatabase();
acc.loadDatabase();

server.listen(port, () => { console.log('listening at port: ' + port) });
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.post('/score/', function (request, response) {

    const data = request.body;

    database.insert(data);
    response.json(data);
})

app.get('/score/', function (request, response) {
    database.find({}).sort({ score: -1 }).exec((err, data) => {
        if (err) {
            console.error(err);
            response.end();
            return;
        } else response.json(data);
    });
});

app.post('/score2/', function (request, response) {

    const data = request.body;

    database2.insert(data);
    response.json(data);
})

app.get('/score2/', function (request, response) {
    database2.find({}).sort({ time: -1 }).exec((err, data) => {
        if (err) {
            console.error(err);
            response.end();
            return;
        } else response.json(data);
    });
});

app.post('/acc/', function(request, response) {

    const data = request.body;

    acc.insert(data);
    response.json(data);
})

app.get('/acc/', function(request, response) {
    acc.find({}).exec((err, data) => {
        if (err) {
            console.error(err);
            response.end();
            return;
        } else response.json(data);
    })
})