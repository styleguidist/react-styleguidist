import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import Props from 'rsg-components/Props';
import Methods from 'rsg-components/Methods';
import Examples from 'rsg-components/Examples';
import ReactComponentRenderer from 'rsg-components/ReactComponent/ReactComponentRenderer';

export default function ReactComponent({
	component,
	sidebar,
}) {
	const { name, pathLine, examples } = component;
	const { description, props, methods } = component.props;
	return (
		<ReactComponentRenderer
			name={name}
			pathLine={pathLine}
			description={description && <Markdown text={description} />}
			props={props && <Props props={props} />}
			methods={methods && methods.length && <Methods methods={methods} />}
			examples={examples && <Examples examples={examples} name={name} />}
			sidebar={sidebar}
		/>
	);
}

ReactComponent.propTypes = {
	component: PropTypes.object.isRequired,
	sidebar: PropTypes.bool,
};
