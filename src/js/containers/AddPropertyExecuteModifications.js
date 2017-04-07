import { connect } from 'react-redux'
import { resetWizard, executeFileModification, setFileModifications, setView } from '../action_creators'
import AddPropertyExecuteModifications from '../components/AddPropertyExecuteModifications'

const mapStateToProps = (state) => {
  return {
    propertyData: state.get('propertyData'),
    addPropertyData: state.get('addPropertyData'),
  };
};

const AddPropertyExecuteModificationsContainer = connect(mapStateToProps, {
  setView,
  setFileModifications,
  executeFileModification,
  resetWizard,
})(AddPropertyExecuteModifications);
export default AddPropertyExecuteModificationsContainer 
