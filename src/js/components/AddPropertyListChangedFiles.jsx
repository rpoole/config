import React from 'react';

import Button from 'muicss/lib/react/button';
import Radio from 'muicss/lib/react/radio';
import CancelButton from './WizardCancelButton';

export default class AddPropertyListChangedFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      method: this.pd().method || 'applyToAllFiles',
    };
  }
  onBackClick(e) {
    e.preventDefault();
    this.props.setView('addSelectProperty');
  }

  onNextClick(e) {
    e.preventDefault();
    this.props.setPropMethod(this.state.method);
    this.props.setFileModifications([]);
    this.props.setView('addPropertyAddToFiles');
  }

  onRadioChange(e) {
    this.setState({method: e.target.value});
  }

  pd() {
    return this.props.propertyData.toJS();
  }

  propsStr() {
    return `${this.pd().environments}-configs/${this.pd().project}/${this.pd().filename}`;
  }

  render() {
    return <div>
      <h3 className="wizard-title"><span>Changed Files</span></h3>
      <div className="wizard-info-panel">
        <h4>Your search string:</h4> <code> {this.propsStr()} </code>
      </div>
      <div className="wizard-info-panel">
        <h4>Property to be added:</h4> <code>{ this.pd().propertyName }</code>
      </div>
      <div className="wizard-info-panel">
        <h4>Files to be changed:</h4>
        {this.pd().selectedFiles.map( f => 
            <div key={f.path}><code>{f.path}</code></div>
        )}
      </div>
      <div className="wizard-info-panel">
        <h4>Add this property as:</h4>
      </div>
      <div onChange={::this.onRadioChange}>
        <Radio name="addMethod" value="applyToAllFiles" label="Same property for every file" defaultChecked={this.state.method === 'applyToAllFiles'} />
        <Radio name="addMethod" value="applyToAllFilesPerEnv" label="Same property for every file in same environment" defaultChecked={this.state.method === 'applyToAllFilesPerEnv'}/>
        <Radio name="addMethod" value="applyToDifferentFiles" label="Different property for every file" defaultChecked={this.state.method === 'applyToDifferentFiles'}/>
      </div>

      <div className="wizard-button-nav">
        <Button variant="raised" color="primary" onClick={::this.onNextClick}>Next</Button>
        <Button variant="raised" color="primary" onClick={::this.onBackClick}>Back</Button>
        <CancelButton setView={this.props.setView} targetView={'addSelectProperty'} resetWizard={this.props.resetWizard} />
      </div>
    </div>;
  }
}
