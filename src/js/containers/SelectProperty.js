import { connect } from 'react-redux'
import { matchFiles, setView } from '../action_creators'
import SelectProperty from '../components/SelectProperty'

const mapStateToProps = (state) => {
  return {
    propertyName: state.getIn(['propertyData', 'propertyName']),
    environments: state.getIn(['propertyData', 'environments']),
    project: state.getIn(['propertyData', 'project']),
    filename: state.getIn(['propertyData', 'filename']),
  };
};

const SelectPropertyContainer = connect(mapStateToProps, {
  matchFiles,
  setView
})(SelectProperty);
export default SelectPropertyContainer 
