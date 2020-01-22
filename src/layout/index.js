import React, { PureComponent, Fragment } from "react";

export default class Layout extends PureComponent {
  render() {
    return (
      <Fragment>
        <header class="container">
          <div className="logo" />
        </header>
        {this.props.children}
        <footer></footer>
      </Fragment>
    );
  }
}
