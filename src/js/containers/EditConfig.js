import { connect } from 'react-redux'
import { parseDirectory, setDirectories } from '../action_creators'
import EditConfig from '../components/EditConfig'

const mapStateToProps = (state) => {
  return {
    directories: state.get('directories'),
  };
};

const EditConfigContainer = connect(mapStateToProps, {
  onUpdateClick: parseDirectory,
  onFileSelected: setDirectories,
})(EditConfig);
export default EditConfigContainer 
