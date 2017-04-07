import React from 'react';
import {remote} from 'electron';

import Button from 'muicss/lib/react/button';


export default class DirectoryPicker extends React.Component {
  onClick(e) {
    e.preventDefault();
    remote.dialog.showOpenDialog({properties: ['openDirectory']}, (paths) => {
      if (paths && paths.length > 0) {
        console.log(this);
        this.props.fileSelected(this.props.dirType, paths[0] + '');
      }
    });
  }

  render() {
    return <Button color="primary" variant="raised" onClick={::this.onClick}>
        {this.props.text}
      </Button>
  }
}
