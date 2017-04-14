import { connect } from 'react-redux'
import { setFileModifications, setPropMethod, setView, resetWizard } from '../action_creators'
import AddPropertyListChangedFiles from '../components/AddPropertyListChangedFiles'

const mapStateToProps = (state) => {
  return {
    method: state.getIn(['propertyData', 'method']),
    environments: state.getIn(['propertyData', 'environments']),
    project: state.getIn(['propertyData', 'project']),
    filename: state.getIn(['propertyData', 'filename']),
    propertyName: state.getIn(['propertyData', 'propertyName']),
    selectedFiles: state.getIn(['propertyData', 'selectedFiles']),
  };
};

const AddPropertyListChangedFilesContainer = connect(mapStateToProps, {
  setPropMethod,
  setView,
  setFileModifications,
  resetWizard,
})(AddPropertyListChangedFiles);
export default AddPropertyListChangedFilesContainer 
