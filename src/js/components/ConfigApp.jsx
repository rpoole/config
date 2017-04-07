import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../action_creators';

import TitleBar from './TitleBar';
import EditConfigContainer from '../containers/EditConfig';
import AddSelectPropertyContainer from '../containers/AddSelectProperty';
import RemoveSelectPropertyContainer from '../containers/RemoveSelectProperty';
import AddPropertyListChangedFilesContainer from '../containers/AddPropertyListChangedFiles';
import AddPropertyAddToFilesContainer from '../containers/AddPropertyAddToFiles'
import AddPropertyExecuteModificationsContainer from '../containers/AddPropertyExecuteModifications'
import SideNavContainer from '../containers/SideNav';

import {currentView} from '../containers/selectors';

export class ConfigApp extends React.Component {

  renderMainPanel() {
    const viewMap = {
      editConfig: <EditConfigContainer />,
      addSelectProperty: <AddSelectPropertyContainer />,
      removeSelectProperty: <RemoveSelectPropertyContainer />,
      addPropertyListChangedFiles: <AddPropertyListChangedFilesContainer />,
      addPropertyAddToFiles: <AddPropertyAddToFilesContainer />,
      addPropertyExecuteModifications: <AddPropertyExecuteModificationsContainer />,
    };

    return viewMap[this.props.currentView];
  }

  render() {
    return <div>
      <div id="app">
        <div className="header">
          <TitleBar views={this.props.views} setView={this.props.setView} />
        </div>
        <div className="sidebar">
          <SideNavContainer />
        </div>
        <div className="main">
          { this.renderMainPanel() }
        </div>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    views: state.get('views'),
    currentView: currentView(state),
  };
}

export const ConfigAppContainer = connect(mapStateToProps, actionCreators)(ConfigApp);
