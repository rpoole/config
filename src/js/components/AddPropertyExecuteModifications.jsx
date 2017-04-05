import React from 'react';

import Button from 'muicss/lib/react/button';
import Radio from 'muicss/lib/react/radio';

export default class AddPropertyExecuteModifications extends React.Component {
  componentDidMount() {
    this.apd().fileModifications.forEach( m => {
      this.props.executeFileModification(m, this.pd().propertyName);
    });
  }

  onBackClick(e) {
    e.preventDefault();
    this.props.setFileModifications(this.props.addPropertyData.get('finishedFileModifications'));
    this.props.setView('addPropertyAddToFiles');
  }

  onDoneClick(e) {
    e.preventDefault();
    this.props.resetWizard();
    this.props.setView('addSelectProperty');
  }

  pd() {
    return this.props.propertyData.toJS();
  }

  apd() {
    return this.props.addPropertyData.toJS();
  }

  render() {
    return <div>
      <h3 className="wizard-title">Executing modifications</h3>
      <div className="wizard-info-panel executing-panel">
        <div>
          <h4>Queued:</h4>
        </div>
        {this.apd().fileModifications.map( fm =>
            <div key={fm.path}>
              <code>{fm.path}:{fm.value}</code>
              <br/>
            </div>
            )}
      </div>
      <div className="wizard-info-panel executing-panel">
        <div>
          <h4>Finished:</h4>
        </div>
        {this.apd().finishedFileModifications.map( ffm =>
            <div key={ffm.path}>
              <code>{ffm.path}:{ffm.value}</code>
              <br/>
            </div>
            )}
      </div>
      <div className="wizard-button-nav">
        <Button variant="raised" onClick={::this.onDoneClick} disabled={this.apd().fileModifications.length !== 0}>Done</Button>
        <Button variant="raised" onClick={::this.onBackClick} disabled={this.apd().fileModifications.length !== 0}>Back</Button>
      </div>
    </div>;
  }
}

