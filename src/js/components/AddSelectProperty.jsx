import React from 'react';
import SelectProperty from './SelectProperty';


export default class AddSelectProperty extends React.Component {
  render() {
    return <div>
      <h3 className="wizard-title"><span>Property to Add</span></h3>
      <SelectProperty 
        matchFiles={this.props.matchFiles} 
        setView={this.props.setView}
        nextView={'addPropertyListChangedFiles'}
        propertyData={this.props.propertyData}
      >
      </SelectProperty>
  </div>
  }
}
