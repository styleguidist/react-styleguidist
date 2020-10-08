import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from 'rsg-components/Wrapper';
import compileCode from '../../utils/compileCode';
import * as Rsg from '../../../typings';

interface ReactExampleProps {
	code: string;
	evalInContext(code: string): React.ComponentType;
	onError(err: Error): void;
	compilerConfig: Rsg.SanitizedStyleguidistConfig['compilerConfig'];
}

export default class ReactExample extends Component<ReactExampleProps> {
	public static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
		onError: PropTypes.func.isRequired,
		compilerConfig: PropTypes.object,
	};

	public shouldComponentUpdate(nextProps: ReactExampleProps) {
		return this.props.code !== nextProps.code;
	}

	private compileCode() {
		const { code, compilerConfig, onError } = this.props;
		try {
			return compileCode(code, compilerConfig, onError);
		} catch (err) {
			if (onError) {
				onError(err);
			}
			return '';
		}
	}

	public render() {
		const compiledCode = this.compileCode();
		if (!compiledCode) {
			return null;
		}

		const { onError, evalInContext } = this.props;
		const ExampleComponent = evalInContext(compiledCode);
		const wrappedComponent = (
			<Wrapper onError={onError}>
				<ExampleComponent />
			</Wrapper>
		);
		return wrappedComponent;
	}
}
