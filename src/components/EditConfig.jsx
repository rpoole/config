import React from 'react';

import DirectoryPicker from './DirectoryPicker';
import Button from 'muicss/lib/react/button';

export default class EditConfig extends React.Component {
  render() {
    if (this.props.configOpen) {
      return <div id="edit-config">
        {Object.keys(this.props.directoryPaths).map( dir => 
          <div key={dir}>
            <DirectoryPicker 
              dirType={dir}
              text={`Select ${dir.toUpperCase()} path`}
              fileSelected={this.props.setDirectories}
            >
            </DirectoryPicker>
            <span className="dir-name">{this.props.directoryPaths[dir]}</span>
          </div>
        )}
        <div id="edit-config-update">
          <Button variant="raised" color="primary">Update</Button>
        </div>
      </div>;
    } else {
      return null;
    }
  }
}
