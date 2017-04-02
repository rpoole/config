import React from 'react';
import SelectProperty from './SelectProperty';

export default class RemoveSelectProperty extends React.Component {
  render() {
    return <div>
      <h3>Property to Remove</h3>
      <SelectProperty 
        matchFiles={this.props.matchFiles} 
        setView={this.props.setView}
        legend={'Property to Remove'}
        nextView={'addPropertyListChangedFiles'}
        propertyData={this.props.propertyData}
      >
      </SelectProperty>
    </div>
  }
}
