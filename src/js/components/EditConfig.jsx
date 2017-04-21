import React from 'react';

import Button from 'muicss/lib/react/button';
import Input from 'muicss/lib/react/input';
import Form from 'muicss/lib/react/form';

import FilePicker from './FilePicker';
import bindInput from '../mixins/bindInput';
import bindFileInput from '../mixins/bindFileInput.js';

export default class EditConfig extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gitPassword: this.props.gitPassword || '',
      gitPubKeyFile: this.props.gitPubKeyFile || '',
      gitPrivateKeyFile: this.props.gitPrivateKeyFile || '',
    };

    for (const [k,v] of this.props.directories.entries()) {
      this.state[k] = v.get('path') || "";
    }
  }

  onClick(e) {
    e.preventDefault();
    this.props.onUpdateClick(this.state);
    this.props.parseDirectory();
  }

  render() {
    return <div id="edit-config">
      <h3 className="wizard-title">Config</h3>
      <Form>
        {Object.keys(this.props.directories.toJS()).map( dir => 
            <div className="dir-picker-row" key={dir}>
              <FilePicker 
                text={`Select ${dir.toUpperCase()} path`}
                fileSelected={bindFileInput(this, dir)}
                dirs={true}
              >
              </FilePicker>
              <span className="dir-name">{this.state[dir] || "No file selected."}</span>
            </div>
            )}

            <div className="dir-picker-row">
              <FilePicker files={true} text={'Select Public Key'} fileSelected={bindFileInput(this, 'gitPubKeyFile')} />
              <span className="dir-name">{this.state.gitPubKeyFile || "No file selected."}</span>
            </div>
            <div className="dir-picker-row">
              <FilePicker files={true} text={'Select Private Key'} fileSelected={bindFileInput(this, 'gitPubKeyFile')} />
              <span className="dir-name">{this.state.gitPrivateKeyFile || "No file selected."}</span>
            </div>
            <Input type="password" label="Git Password" value={this.state.gitPassword} floatingLabel={true} required={true} onChange={bindInput(this, 'gitPassword')}/>
            <div id="edit-config-update">
              <Button className="success" variant="raised" onClick={::this.onClick}>Update</Button>
            </div>
          </Form>
        </div>;
  }
}
