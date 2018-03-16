import React from 'react';
import View from './components/View.jsx'

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
