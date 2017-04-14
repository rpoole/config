import React from 'react';
import SelectPropertyContainer from '../containers/SelectProperty';


export default class AddSelectProperty extends React.Component {
  render() {
    return <div>
      <h3 className="wizard-title"><span>Property to Add</span></h3>
      <SelectPropertyContainer nextView={'addPropertyListChangedFiles'} />
  </div>
  }
}
