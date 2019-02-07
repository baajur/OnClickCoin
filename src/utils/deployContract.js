import { endpoint, sendAddress, networkID, gasPrice } from "../config/config";

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(endpoint[networkID]));

const bytecode =
  "608060405234801561001057600080fd5b506040516020806103798339810180604052602081101561003057600080fd5b8101908080519060200190929190505050806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550506102e5806100946000396000f3fe608060405260043610610046576000357c01000000000000000000000000000000000000000000000000000000009004806370a082311461004b578063a9059cbb146100b0575b600080fd5b34801561005757600080fd5b5061009a6004803603602081101561006e57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610123565b6040518082815260200191505060405180910390f35b3480156100bc57600080fd5b50610109600480360360408110156100d357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061013b565b604051808215151515815260200191505060405180910390f35b60006020528060005260406000206000915090505481565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561018a57600080fd5b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054011015151561021757600080fd5b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550600190509291505056fea165627a7a72305820655dd0331dd850dcfb60f9016d4a5af432c9ae302436d3dfb8adba737bb98a040029";

const abi = [
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        name: "initialSupply",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  }
];

const deployContract = async () => {
  console.log("deploying contract!");

  const result = await new web3.eth.Contract(abi)
    .deploy({
      data: "0x" + bytecode,
      arguments: [5000000000]
    })
    .send({ gas: "1000000", from: sendAddress});

  console.log("Contract Deployed to : ", result.options.address);
};

export default deployContract;

// async function deployContract() {

//   const myContract = await new web3.eth.Contract([
//     {
//       constant: true,
//       inputs: [
//         {
//           name: "",
//           type: "address"
//         }
//       ],
//       name: "balanceOf",
//       outputs: [
//         {
//           name: "",
//           type: "uint256"
//         }
//       ],
//       payable: false,
//       stateMutability: "view",
//       type: "function"
//     },
//     {
//       constant: false,
//       inputs: [
//         {
//           name: "_to",
//           type: "address"
//         },
//         {
//           name: "_value",
//           type: "uint256"
//         }
//       ],
//       name: "transfer",
//       outputs: [
//         {
//           name: "success",
//           type: "bool"
//         }
//       ],
//       payable: false,
//       stateMutability: "nonpayable",
//       type: "function"
//     },
//     {
//       inputs: [
//         {
//           name: "initialSupply",
//           type: "uint256"
//         }
//       ],
//       payable: false,
//       stateMutability: "nonpayable",
//       type: "constructor"
//     }
//   ])
//     .deploy({
//       data: bytecode,
//       arguments: [550000]
//     })
//     .send({ from: sendAddress, gas: "1000000" });

//   console.log("contract deployed to", myContract.options.address);
//   return;
// }

// export default deployContract;
