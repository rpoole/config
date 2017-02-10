import React from 'react';

import Button from 'muicss/lib/react/button';

export default class TitleBar extends React.Component {
  onClick(e) {
    e.preventDefault();
    this.props.toggleConfig();
  }

  render() {
    return <div id="title-bar">
      <h1 id="title"> SX Config App </h1>
      <Button > 
        Add New Property
      </Button>
      <Button > 
        Remove Property
      </Button>
      <Button > 
        Edit Property
      </Button>
      <Button onClick={this.onClick.bind(this)}> 
        Edit Config 
      </Button>
    </div>
  }
}
