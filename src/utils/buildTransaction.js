import {endpoint, sendAddress, receiveAddr, gasPrice, gasLimit, chainId, networkID} from '../config/config'
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(endpoint[networkID]));

async function buildTransaction() {
  var nonce = await web3.eth.getTransactionCount(sendAddress, 'pending');
  var to = receiveAddr;
  var gasP = web3.utils.toHex(gasPrice);
  var gasL = web3.utils.toHex(gasLimit);
  var value = web3.utils.toHex(web3.utils.toWei("0.06969", "ether"));
  var cId = web3.utils.toHex(chainId[networkID]);
  var data = "";

  console.log('new transaction nonce is', nonce)

  return {
    nonce: nonce,
    to: to,
    gasPrice: gasP,
    gasLimit: gasL,
    value: value,
    chainId: cId,
    data: data
  };
}

export default buildTransaction;