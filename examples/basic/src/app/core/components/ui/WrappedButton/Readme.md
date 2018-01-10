Modal is a singleton & HOC component.

#### Prerequisites

To start working with Modal you have to make sure it is included inside App container as follow:

```jsx static
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

Using the modal is simple. Import the modal class, and call `modal.open`.
Remember that modal doesn't have any templates/components by default, you have to pass over
your own template into it.

```jsx static
import modal from 'core/components/singletons/modal/modal';

...

modal.open({
  component: ModalSwitch,
  data: {
    id: d.id,
    data: d.data,
    type: d.data.type,
    baseUrl: this.baseUrl,
  },
});
    
```

Modal component/template example:

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
