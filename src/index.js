import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home';
import DeployButton from './components/deployButton'

ReactDOM.render(<Home />, document.getElementById('home'));
ReactDOM.render(<DeployButton />, document.getElementById('deployButton'));
