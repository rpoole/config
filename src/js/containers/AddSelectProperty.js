import { connect } from 'react-redux'
import { matchFiles, setView } from '../action_creators'
import AddSelectProperty from '../components/AddSelectProperty'

const mapStateToProps = (state) => {
  return {
    propertyData: state.get('propertyData'),
  };
};

const AddSelectPropertyContainer = connect(mapStateToProps, {
  matchFiles,
  setView
})(AddSelectProperty);
export default AddSelectPropertyContainer 
