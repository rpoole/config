import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../action_creators';

import TitleBarContainer from './TitleBar';
import EditConfigContainer from './EditConfig';
import AddSelectProperty from '../components/AddSelectProperty';
import RemoveSelectProperty from '../components/RemoveSelectProperty';
import RemovePropertyListFilesContainer from '../containers/RemovePropertyListFiles';
import RemovePropertyExecuteModifications from '../components/RemovePropertyExecuteModifications';
import AddPropertyListChangedFilesContainer from './AddPropertyListChangedFiles';
import AddPropertyAddToFilesContainer from './AddPropertyAddToFiles'
import AddPropertyExecuteModifications from '../components/AddPropertyExecuteModifications'
import SideNavContainer from './SideNav';

import {currentView} from './selectors';

export class ConfigApp extends React.Component {

  renderMainPanel() {
    const viewMap = {
      editConfig: <EditConfigContainer />,
      addSelectProperty: <AddSelectProperty />,
      addPropertyListChangedFiles: <AddPropertyListChangedFilesContainer />,
      addPropertyAddToFiles: <AddPropertyAddToFilesContainer />,
      addPropertyExecuteModifications: <AddPropertyExecuteModifications />,
      removeSelectProperty: <RemoveSelectProperty />,
      removePropertyListFiles: <RemovePropertyListFilesContainer />,
      removePropertyExecuteModifications: <RemovePropertyExecuteModifications />,
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
