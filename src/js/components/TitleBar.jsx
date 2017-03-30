import React from 'react';

import Button from 'muicss/lib/react/button';

export default class TitleBar extends React.Component {
  toggleConfig(e) {
    e.preventDefault();
    this.props.setView('editConfig');
  }

  toggleAdd(e) {
    e.preventDefault();
    this.props.setView('addSelectProperty');
  }

  toggleRemove(e) {
    e.preventDefault();
    this.props.setView('removeSelectProperty');
  }

  render() {
    return <div id="title-bar">
      <h1 id="title"> SX Config Manager </h1>
      <Button onClick={::this.toggleAdd}> 
        Add New Property
      </Button>
      <Button onClick={::this.toggleRemove}> 
        Remove Property
      </Button>
      <Button > 
        Edit Property
      </Button>
      <Button onClick={::this.toggleConfig}> 
        Edit Config 
      </Button>
    </div>
  }
}
