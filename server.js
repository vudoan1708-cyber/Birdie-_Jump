require('dotenv').config();

const path = require('path');
const express = require('express');
const http = require('http');
const fallback = require('express-history-api-fallback');
const createConnection = require('./data/connection');

const root = path.join(__dirname, './public');
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

server.listen(port, () => { console.log(`listening on port: ${port}`) });
app.use(express.json({ limit: '1mb' }));

// const accounts_db = createConnection('accounts');
// const score1_db = createConnection('score1');
// const score2_db = createConnection('score2');

// app.post('/api/score', async function (request, response) {
//     const data = request.body;
//     const found = await score1_db.find({ account_name: data.account_name });

//     if (found?.length === 0) {
//         await score1_db.insert(data);
//         response.json(data);
//         return;
//     }
//     await score1_db.update({ account_name: data.account_name }, { $set: data });
//     response.json(data);
// });

// app.get('/api/score', async function (_, response) {
//     try {
//         const data = await score1_db.find({});
//         response.json(data);
//     } catch (err) {
//         console.error(err);
//         response.end();
//     }
// });

// app.post('/api/score2', async function (request, response) {
//     const data = request.body;
//     const found = await score2_db.find({ account_name: data.account_name });

//     if (found?.length === 0) {
//         await score2_db.insert(data);
//         response.json(data);
//         return;
//     }
//     await score2_db.update({ account_name: data.account_name }, { $set: data });
//     response.json(data);
// });

// app.get('/api/score2', async function (_, response) {
//     try {
//         const data = await score2_db.find({}, { sort: { time: -1 } });
//         response.json(data);
//     } catch (err) {
//         console.error(err);
//         response.end();
//     }
// });

// app.post('/api/acc', async function (request, response) {
//     const data = request.body;

//     await accounts_db.insert(data);
//     response.json(data);
// });

// app.get('/api/acc', async function (_, response) {
//     try {
//         const data = await accounts_db.find({});
//         response.json(data)
//     } catch (err) {
//         console.error(err);
//         response.end();
//     }
// });

app.use(express.static(root));
// fallback
app.use(fallback('index.html', { root }));
