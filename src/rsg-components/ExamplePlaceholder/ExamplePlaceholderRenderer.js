import React, { Component, PropTypes } from 'react';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import { DOCS_DOCUMENTING } from '../../../scripts/consts';

const styles = ({ font, light, lightest }) => ({
	button: {
		padding: 0,
		fontSize: 15,
		fontFamily: font,
		textDecoration: 'underline',
		color: light,
		border: 0,
		cursor: 'pointer',
		'&:hover, &:active': {
			isolate: false,
			color: lightest,
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

        &lt;${name} pizza="&#x1f355;" /&gt;

Read more in the [documenting components guide](${DOCS_DOCUMENTING}).
					`}
				/>
			);
		}

		return (
			<button className={classes.button} onClick={this.handleOpen}>Add examples to this component</button>
		);
	}
}

export default Styled(styles)(ExamplePlaceholderRenderer);
