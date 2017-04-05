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

  selectedClass(view) {
    let klass = '';

    const views = this.props.views.toJS();
    Object.keys(views).forEach(k => {
      if (k === view && views[k]) {
        klass = 'selected';
      }
    });

    return klass;
  }

  render() {
    return <div id="title-bar">
      <h3 id="title"> SX Config Manager </h3>
      <div className="title-buttons">
        <button className={"title-button " + this.selectedClass('addSelectProperty')} onClick={::this.toggleAdd}> 
          <div className="title-button--icon">
            <i className="icono-plusCircle"></i> 
          </div>
          <div className="title-button--text">Add Property</div>
        </button>
        <button className={"title-button " + this.selectedClass('removeSelectProperty')} onClick={::this.toggleRemove}> 
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
        <button className={"title-button " + this.selectedClass('editConfig')} onClick={::this.toggleConfig}> 
          <div className="title-button--icon">
            <i className="icono-terminal"></i> 
          </div>
          <div className="title-button--text">Edit Config</div>
        </button>
      </div>
    </div>
  }
}
