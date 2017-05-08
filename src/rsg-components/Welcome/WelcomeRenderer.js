import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import { DOCS_COMPONENTS } from '../../../scripts/consts';

const styles = ({ space, maxWidth }) => ({
	root: {
		maxWidth,
		margin: [[0, 'auto']],
		padding: space[4],
	},
});

export function WelcomeRenderer({ classes, patterns }) {
	return (
		<div className={classes.root}>
			<Markdown
				text={`
# Welcome to React Styleguidist!

**We couldn’t find any components** using these patterns:

${patterns.map(p => `- \`${p}\``).join('\n')}

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
	patterns: PropTypes.array.isRequired,
};

export default Styled(styles)(WelcomeRenderer);
