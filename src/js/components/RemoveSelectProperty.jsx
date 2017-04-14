import React from 'react';
import SelectPropertyContainer from '../containers/SelectProperty';

export default class RemoveSelectProperty extends React.Component {
  render() {
    return <div>
      <h3 className="wizard-title">Property to Remove</h3>
      <SelectPropertyContainer nextView={'addPropertyListChangedFiles'} />
    </div>
  }
}
