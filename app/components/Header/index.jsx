import React from 'react';
import { Navbar, Nav, Image, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import anon from '../../images/even_better_anon.png';
import history from '../../utils/history';
import logout from '../../redux/actions/logout';
import { getUser } from '../../redux/selectors/selectors';

function mapStateToProps(state) {
  const user = getUser(state);
  // component receives additionally:
  return { user };
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

class Navigationbar extends React.Component {
  logout() {
    const res = axios.get('/api/logout');
    history.push(res);
    this.props.logout();
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Navbar.Brand
              onClick={() => {
                history.push('/');
              }}
            >
              OnClickCoin!
            </Navbar.Brand>
            <Nav.Link
              onClick={() => {
                history.push('/send');
              }}
            >
              Send
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                history.push('/ico');
              }}
            >
              ICO
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                history.push('/info');
              }}
            >
              FAQ
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                history.push('/feedback');
              }}
            >
              Feedback
            </Nav.Link>
            <NavDropdown title="Data" className="nav-dropdown">
              <NavDropdown.Item
                onClick={() => {
                  history.push('/data/tokens');
                }}
              >
                tokens
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  history.push('/data/transactions');
                }}
              >
                transactions
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {' '}
            <NavDropdown
              title={
                <Image
                  roundedCircle
                  src={anon}
                  width="40"
                  height="40"
                  className="d-inline-block align-top"
                  alt="Profile"
                />
              }
              className="nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => {
                  history.push('/dashboard');
                }}
              >
                {this.props.user.username}
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  history.push('/login');
                }}
              >
                Login
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  this.logout();
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            {/* TODO: need to pad right-hand side because react-boilerplate doesn't allow to open the dropdown to the left, build custom dropdown without relying on react-bootstrap to fix */}
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          </Nav>
        </Navbar>
      </>
    );
  }
}

Navigationbar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigationbar);
