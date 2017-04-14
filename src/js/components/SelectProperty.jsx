import React from 'react';

import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

import bindInput from '../mixins/bindInput';

export default class SelectProperty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      propertyName: this.props.propertyName || '',
      environments: this.props.environments || '',
      project: this.props.project || '',
      filename: this.props.filename || '',
    };
  }

  validateRegex(regex) {
    try {
      new RegExp(regex);
    } 
    catch(e) {
      console.log(e);
      return false;
    }
    return true;
  }

  onNextClick(e) {
    e.preventDefault();
    if (!this.validateRegex(this.state.environments) || !this.validateRegex(this.state.filename)) {
      console.log('err');
      return;
    }
    this.props.matchFiles(this.state.propertyName, this.state.environments, this.state.project, this.state.filename);
    this.props.setView(this.props.nextView);
  }

  render() {
    return <div className="wizard-info-panel">
      <Form>
        <Input label="Property Name" value={this.state.propertyName} floatingLabel={true} required={true} onChange={bindInput(this, 'propertyName')}/>
        <Input label="Environments Regex" value={this.state.environments} floatingLabel={true} required={true} onChange={bindInput(this, 'environments')}/>
        <Input label="Project" value={this.state.project} floatingLabel={true} required={true} onChange={bindInput(this, 'project')}/>
        <Input label="Filename Regex" value={this.state.filename} floatingLabel={true} required={true} onChange={bindInput(this, 'filename')}/>
        <div className="wizard-button-nav">
          <Button variant="raised" color="primary" onClick={::this.onNextClick}>Next</Button>
        </div>
      </Form>
    </div>;
  }
}
