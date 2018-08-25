import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import { DOCS_DOCUMENTING } from '../../../scripts/consts';

const styles = ({ fontFamily, fontSize, color }) => ({
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

export class ExamplePlaceholderRenderer extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		name: PropTypes.string,
	};

	constructor() {
		super();
		this.handleOpen = this.handleOpen.bind(this);
		this.state = {
			isVisible: false,
		};
	}

	handleOpen() {
		this.setState({ isVisible: true });
	}

	render() {
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

export default Styled(styles)(ExamplePlaceholderRenderer);
