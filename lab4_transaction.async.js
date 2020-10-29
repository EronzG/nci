var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/[your infura key here]')

const account1 = '0x...' // Your account address 1
const account2 = '0x...' // Your account address 2

const privateKey1 = Buffer.from('...', 'hex')
const privateKey2 = Buffer.from('...', 'hex')


const sendTransaction = async(raw) => {
  return await web3.eth.sendSignedTransaction(raw)
}

const transferFunds = async(account1, account2, amount) => {

  let txCount = await getTransactionCount(account1)

  console.log("txCount returned: " + txCount)

  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(21000), // reduced gas limit because of ropsten issues
    gasPrice: web3.utils.toHex(web3.utils.toWei('75', 'gwei')),
    to: account2,
    value:    web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
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

const transfer = async() => {
  await transferFunds(account1, account2, 0.11)
}

transfer()

