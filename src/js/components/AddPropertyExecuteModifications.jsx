import React from 'react';

import Button from 'muicss/lib/react/button';
import Radio from 'muicss/lib/react/radio';

export default class AddPropertyExecuteModifications extends React.Component {
  componentDidMount() {
    this.props.fileModifications.forEach( m => {
      this.props.executeFileModification(m.toJS(), this.props.propertyName);
    });
  }

  onBackClick(e) {
    e.preventDefault();
    this.props.setFileModifications(this.props.finishedFileModifications);
    this.props.setView('addPropertyAddToFiles');
  }

  onDoneClick(e) {
    e.preventDefault();
    this.props.resetWizard();
    this.props.setView('addSelectProperty');
  }

  render() {
    return <div>
      <h3 className="wizard-title">Executing modifications</h3>
      <div className="wizard-info-panel executing-panel">
        <div>
          <h4>Queued:</h4>
        </div>
        {this.props.fileModifications.map( fm =>
            <div key={fm.get('path')}>
              <code>{fm.get('path')}:{fm.get('value')}</code>
              <br/>
            </div>
            )}
      </div>
      <div className="wizard-info-panel executing-panel">
        <div>
          <h4>Finished:</h4>
        </div>
        {this.props.finishedFileModifications.map( ffm =>
            <div key={ffm.get('path')}>
              <code>{ffm.get('path')}:{ffm.get('value')}</code>
              <br/>
            </div>
            )}
      </div>
      <div className="wizard-button-nav">
        <Button variant="raised" color="primary" onClick={::this.onDoneClick} disabled={this.props.fileModifications.size !== 0}>Done</Button>
        <Button variant="raised" color="primary" onClick={::this.onBackClick} disabled={this.props.fileModifications.size !== 0}>Back</Button>
      </div>
    </div>;
  }
}

