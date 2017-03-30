import React from 'react';

import Button from 'muicss/lib/react/button';
import Radio from 'muicss/lib/react/radio';

export default class AddPropertyListChangedFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      method: this.apd().method,
    };
  }
  onBackClick(e) {
    e.preventDefault();
    this.props.setView('addSelectProperty');
  }

  onNextClick(e) {
    e.preventDefault();
    this.props.setPropMethod(this.state.method);
    this.props.setView('addPropertyAddToFiles');
  }

  onRadioChange(e) {
    this.setState({method: e.target.value});
  }

  apd() {
    return this.props.propertyData.toJS();
  }

  propsStr() {
    return `${this.apd().environments}-configs/${this.apd().project}/${this.apd().filename}`;
  }

  render() {
    return <div>
      <div>
        <h4>Your search string:</h4> <code> {this.propsStr()} </code>
      </div>
      <div>
        <h4>Property to be added:</h4> <code>{ this.apd().propertyName }</code>
      </div>
      <div>
        <h4>Files to be changed:</h4>
        {this.apd().selectedFiles.map( f => 
            <div key={f}><code>{f}</code></div>
        )}
      </div>
      <div>
        <h4>Add this property as:</h4>
      </div>
      <div onChange={::this.onRadioChange}>
        <Radio name="addMethod" value="applyToAllFiles" label="Same property for every file" defaultChecked={this.state.method === 'applyToAllFiles'} />
        <Radio name="addMethod" value="applyToAllFilesPerEnv" label="Same property for every file in same environment" defaultChecked={this.state.method === 'applyToAllFilesPerEnv'}/>
        <Radio name="addMethod" value="applyToDifferentFiles" label="Different property for every file" defaultChecked={this.state.method === 'applyToDifferentFiles'}/>
      </div>

      <Button variant="raised" onClick={::this.onNextClick}>Next</Button>
      <Button variant="raised" onClick={::this.onBackClick}>Back</Button>
    </div>;
  }
}
