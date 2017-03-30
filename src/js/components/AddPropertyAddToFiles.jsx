import React from 'react';

import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

import bindInput from '../mixins/bindInput';

export default class AddPropertyAddToFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.apd().selectedFiles.forEach( f => {
      this.state[f] = '';
    });
  }

  onBackClick(e) {
    e.preventDefault();
    this.props.setView('addPropertyListChangedFiles');
  }

  onNextClick(e) {
    e.preventDefault();
  }

  apd() {
    return this.props.propertyData.toJS();
  }

  render() {
    return <div>
      <Form>
      {this.apd().selectedFiles.map( file => 
          <div key={file}>
            <div>
              <code>{file}</code>
            </div>
            <Input value={this.state[file]} hint={'Property Value'} value={this.state[file]} required={true} onChange={bindInput(this, file)}/>
          </div>
          )}
      <Button variant="raised" onClick={::this.onNextClick}>Next</Button>
      <Button variant="raised" onClick={::this.onBackClick}>Back</Button>
      </Form>
    </div>
  }
}
