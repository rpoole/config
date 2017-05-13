import { connect } from 'react-redux'
import { setFileModifications, setPropMethod, setView, resetWizard } from '../action_creators'
import RemovePropertyListFiles from '../components/RemovePropertyListFiles'

const mapStateToProps = (state) => {
  return {
    environments: state.getIn(['propertyData', 'environments']),
    project: state.getIn(['propertyData', 'project']),
    filename: state.getIn(['propertyData', 'filename']),
    propertyName: state.getIn(['propertyData', 'propertyName']),
    selectedFiles: state.getIn(['propertyData', 'selectedFiles']),
  };
};

const RemovePropertyListFilesContainer = connect(mapStateToProps, {
  setView,
  resetWizard,
})(RemovePropertyListFiles);
export default RemovePropertyListFilesContainer 
