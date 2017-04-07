import { connect } from 'react-redux'
import { setFileModifications, setPropMethod, setView, resetWizard } from '../action_creators'
import AddPropertyListChangedFiles from '../components/AddPropertyListChangedFiles'

const mapStateToProps = (state) => {
  return {
    propertyData: state.get('propertyData'),
  };
};

const AddPropertyListChangedFilesContainer = connect(mapStateToProps, {
  setPropMethod,
  setView,
  setFileModifications,
  resetWizard,
})(AddPropertyListChangedFiles);
export default AddPropertyListChangedFilesContainer 
