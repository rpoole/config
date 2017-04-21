import { connect } from 'react-redux'
import { setConfig, parseDirectory } from '../action_creators'
import EditConfig from '../components/EditConfig'

const mapStateToProps = (state) => {
  return {
    directories: state.get('directories'),
    gitPubKeyFile: state.get('gitPubKeyFile'),
    gitPrivateKeyFile: state.get('gitPrivateKeyFile'),
    gitPassword: state.get('gitPassword'),
  };
};

const EditConfigContainer = connect(mapStateToProps, {
  onUpdateClick: setConfig,
  parseDirectory: parseDirectory,
})(EditConfig);
export default EditConfigContainer 
