import React, { PropTypes } from 'react';
import Navbar from '../navbar';
import './style.css';

const App = (props) => (
  <div>
    <Navbar />
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
