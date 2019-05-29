import React, { Component } from 'react';
import deployContract from '../../../server/api/deployContract';
import getPermission from '../../../server/api/getPermission';
import './DeployButton.css';

/*
This class creates the DeployButton Component
*/

class DeployButton extends Component {
  static async handleClick() {
    /*
    fetch constructor information from the contract form
    contract form is defined in server/api/ContractForm
    */
    const symbol = document.getElementById('symbol').value;
    const name = document.getElementById('name').value;
    const decimals = document.getElementById('decimals').value;
    const supply = document.getElementById('supply').value;

    // gets permission from metamask to access accounts and other info
    await getPermission();

    deployContract(symbol, name, decimals, supply);
  }

  render() {
    return (
      <button
        type="button"
        className="ContractButton"
        onClick={this.handleClick.bind(this)}
      >
        Click here to create your coin!
      </button>
    );
  }
}

export default DeployButton;
