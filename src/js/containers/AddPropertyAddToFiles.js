import { connect } from 'react-redux'
import { resetWizard, setFileModifications, setPropMethod, setView } from '../action_creators'
import AddPropertyAddToFiles from '../components/AddPropertyAddToFiles'

const mapStateToProps = (state) => {
  return {
    selectedFiles: state.getIn(['propertyData', 'selectedFiles']),
    method: state.getIn(['propertyData', 'method']),
    propertyName: state.getIn(['propertyData', 'propertyName']),
    fileModifications: state.getIn(['addPropertyData', 'fileModifications']),
    addPropertyData: state.get('addPropertyData'),
  };
};

const AddPropertyAddToFilesContainer = connect(mapStateToProps, {
  setPropMethod,
  setView,
  setFileModifications,
  resetWizard,
})(AddPropertyAddToFiles);
export default AddPropertyAddToFilesContainer 
