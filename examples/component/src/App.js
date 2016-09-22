import React, { Component } from 'react'

let context = require.context('./styleguidist-loader!.', true, /Readme\.md$/)
let components = context.keys().map(context)

class Styleguide extends Component {
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<ul>
					{this.props.components.map(
						 (component, key) => <li key={key}><pre>{component}</pre></li>)}
				</ul>
			</div>
		)
	}
}

class App extends Component {
  render() {
    return (
			<div className="App">
				<Styleguide title="React Style Guide Example" components={components} />
			</div>
    );
  }
}

export default App
