import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';
import Name from 'rsg-components/Name';
import Type from 'rsg-components/Type';
import Group from 'react-group';
import doctrine from 'doctrine';
import * as Rsg from '../../../typings';

export const styles = ({ space }: Rsg.Theme) => ({
	block: {
		marginBottom: space[2],
	},
});

export interface ArgumentProps {
	name?: string;
	type?: any;
	default?: string;
	description?: string;
	returns?: boolean;
	block?: boolean;
}

type ArgumentPropsWithClasses = ArgumentProps & JssInjectedProps;

export const ArgumentRenderer: React.FunctionComponent<ArgumentPropsWithClasses> = ({
	classes,
	name,
	type,
	description,
	returns,
	block,
	...props
}) => {
	const isOptional = type && type.type === 'OptionalType';
	const defaultValue = props.default;
	if (isOptional) {
		type = type.expression;
	}
	const typeName = type ? doctrine.type.stringify(type) : '';
	const content = (
		<Group>
			{returns && 'Returns'}
			{name && (
				<span>
					<Name>{name}</Name>
					{type && ':'}
				</span>
			)}
			{type && (
				<Type>
					{typeName}
					{isOptional && '?'}
					{!!defaultValue && `=${defaultValue}`}
				</Type>
			)}
			{type && description && `—`}
			{description && <Markdown text={`${description}`} inline />}
		</Group>
	);

	if (block) {
		return <div className={classes.block}>{content}</div>;
	}

	return content;
};

ArgumentRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	name: PropTypes.string,
	type: PropTypes.object,
	default: PropTypes.string,
	description: PropTypes.string,
	returns: PropTypes.bool,
	block: PropTypes.bool,
};

export default Styled<ArgumentPropsWithClasses>(styles)(ArgumentRenderer);
