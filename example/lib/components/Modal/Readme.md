Each example has its own state that you can access at the `state` variable and change with the `setState` function. Default state is `{}`.

    <div>
      <Button onClick={() => setState({isOpen: true})}>Open</Button>
      <Modal isOpen={state.isOpen}>
        <h1>Hallo!</h1>
        <Button onClick={() => setState({isOpen: false})}>Close</Button>
      </Modal>
    </div>

If you want to set the default state you can do something like that:

    'count' in state || setState({count: 1});
    <Button onClick={() => setState({count: state.count+1})}>{state.count}</Button>
