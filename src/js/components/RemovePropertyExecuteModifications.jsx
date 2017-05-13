import React from 'react';
import ExecuteModificationsContainer from '../containers/ExecuteModifications';


export default class RemovePropertyExecuteModifications extends React.Component {
  render() {
    return <div>
      <ExecuteModificationsContainer previousView={'removePropertyListFiles'} nextView={'removeSelectProperty'}/>
    </div>
  }
}
