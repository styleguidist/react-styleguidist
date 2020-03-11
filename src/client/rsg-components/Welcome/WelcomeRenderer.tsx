import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import { DOCS_COMPONENTS } from '../../../scripts/consts';
import * as Rsg from '../../../typings';

const styles = ({ space, maxWidth }: Rsg.Theme) => ({
	root: {
		maxWidth,
		margin: [[0, 'auto']],
		padding: space[4],
	},
});

interface WelcomeProps extends JssInjectedProps {
	patterns: string[];
}

export const WelcomeRenderer: React.FunctionComponent<WelcomeProps> = ({ classes, patterns }) => {
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
};

WelcomeRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	patterns: PropTypes.array.isRequired,
};

export default Styled<WelcomeProps>(styles)(WelcomeRenderer);
