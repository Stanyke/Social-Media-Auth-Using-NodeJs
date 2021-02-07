const express = require('express')
const app = require('./index')
const appApi = require('./app')

app.get('/api/hello', (req, res) => {
    return res.send({ express: 'Hello From Express' });
});

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})