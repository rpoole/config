import { connect } from 'react-redux'
import { matchFiles, setView } from '../action_creators'
import RemoveSelectProperty from '../components/RemoveSelectProperty'

const mapStateToProps = (state) => {
  return {
    propertyData: state.get('propertyData'),
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    matchFiles: (propertyName, environments, project, filename) => {
      dispatch(matchFiles(propertyName, environments, project, filename));
    },
    setView: (view) => {
      dispatch(setView(view));
    },
  };
};

const RemoveSelectPropertyContainer = connect(mapStateToProps, {
  matchFiles,
  setView,
})(RemoveSelectProperty);
export default RemoveSelectPropertyContainer 
