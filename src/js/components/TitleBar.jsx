import React from 'react';

import Button from 'muicss/lib/react/button';

export default class TitleBar extends React.Component {
  toggleConfig(e) {
    e.preventDefault();
    this.props.setView('editConfig');
  }

  toggleAdd(e) {
    e.preventDefault();
    this.props.setView('addSelectProperty');
  }

  toggleRemove(e) {
    e.preventDefault();
    this.props.setView('removeSelectProperty');
  }

  selectedClass(viewStart) {
    if (this.props.currentView.startsWith(viewStart)) {
      return 'selected';
    }

    return '';
  }

  render() {
    return <div id="title-bar">
      <div className="logo">
        <img src="./src/img/logo-color.svg"></img>
      </div>
      <div className="title-buttons">
        <button className={"title-button " + this.selectedClass('add')} onClick={::this.toggleAdd}> 
          <div className="title-button--icon">
            <i className="icono-plusCircle"></i> 
          </div>
          <div className="title-button--text">Add Property</div>
        </button>
        <button className={"title-button " + this.selectedClass('remove')} onClick={::this.toggleRemove}> 
          <div className="title-button--icon">
            <i className="icono-crossCircle"></i> 
          </div>
          <div className="title-button--text">Remove Property</div>
        </button>
        <button className="title-button"> 
          <div className="title-button--icon">
            <i className="icono-document"></i> 
          </div>
          <div className="title-button--text">Edit Property</div>
        </button>
        <button className={"title-button " + this.selectedClass('edit')} onClick={::this.toggleConfig}> 
          <div className="title-button--icon">
            <i className="icono-terminal"></i> 
          </div>
          <div className="title-button--text">Edit Config</div>
        </button>
      </div>
    </div>
  }
}
