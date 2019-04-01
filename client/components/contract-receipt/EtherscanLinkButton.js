import React, { Component } from "react";

/*
This class creates the EtherscanLinkButton Component
*/

class EtherscanLinkButton extends Component {
  handleClick(event) {

    /*
    Given URL is of the form pathame/receipt/: {network name} + "?" + {accountID}
    TODO: Clem: form?
    TODO: find better way to pass the information. Security issues maybe?? (accountID accessible to attacker if in the URL?)
    */

    var netinfo = String(window.location).split("netname:")[1];
    const netname = netinfo.split("?")[0];

    var addrinfo = String(window.location).split("address:")[1];
    const accID = addrinfo.split("?")[0];

    const link = "https://" + netname + ".etherscan.io/address/" + accID;
    
    //open the link in a new tab
    window.open(link)
  }

  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        Find your transaction receipt!
      </button>
    );
  }
}

export default EtherscanLinkButton;
