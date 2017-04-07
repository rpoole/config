import { connect } from 'react-redux'
import { setView } from '../action_creators'
import {currentView} from './selectors';
import AddPropertyAddToFiles from '../components/TitleBar'

const mapStateToProps = (state) => {
  return {
    currentView: currentView(state),
    addPropertyData: state.get('addPropertyData'),
  };
};

const AddPropertyAddToFilesContainer = connect(mapStateToProps, {
  setView,
})(AddPropertyAddToFiles);
export default AddPropertyAddToFilesContainer 

