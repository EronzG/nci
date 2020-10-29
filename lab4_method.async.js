const Web3 = require('web3')
var Tx = require('ethereumjs-tx').Transaction

const web3 = new Web3('https://ropsten.infura.io/v3/[your infura key here]')

const account1 = '0x...' // Your account address 1
const account2 = '0x..' // Your account address 2

const privateKey1 = Buffer.from('...', 'hex')
const privateKey2 = Buffer.from('...', 'hex')

// Read the deployed contract - get the addresss from Etherscan
const contractAddress = '0x485fa61ca54f128c4b31cc0511d1b5128f668045'
const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]

const contract = new web3.eth.Contract(contractABI, contractAddress)


const getTransactionCount = async(account) => {
  return await web3.eth.getTransactionCount(account)
}

const sendTransaction = async(raw) => {
  return await web3.eth.sendSignedTransaction(raw)
}
const transferFunds = async(account1, account2, amount) => {

  let txCount = await getTransactionCount(account1)

  console.log("txCount returned: " + txCount)

  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(30000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei('50', 'gwei')),
    to: contractAddress,
    data: contract.methods.transfer(account2, amount).encodeABI()
  }

  const tx = new Tx(txObject, {chain:'ropsten', hardfork: 'petersburg'})
  tx.sign(privateKey1)
  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  console.log("about to send transaction")
  let txHash = await sendTransaction(raw)
  console.log("err: " + txHash.err)
  console.log("txHash: " + txHash.txHash)
}

// async methods
const getBalanceOf = async(account) => {
  let balanceOf = await contract.methods.balanceOf(account).call()
  return "balanceOf: " + balanceOf
}

const go = async() => {
  console.log(await getBalanceOf(account1))
  console.log(await getBalanceOf(account2))
  await transferFunds(account1, account2, 10)
}

go()


