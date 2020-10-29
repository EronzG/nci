const express = require('express')
let contract = require('./lab4_contract.async.js')
const app = express()

app.use(express.json())

app.get('/', (req,res) => {
  res.send(contract.totalSupply())
})

app.get('/supply', async (req,res) => {
  res.send(await contract.totalSupply())
})

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
