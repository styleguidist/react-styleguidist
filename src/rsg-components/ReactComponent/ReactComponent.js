import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import Props from 'rsg-components/Props';
import Examples from 'rsg-components/Examples';
import ReactComponentRenderer from 'rsg-components/ReactComponent/ReactComponentRenderer';

export default function ReactComponent({
	component,
	sidebar,
}) {
	const { imagePath, hasSlice, nameFallback, designMarkdown, name, pathLine, examples } = component;
	const { description, props } = component.props;
	return (
		<ReactComponentRenderer
			imagePath={imagePath}
			hasSlice={hasSlice}
			nameFallback={nameFallback}
			designMarkdown={designMarkdown && <Examples examples={designMarkdown} />}
			name={name}
			pathLine={pathLine}
			description={description && <Markdown text={description} />}
			props={props && <Props props={props} />}
			examples={examples && <Examples examples={examples} />}
			sidebar={sidebar}
		/>
	);
}

ReactComponent.propTypes = {
	component: PropTypes.object.isRequired,
	sidebar: PropTypes.bool,
};
