import { connect } from 'react-redux'
import SideNav from '../components/SideNav'

import {currentView} from './selectors';

const sideNavMap = {
  add: [{
    display: 'Property Info', viewValue: 'addSelectProperty',
  },{
    display: 'Changed Files', viewValue: 'addPropertyListChangedFiles',
  },{
    display: 'Enter Values', viewValue: 'addPropertyAddToFiles',
  },{
    display: 'Execute', viewValue: 'addPropertyExecuteModifications',
  }],
  remove: [{
    display: 'Property Info', viewValue: 'removeSelectProperty',
  },{
    display: 'Changed Files', viewValue: 'addPropertyListChangedFiles',
  },{
    display: 'Execute', viewValue: 'addPropertyExecuteModifications',
  }],
};


function getSideNav(currentView) {
  if (currentView.startsWith('add')) {
    return sideNavMap['add'];
  } else if (currentView.startsWith('remove')) {
    return sideNavMap['remove'];
  }

  return [];
}


const mapStateToProps = (state) => {
  const cView = currentView(state);
  return {
    selectedNav: cView,
    sideNav: getSideNav(cView),
  };
};

const SideNavContainer = connect(mapStateToProps)(SideNav);
export default SideNavContainer 
