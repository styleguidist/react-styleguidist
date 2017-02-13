import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import { DOCS_COMPONENTS, DOCS_DOCUMENTING } from '../../../scripts/consts';

/* eslint-disable max-len */

const styles = () => ({
	root: {
		maxWidth: 900,
		margin: [[0, 'auto']],
		padding: 30,
	},
});

export function WelcomeRenderer({ classes, components, examples }) {
	return (
		<div className={classes.root}>
			<Markdown text={'# Welcome to React Styleguidist!'} />
			{components && (
				<Markdown
					text={`
## Point Styleguidist to your React components

We couldn’t find any components defined in your style guide config or using the default pattern \`src/components/**/*.js\`.

Create **styleguide.config.js** file in your project root directory like this:

    module.exports = {
      components: 'src/components/**/*.js'
    };

Read more in the [locating components guide](${DOCS_COMPONENTS}).
					`}
				/>
			)}
			{examples && (
				<Markdown
					text={`

## Write your first example

Create **Readme.md** or **ComponentName.md** file in the component’s folder like this:

    React component example:

        &lt;Button size="large"&gt;Push Me&lt;/Button&gt;

Read more in the [documenting components guide](${DOCS_DOCUMENTING}).
					`}
				/>
			)}
		</div>
	);
}

WelcomeRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	components: PropTypes.bool,
	examples: PropTypes.bool,
};

export default Styled(styles)(WelcomeRenderer);
