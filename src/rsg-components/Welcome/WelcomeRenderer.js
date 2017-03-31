import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import { DOCS_COMPONENTS } from '../../../scripts/consts';

const styles = () => ({
	root: {
		maxWidth: 900,
		margin: [[0, 'auto']],
		padding: 30,
	},
});

export function WelcomeRenderer({ classes }) {
	return (
		<div className={classes.root}>
			<Markdown
				text={`
# Welcome to React Styleguidist!

## Point Styleguidist to your React components

We couldn’t find any components defined in your style guide config or using the default pattern \`src/components/**/*.js\`.

Create **styleguide.config.js** file in your project root directory like this:

module.exports = {
  components: 'src/components/**/*.js'
};

Read more in the [locating components guide](${DOCS_COMPONENTS}).
				`}
			/>
		</div>
	);
}

WelcomeRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(WelcomeRenderer);
