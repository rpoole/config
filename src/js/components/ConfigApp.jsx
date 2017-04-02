import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../action_creators';

import TitleBar from './TitleBar';
import EditConfig from './EditConfig';
import AddSelectProperty from './AddSelectProperty';
import RemoveSelectProperty from './RemoveSelectProperty';
import AddPropertyListChangedFiles from './AddPropertyListChangedFiles';
import AddPropertyAddToFiles from './AddPropertyAddToFiles'
import AddPropertyExecuteModifications from './AddPropertyExecuteModifications'

export class ConfigApp extends React.Component {
  vd() {
    return this.props.views.toJS();
  }

  baseProps() {
    return {
      propertyData: this.props.propertyData,
      views: this.props.views,
      setView: this.props.setView,
      setPropMethod: this.props.setPropMethod,
      resetWizard: this.props.resetWizard,
    }
  }

  render() {
    return <div>
      <TitleBar setView={this.props.setView} />
      <div className="main">
        { this.vd().editConfig ? <EditConfig {...this.props}/> : '' }
        { this.vd().addSelectProperty ? <AddSelectProperty {...this.props}/> : '' }
        { this.vd().removeSelectProperty ? <RemoveSelectProperty {...this.props}/> : '' }
        { this.vd().addPropertyListChangedFiles ?  <AddPropertyListChangedFiles {...this.baseProps() } setFileModifications={this.props.setFileModifications} /> : '' }
        { this.vd().addPropertyAddToFiles ?  <AddPropertyAddToFiles {...this.baseProps() } setFileModifications={this.props.setFileModifications} addPropertyData={this.props.addPropertyData}/> : '' }
        { this.vd().addPropertyExecuteModifications ?  <AddPropertyExecuteModifications {...this.baseProps() } addPropertyData={this.props.addPropertyData} executeFileModification={this.props.executeFileModification} setFileModifications={this.props.setFileModifications} /> : '' }
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    directories: state.get('directories'),
    views: state.get('views'),
    propertyData: state.get('propertyData'),
    addPropertyData: state.get('addPropertyData'),
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export const ConfigAppContainer = connect(mapStateToProps, actionCreators)(ConfigApp);
