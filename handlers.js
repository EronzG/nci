let contract = require('./lab4_contract.async.js')
let method = require('./lab4_method.async.js')

const express = require('express')
const { METHODS } = require('http')
const app = express()
app.use(express.json())

app.get('/', async (req,res) => {
  res.send(await contract.totalSupply())
})

app.get('/supply', async (req,res) => {
  res.send(await contract.totalSupply())
})



// POST to the web server
// execute the transfer function
// pass in
// - account 1
// - account 2
// - amount

app.post('/transfer', async (req, res) => {
  var account_from = req.body.account_from;
  var account_to = req.body.account_to;
  var amount = req.body.amount;

  res.send(await method.transferFunds(account_from, account_to, amount));
})

app.get('/balance?accountid', async (req, res) => {
  res.send( await method.getBalanceOf())
})

const port = 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//curl -XPOST http://localhost:8080/transfer -H 'content-type: application/json' -d '{"account_from": "0x9b14eeE99808BaB2a4C6492D37B4D771F75b7631","account_to": "0xe8a43eFC2CE385AbA7465101262b03B0d2489c43","amount": "1000000000000"}'


//curl -XPOST http://localhost:8080/transfer -H 'content-type: application/json' -d '{"account_from": "0x9b14eeE99808BaB2a4C6492D37B4D771F75b7631","account_to": "0x9Ca57f358dC7871C471714Aaa828fFE38f60b194","amount": "1000000000000"}'

//{account: [{account1, account2, account3, account4, account5}]}

//send json array as postdata
// accept post data
// loop through json array, put data in local array
// loop through local array, execute transferFunds for each element of the array
// googling json array, node.js array, node.js loops

