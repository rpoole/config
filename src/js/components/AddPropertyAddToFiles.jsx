import React from 'react';

import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import CancelButton from './WizardCancelButton';

import bindInput from '../mixins/bindInput';

export default class AddPropertyAddToFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    const method = this.pd().method;
    this.pd().selectedFiles.forEach( f => {
      const val = this._findFileForPath(f.path).value || '';

      if (method === 'applyToDifferentFiles') {
        this.state[f.path] = val;
      } else if (method === 'applyToAllFilesPerEnv') {
        if (!this.state.hasOwnProperty(f.env)) {
          this.state[f.env] = val;
        }
      } else {
        if (!this.state.hasOwnProperty('all')) {
          this.state['all'] = val;
        }
      }
    });
  }

  _findFileForPath(path) {
    return this.apd().fileModifications.filter( fm => fm.path === path)[0] || {};
  }

  onBackClick(e) {
    e.preventDefault();
    this.props.setView('addPropertyListChangedFiles');
  }

  onNextClick(e) {
    e.preventDefault();
    const method = this.pd().method;
    let modifications = [];

    this.pd().selectedFiles.forEach( f => {
      let obj = {
        path: f.path,
      };

      if (method === 'applyToDifferentFiles') {
        obj.value = this.state[f.path];
      } else if (method === 'applyToAllFilesPerEnv') {
        obj.value = this.state[f.env];
      } else {
        obj.value = this.state['all'];
      }

      modifications.push(obj);
    });

    this.props.setFileModifications(modifications);
    this.props.setView('addPropertyExecuteModifications');
  }

  pd() {
    return this.props.propertyData.toJS();
  }

  apd() {
    return this.props.addPropertyData.toJS();
  }

  renderPropertyFields() {
    const method = this.pd().method;

    switch(method) {
      case 'applyToAllFiles':
        return <div>
          <h5>All Files</h5>
          {this.pd().selectedFiles.map( file => 
              <div key={file.path}>
                <div>
                  <code>{file.path}</code>
                </div>
              </div>
              )}
          <Input value={this.state['all']} hint={'Property Value'} value={this.state['all']} required={true} onChange={bindInput(this, 'all')}/>
        </div>
      case 'applyToAllFilesPerEnv':
        let envGroups = {};
        let files = this.pd().selectedFiles;

        files.forEach( f => {
          let env = f.env;
          if (!envGroups[env]) {
            envGroups[env] = [];
          }
          envGroups[env].push(f.path);
        });

        let groups = [];
        for (let [env, group] of Object.entries(envGroups)) {
          groups.push(group);
        }

        return <div>
          {Object.keys(envGroups).map( key => 
              <div key={key}>
                <h5>{key}</h5>
                {envGroups[key].map( path =>
                    <div key={path}><code>{path}</code></div>
                    )}
                <Input value={this.state[key]} hint={'Property Value'} value={this.state[key]} required={true} onChange={bindInput(this, key)}/>
              </div>
              )}
            </div>
      case 'applyToDifferentFiles':
        return <div>
          {this.pd().selectedFiles.map( file => 
              <div key={file.path}>
                <div>
                  <code>{file.path}</code>
                </div>
                <Input value={this.state[file.path]} hint={'Property Value'} value={this.state[file.path]} required={true} onChange={bindInput(this, file.path)}/>
              </div>
              )}
            </div>
    }
  }

  render() {
    return <div>
      <h3 className="wizard-title">Enter Property Values</h3>
      <div className="wizard-info-panel">
        <h4 style={{display: 'inline-block'}}>Property: </h4> <code> {this.pd().propertyName} </code>
      </div>
      <Form className="wizard-info-panel">
        {this.renderPropertyFields()}

        <div className="wizard-button-nav">
          <Button variant="raised" className="success" onClick={::this.onNextClick}>Execute</Button>
          <Button variant="raised" color="primary" onClick={::this.onBackClick}>Back</Button>
          <CancelButton setView={this.props.setView} targetView={'addSelectProperty'} resetWizard={this.props.resetWizard} />
        </div>
      </Form>
    </div>
  }
}
