import React from 'react';

import Button from 'muicss/lib/react/button';
import Radio from 'muicss/lib/react/radio';
import CancelButton from './WizardCancelButton';

export default class RemovePropertyListChangedFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onBackClick(e) {
    e.preventDefault();
    this.props.setView('removeSelectProperty');
  }

  onNextClick(e) {
    e.preventDefault();
    this.props.setView('removePropertyExecuteModifications');
  }

  propsStr() {
    return `${this.props.environments}-configs/${this.props.project}/${this.props.filename}`;
  }

  render() {
    return <div>
      <h3 className="wizard-title"><span>Changed Files</span></h3>
      <div className="wizard-info-panel">
        <h4>Your search string:</h4> <code> {this.propsStr()} </code>
      </div>
      <div className="wizard-info-panel">
        <h4>Property to be removed:</h4> <code>{ this.props.propertyName }</code>
      </div>
      <div className="wizard-info-panel">
        <h4>Files to be changed:</h4>
        {this.props.selectedFiles.map( f => 
            <div key={f.get('path')}><code>{f.get('path')}</code></div>
        )}
      </div>
      <div className="wizard-button-nav">
        <Button variant="raised" color="primary" onClick={::this.onNextClick}>Next</Button>
        <Button variant="raised" color="primary" onClick={::this.onBackClick}>Back</Button>
        <CancelButton setView={this.props.setView} targetView={'addSelectProperty'} resetWizard={this.props.resetWizard} />
      </div>
    </div>;
  }
}
