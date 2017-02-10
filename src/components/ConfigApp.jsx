import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../action_creators';

import TitleBar from './TitleBar';
import EditConfig from './EditConfig';

export class ConfigApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <TitleBar toggleConfig={this.props.toggleConfig}/>
      <EditConfig {...this.props}/>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    directoryPaths: state.get('directoryPaths'),
    configOpen: state.get('configOpen'),
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export const ConfigAppContainer = connect(mapStateToProps, actionCreators)(ConfigApp);
