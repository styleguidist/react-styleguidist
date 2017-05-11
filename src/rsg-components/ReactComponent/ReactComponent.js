import React from 'react';
import PropTypes from 'prop-types';
import Props from 'rsg-components/Props';
import Methods from 'rsg-components/Methods';
import Examples from 'rsg-components/Examples';
import ReactComponentRenderer from 'rsg-components/ReactComponent/ReactComponentRenderer';

const ExamplePlaceholder = process.env.NODE_ENV === 'development'
	? require('rsg-components/ExamplePlaceholder').default
	: () => <div />;

export default function ReactComponent({ component }, { isolatedComponent = false }) {
	const { name, slug, pathLine, metadata } = component;
	const { description, props, examples, methods, tags } = component.props;
	if (!name) {
		return null;
	}

	return (
		<ReactComponentRenderer
			name={name}
			slug={slug}
			pathLine={pathLine}
			metadata={metadata}
			description={description}
			props={props && <Props props={props} />}
			methods={methods.length > 0 && <Methods methods={methods} />}
			examples={
				examples.length > 0
					? <Examples examples={examples} name={name} />
					: <ExamplePlaceholder name={name} />
			}
			isolated={isolatedComponent}
			tags={tags}
		/>
	);
}

ReactComponent.propTypes = {
	component: PropTypes.object.isRequired,
};

ReactComponent.contextTypes = {
	isolatedComponent: PropTypes.bool,
};
