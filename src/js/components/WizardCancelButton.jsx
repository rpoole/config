import React from 'react';

import Button from 'muicss/lib/react/button';


export default class CancelButton extends React.Component {
  onClick(e) {
    e.preventDefault();
    this.props.resetWizard();
    this.props.setView(this.props.targetView);
  }

  render() {
    return <Button color="danger" variant="raised" onClick={::this.onClick}>
        Cancel
      </Button>
  }
}

