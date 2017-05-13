import { connect } from 'react-redux'
import { resetWizard, executeFileModification, setFileModifications, setView } from '../action_creators'
import ExecuteModifications from '../components/ExecuteModifications'

const mapStateToProps = (state) => {
  return {
    propertyName: state.getIn(['propertyData', 'propertyName']),
    fileModifications: state.getIn(['propertyData', 'fileModifications']),
    finishedFileModifications: state.getIn(['propertyData', 'finishedFileModifications']),
  };
};

const ExecuteModificationsContainer = connect(mapStateToProps, {
  setView,
  setFileModifications,
  executeFileModification,
  resetWizard,
})(ExecuteModifications);
export default ExecuteModificationsContainer 
