`version: 1.0.0`

Modal is a singleton & HOC component.

## Prerequisites

Modal is using singleton component pattern.

First you have to include this singleton
component inside the app. 

Best will be to include it inside your `App` container.

```jsx static
/* src/app/components/containers/app/app.jsx */

import { ModalHoc } from 'core/components/singletons/modal/modal';

export default class App extends Component {
  ...
  
    render() {
      return (
        ...
          <ModalHoc />
          {this.props.children}
        ...
      );

```

## Usage

Import the modal class, and call `modal.open`.
Remember that modal does not have any templates/components by default, you have to pass over
your own template into it.

```jsx static
import modal from 'core/components/singletons/modal/modal';

...

handleExample() {
  modal.open({
    component: ModalSwitch, // your custom template component
    data: null, // object to be passed as props into your template component
  });
}
    
```

## Template component

Modal requires you to create your own template component.

Please find example below:

```jsx static

import React from 'react';
import PropTypes from 'prop-types';

import { Component } from 'core/system/react-core/component';

import './modals.scss';

export default class ModalTopGuides extends Component {

  static devTools = false;

  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <p>{this.props.id}</p>
        <p>{this.props.data.name}</p>
        <p>{this.props.data.urlName}</p>
        <p>{this.props.data.headerName}</p>
        <button onClick={this.props.close}>close</button>
      </div>
    );
  }
}

```

## Change Log

All notable changes to this component

\> **[ 1.0.0 ]** - 10 - Jan - 2018
