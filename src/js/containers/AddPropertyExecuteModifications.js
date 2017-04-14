import { connect } from 'react-redux'
import { resetWizard, executeFileModification, setFileModifications, setView } from '../action_creators'
import AddPropertyExecuteModifications from '../components/AddPropertyExecuteModifications'

const mapStateToProps = (state) => {
  return {
    propertyName: state.getIn(['propertyData', 'propertyName']),
    fileModifications: state.getIn(['addPropertyData', 'fileModifications']),
    finishedFileModifications: state.getIn(['addPropertyData', 'finishedFileModifications']),
  };
};

const AddPropertyExecuteModificationsContainer = connect(mapStateToProps, {
  setView,
  setFileModifications,
  executeFileModification,
  resetWizard,
})(AddPropertyExecuteModifications);
export default AddPropertyExecuteModificationsContainer 
