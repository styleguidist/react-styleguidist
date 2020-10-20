import React from 'react';
import Button from '../Button';

const dummyWrapper = (WrappedComponent) => (props) => <WrappedComponent {...props} />;

/**
 * A button wrapped by a Decorator/Enhancer
 */
const WrappedButton = dummyWrapper(Button);

export default WrappedButton;
