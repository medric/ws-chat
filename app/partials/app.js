import React, { PropTypes, Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render () {
    return (
       <div className="page__container">
           <div id="app" className="page__container-view">
           </div>
       </div>
     )
  }
}

export default App;
