import {
  endpoint,
  chainId
} from "../config/config";
const Web3 = require("web3");

async function buildTransaction(sendAccID, receiveAccID, gasPrice, gasLimit, sendAmount) {
  var netID = document.getElementById("network");
  var network = netID.options[netID.selectedIndex].value;
  const web3 = new Web3(new Web3.providers.HttpProvider(endpoint[network]));

  var nonce = await web3.eth.getTransactionCount(sendAccID, "pending");
  var to = receiveAccID;
  var gasP = web3.utils.toHex(gasPrice);
  var gasL = web3.utils.toHex(gasLimit);
  var value = web3.utils.toHex(web3.utils.toWei(sendAmount, "ether"));
  var cId = web3.utils.toHex(chainId[network]);
  var data = "";

  console.log("new transaction nonce is", nonce);

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
