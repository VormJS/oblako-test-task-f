const express = require('express');

const app = express();

app.use(express.static('./dist/oblako-test-task-f'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/oblako-test-task-f/'}),
);

app.listen(process.env.PORT || 8080);