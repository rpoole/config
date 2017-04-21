import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../action_creators';

import TitleBarContainer from './TitleBar';
import EditConfigContainer from './EditConfig';
import AddSelectProperty from '../components/AddSelectProperty';
import RemoveSelectProperty from '../components/RemoveSelectProperty';
import AddPropertyListChangedFilesContainer from './AddPropertyListChangedFiles';
import AddPropertyAddToFilesContainer from './AddPropertyAddToFiles'
import AddPropertyExecuteModificationsContainer from './AddPropertyExecuteModifications'
import SideNavContainer from './SideNav';

import {currentView} from './selectors';

export class ConfigApp extends React.Component {

  renderMainPanel() {
    const viewMap = {
      editConfig: <EditConfigContainer />,
      addSelectProperty: <AddSelectProperty />,
      removeSelectProperty: <RemoveSelectProperty />,
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
          <TitleBarContainer />
        </div>
        <div className="wrapper">
          <div className="sidebar">
            <SideNavContainer />
          </div>
          <div className="main">
            { this.renderMainPanel() }
          </div>
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
