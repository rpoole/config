import React from 'react';
import {remote} from 'electron';

import Button from 'muicss/lib/react/button';


export default class FilePicker extends React.Component {
  onClick(e) {
    e.preventDefault();
    let properties = ['showHiddenFiles'];

    if (this.props.dirs) {
      properties.push('openDirectory');
    }

    if (this.props.files) {
      properties.push('openFile');
    }

    remote.dialog.showOpenDialog({properties: properties}, (paths) => {
      if (paths && paths.length > 0) {
        this.props.fileSelected(paths[0] + '');
      }
    });
  }

  render() {
    return <Button color="primary" variant="raised" onClick={::this.onClick}>
        {this.props.text}
      </Button>
  }
}
