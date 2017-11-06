import React from 'react';
import CounterButton from '../CounterButton';

const dummyWrapper = WrappedComponent => props => <WrappedComponent {...props} />;

/**
 * A button wrapped by a Decorator/Enhancer
 */
const WrappedCounterButton = dummyWrapper(CounterButton);

export default WrappedCounterButton;
