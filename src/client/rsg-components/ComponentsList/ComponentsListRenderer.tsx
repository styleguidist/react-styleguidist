import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Link from 'rsg-components/Link';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import { useStyleGuideContext } from 'rsg-components/Context';
import * as Rsg from '../../../typings';

const styles = ({ color, fontFamily, fontSize, space, mq }: Rsg.Theme) => ({
	list: {
		margin: 0,
		paddingLeft: space[2],
		'nav > & > $item': {
			isolate: false,
			[mq.small]: {
				isolate: false,
				display: 'inline-block',
				verticalAlign: 'top',
			},
		},
	},
	item: {
		color: color.base,
		display: 'block',
		margin: [[space[1], 0, space[1], 0]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		listStyle: 'none',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	isChild: {
		[mq.small]: {
			display: 'inline-block',
			margin: [[0, space[1], 0, 0]],
		},
	},
	heading: {
		color: color.base,
		marginTop: space[1],
		fontFamily: fontFamily.base,
		fontWeight: 'bold',
	},
	hidden: {
		display: 'none',
		[mq.small]: {
			display: 'initial',
		},
	},
	isSelected: {
		fontWeight: 'bold',
		'& li': {
			isolate: false,
			fontWeight: 'normal',
		},
	},
});

interface ComponentsListRendererProps extends JssInjectedProps {
	items: Rsg.TOCItem[];
}

export const ComponentsListRenderer: React.FunctionComponent<ComponentsListRendererProps> = ({
	classes,
	items,
}) => {
	const {
		config: { tocMode },
	} = useStyleGuideContext();

	const [openSlug, setOpenSlug] = React.useState<string>(
		items.find(item => item.initialOpen)?.slug || ''
	);

	return (
		<ul className={classes.list}>
			{items.map(item => {
				const open = item.forcedOpen || tocMode !== 'collapse' || openSlug === item.slug;
				return (
					<ComponentsListSectionRenderer
						// To reinit all subsections when toggling sections,
						// In other words for the useState hook to be reinitialized,
						// we have to repaint it.
						// Adding the open status to the key will force regenaration
						// of an open section when it gets closed
						key={item.slug + (open ? '*' : '')}
						classes={classes}
						{...item}
						open={open}
						// when the current section is already open toggle should close it
						onToggle={() => setOpenSlug(item.slug && !open ? item.slug : '')}
					/>
				);
			})}
		</ul>
	);
};

const ComponentsListSectionRenderer: React.FunctionComponent<Rsg.TOCItem &
	JssInjectedProps & { open: boolean; onToggle: () => void }> = ({
	classes,
	heading,
	visibleName,
	href,
	content,
	shouldOpenInNewTab,
	selected,
	open,
	onToggle,
}) => {
	return (
		<li
			className={cx(classes.item, {
				[classes.isChild]: !content && !shouldOpenInNewTab,
				[classes.isSelected]: selected,
			})}
		>
			<Link
				className={cx(heading && classes.heading)}
				href={href}
				onClick={onToggle}
				target={shouldOpenInNewTab ? '_blank' : undefined}
			>
				{visibleName}
			</Link>
			{// To be able to show all sections when in mobile mode,
			// we have to render them all the time.
			// We use hiding and showing instead of destroying.
			content && <div className={open ? undefined : classes.hidden}>{content}</div>}
		</li>
	);
};

ComponentsListRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	items: PropTypes.array.isRequired,
};

export default Styled<ComponentsListRendererProps>(styles)(ComponentsListRenderer);
