import React from 'react';

import DirectoryPicker from './DirectoryPicker';
import Button from 'muicss/lib/react/button';

export default class EditConfig extends React.Component {
  onClick(e) {
    e.preventDefault();

    document.querySelectorAll(".progress-bar > span").forEach( el => {
      if (el.style.width) {
        el.style.width = (parseFloat(el.style.width) + 10) + "%";
      } else {
        el.style.width = "10%";
      }

      if (parseFloat(el.style.width) === 100) {
        el.innerHTML = 'Parsed!';
      }
    });
  }

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
            <span className="dir-name">{this.props.directoryPaths[dir] || "No file selected."}</span>
            <div className="parsing-indicator progress-bar">
              <span></span>
            </div>
          </div>
        )}
        <div id="edit-config-update">
          <Button variant="raised" color="primary" onClick={this.onClick.bind(this)}>Update</Button>
        </div>
      </div>;
    } else {
      return null;
    }
  }
}
