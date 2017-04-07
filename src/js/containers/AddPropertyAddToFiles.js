import { connect } from 'react-redux'
import { resetWizard, setFileModifications, setPropMethod, setView } from '../action_creators'
import AddPropertyAddToFiles from '../components/AddPropertyAddToFiles'

const mapStateToProps = (state) => {
  return {
    propertyData: state.get('propertyData'),
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
