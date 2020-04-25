import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import { DOCS_DOCUMENTING } from '../../../scripts/consts';
import * as Rsg from '../../../typings';

const styles = ({ fontFamily, fontSize, color }: Rsg.Theme) => ({
	button: {
		padding: 0,
		fontSize: fontSize.base,
		fontFamily: fontFamily.base,
		textDecoration: 'underline',
		color: color.light,
		border: 0,
		cursor: 'pointer',
		background: 'transparent',
		'&:hover, &:active': {
			isolate: false,
			color: color.lightest,
		},
	},
});

interface ExamplePlaceholderProps extends JssInjectedProps {
	name?: string;
}

export class ExamplePlaceholderRenderer extends Component<ExamplePlaceholderProps> {
	public static propTypes = {
		classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
		name: PropTypes.string,
	};

	public state = {
		isVisible: false,
	};

	public handleOpen = () => {
		this.setState({ isVisible: true });
	};

	public render() {
		const { classes, name } = this.props;
		const { isVisible } = this.state;
		if (isVisible) {
			return (
				<Markdown
					text={`
Create **Readme.md** or **${name}.md** file in the component’s folder like this:

    ${name} example:

    \`\`\`js
    <${name} pizza="\uD83C\uDF55" />
	\`\`\`

You may need to **restart** the style guide server after adding an example file.

Read more in the [documenting components guide](${DOCS_DOCUMENTING}).
					`}
				/>
			);
		}

		return (
			<button className={classes.button} onClick={this.handleOpen}>
				Add examples to this component
			</button>
		);
	}
}

export default Styled<ExamplePlaceholderProps>(styles)(ExamplePlaceholderRenderer);
