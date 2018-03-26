import React from 'react';
import {View, Header} from './components'
import './styles/styles.css';

export default class App extends React.Component {
  render() {
    const style = {
			width: '100%',
			height: '100%'
		};
    return (
      <div style={style}>
        <View />
      </div>);
  }
}
