import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import ky from 'ky';
import DeployICOButton from './DeployICOButton';
import { abiERC20 } from '../../../contracts/erc20';
import loading from '../../images/simple_loading.gif';
const Web3 = require('web3');

/*
This class creates the form to define the constructor of the new ERC-20 token
Ticker Symbol refers to the abbreviation of the coin
Name refers to the name of the coin
Decimals refers to if the coin is atomic and if not to how many decimals it should be divisible.
Supply refers to the initial supply of the coin
*/

/*
This class creates the form to define the constructor of the new ERC-20 token
Ticker Symbol refers to the abbreviation of the coin
Name refers to the name of the coin
Decimals refers to if the coin is atomic and if not to how many decimals it should be divisible.
Supply refers to the initial supply of the coin
*/



const Deploying = () => (
  <div>
    <Card>
      <Card.Body>
        Your ICO is being deployed on the blockchain. Please wait about 15
        seconds until the transaction is confirmed.
      </Card.Body>
    </Card>
    <Image src={loading} style={{ zIndex: '100' }} />
  </div> 
);

class ICOForm extends React.Component {
  constructor() {
    super();
    this.state = {
      addressSet: false,
      rateSet: false,
      supply: -1,
      name: '',
      symbol: '',
      _isMounted: false,
      decimals: -1,
      rate: -1,
      totalRaised: -1,
      isDeploying: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.Display = this.Display.bind(this);
    this.DisplayTotal = this.DisplayTotal.bind(this);
    this.render = this.render.bind(this);
    this.componentWillUnmount.bind(this);

    this.handleChangeRate = this.handleChangeRate.bind(this);
  }

  Display() {
    return (
      <Container>
        <h3>Name {this.state.name}</h3>
        <h3>Symbol {this.state.symbol}</h3>
        <h3>Supply {this.state.supply}</h3>
        <h3>Decimals {this.state.decimals}</h3>
        <Badge variant="success">Success</Badge>
      </Container>
    );
  }

  DisplayTotal() {
    return (
      <Container>
        <h3>
          If completed successfully you will raise {this.state.totalRaised} $
        </h3>
        <Form>
          <Form.Group>
            <Form.Label>Address where funds should go: </Form.Label>
            <Form.Control type="text" id="wallet" placeholder="0xbadbabe" />
          </Form.Group>
        </Form>
        <Badge variant="success">Success</Badge>
      </Container>
    ); 
  }

  async handleChange() {
    this.setState(prevState => ({ addressSet: !prevState.addressSet }));

    /*
        fetch constructor information from the contract form
        contract form is defined in server/api/ContractForm
        */

    const contractAddress = document.getElementById('ierc20').value;
    if (typeof web3 !== 'undefined') {
      window.web3 = new Web3(window.ethereum);
      const contractInstance = new web3.eth.Contract(abiERC20, contractAddress);
      const foundSupply = await contractInstance.methods.totalSupply().call();
      const foundName = await contractInstance.methods.name().call();
      const foundSymbol = await contractInstance.methods.symbol().call();
      const foundDecimals = await contractInstance.methods.decimals().call();
      const correctSupply = foundSupply / Math.pow(10, foundDecimals);
      this.setState({ supply: correctSupply });
      this.setState({ name: foundName });
      this.setState({ symbol: foundSymbol });
      this.setState({ decimals: foundDecimals });
    }
    this.render();
    // gets permission from metamask to access accountsand other info
  }

  async handleChangeRate() {
    this.setState({ rateSet: true });
    const dollarsInput = document.getElementById('rate').value;
    const res = await ky
      .get('https://api.cryptonator.com/api/ticker/eth-usd')
      .json();
    const oneUsdInWei = Math.pow(10, 18) / res.ticker.price;
    const rate =
      Math.pow(10, this.state.decimals) / (oneUsdInWei * dollarsInput);
    const amountRaisedTotal = dollarsInput * this.state.supply;
    this.setState({ totalRaised: amountRaisedTotal });
  }

  async componentDidMount() {
    this._isMounted = true;
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  handleToUpdate = () => {
    this.setState({ isDeploying: true });
  };

  render() {
    return (
      <div className="form">
        {this.state.isDeploying && <Deploying />}
        {!this.state.isDeploying && (
          <>
          <Row>
          <Col>
            <Container>
              <Card style={{ width: '30rem', background: 'white' }}>
                <Card.Header as="h5">
                  1st step: <a href="/">Create your coin</a> and save its
                  contract address below
                </Card.Header>
                <Form>
                  <Form.Group>
                    <Form.Label>Your coin address</Form.Label>
                    <Form.Control
                      type="text"
                      id="ierc20"
                      placeholder="0xc0ff33"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form>
                {this.state.addressSet && <this.Display />}
              </Card>
            </Container>
          </Col>
          <Col>
            <Container>
              <Card style={{ width: '30rem', background: 'white' }}>
                <Card.Header as="h5">
                  2nd step: What should be the price of your token in dollars?{' '}
                </Card.Header>
                <Form>
                  <Form.Group>
                    <Form.Label />
                    <Form.Control
                      type="number"
                      id="rate"
                      defaultValue="0"
                      onChange={this.handleChangeRate}
                    />
                  </Form.Group>
                </Form>
                {this.state.rateSet && <this.DisplayTotal />}
              </Card>
            </Container>
          </Col>
          <Col />
        </Row>
        <br />
        <br />
        <br />
        <DeployICOButton handleToUpdate={this.handleToUpdate}/>
        </>
        )}
      </div>
    );
  }
}

export default ICOForm;
