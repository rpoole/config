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

  selectedClass(view) {
    let klass = '';

    const views = this.vd();
    Object.keys(views).forEach(k => {
      if (k === view && views[k]) {
        klass = 'selected';
      }
    });

    return klass;
  }

  render() {
    return <div>
      <div id="app">
        <div className="header">
          <TitleBar views={this.props.views} setView={this.props.setView} />
        </div>
        <div className="sidebar">
          <div className="breadcrumbs">
            <div className={ this.selectedClass('addSelectProperty') }>Property Info</div>
            <div className={ this.selectedClass('addPropertyListChangedFiles') }>Changed Files</div>
            <div className={ this.selectedClass('addPropertyAddToFiles') }>Enter Values</div>
            <div className={ this.selectedClass('addPropertyExecuteModifications') }>Execute</div>
          </div>
        </div>
        <div className="main">
          { this.vd().editConfig ? <EditConfig {...this.props}/> : '' }
          { this.vd().addSelectProperty ? <AddSelectProperty {...this.props}/> : '' }
          { this.vd().removeSelectProperty ? <RemoveSelectProperty {...this.props}/> : '' }
          { this.vd().addPropertyListChangedFiles ?  <AddPropertyListChangedFiles {...this.baseProps() } setFileModifications={this.props.setFileModifications} /> : '' }
          { this.vd().addPropertyAddToFiles ?  <AddPropertyAddToFiles {...this.baseProps() } setFileModifications={this.props.setFileModifications} addPropertyData={this.props.addPropertyData}/> : '' }
          { this.vd().addPropertyExecuteModifications ?  <AddPropertyExecuteModifications {...this.baseProps() } addPropertyData={this.props.addPropertyData} executeFileModification={this.props.executeFileModification} setFileModifications={this.props.setFileModifications} /> : '' }
        </div>
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
