import React from 'react';
import ExecuteModificationsContainer from '../containers/ExecuteModifications';

export default class AddPropertyExecuteModifications extends React.Component {
  render() {
    return <div>
      <ExecuteModificationsContainer previousView={'addPropertyAddToFiles'} nextView={'addSelectProperty'}/>
    </div>
  }
}
