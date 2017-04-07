import React from 'react';


export default class SideNav extends React.Component {
  render() {
    return <div className="breadcrumbs">
      { this.props.sideNav.map ( n =>
          <div key={n.viewValue} className={ n.viewValue === this.props.selectedNav ? 'selected' : '' }>{n.display}</div>
      )}
    </div>
  }
}
