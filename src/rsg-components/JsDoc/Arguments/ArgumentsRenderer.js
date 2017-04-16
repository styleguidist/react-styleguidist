import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import Code from 'rsg-components/Code';
import Group from 'react-group';

const styles = ({ type, name }) => ({
	type: {
		fontSize: 'inherit',
		color: type,
	},
	name: {
		fontSize: 'inherit',
		color: name,
	},
	argumentsBlock: {
		marginTop: 6,
		fontSize: 'inherit',
	},
	argumentsHeader: {
		fontWeight: 'bold',
		fontSize: 'inherit',
	},
});

export function JsDocArguments({ classes, tags }) {
	function renderParams(params) {
		return (
			params.map((param) => {
				return (
					<Group key={`${param.name}`}>
						<Code className={classes.name}>{param.name}</Code>
						{param.type && ':'}
						{param.type && <Code className={classes.type}>{param.type.name}</Code>}
						<Markdown text={`— ${param.description}`} inline />
					</Group>
				);
			})
		);
	}

	return (
		<div className={classes.argumentsBlock}>
			<div className={classes.argumentsHeader}>Arguments</div>
			{ tags.param && renderParams(tags.param) }
			{ tags.arg && renderParams(tags.arg) }
			{ tags.argument && renderParams(tags.argument) }
		</div>
	);
}

JsDocArguments.propTypes = {
	classes: PropTypes.object.isRequired,
	tags: PropTypes.shape({
		arg: PropTypes.array,
		argument: PropTypes.array,
		param: PropTypes.array,
	}).isRequired,
};

export default Styled(styles)(JsDocArguments);
