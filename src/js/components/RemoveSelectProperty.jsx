import React from 'react';
import SelectProperty from './SelectProperty';

export default class RemoveSelectProperty extends React.Component {
  render() {
    return <SelectProperty 
      matchFiles={this.props.matchFiles} 
      setView={this.props.setView}
      legend={'Property to Remove'}
      nextView={'addPropertyListChangedFiles'}
      propertyData={this.props.propertyData}
    >
    </SelectProperty>
  }
}
