Each example has its own state that you can access at the `state` variable and change with the `setState` function. Default state is `{}`.

	<div>
		<button onClick={() => setState({isOpen: true})}>Open</button>
		<Modal isOpen={state.isOpen}>
        	<h1>Hallo!</h1>
        	<button onClick={() => setState({isOpen: false})}>Close</button>
        </Modal>
	</div>
