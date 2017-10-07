import React from 'react';
import PropTypes from 'prop-types';
import { MdFormatIndentDecrease, MdFormatIndentIncrease } from 'react-icons/lib/md';
import FaFileTextO from 'react-icons/lib/fa/file-text-o';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';
import Logo from 'rsg-components/Logo';

const styles = ({ color, sidebarWidth, mq, space }) => ({
	toggleProps: {
		left: space[5] + space[3],
		padding: space[0] / 2,
		[mq.small]: {
			display: 'none',
		},
	},
	sidebar: {
		backgroundColor: color.sidebarBackground,
		border: [[color.border, 'solid']],
		borderWidth: [[0, 1, 0, 0]],
		position: 'fixed',
		top: 0,
		left: 0,
		bottom: 0,
		width: sidebarWidth,
		overflow: 'auto',
	},
	logo: {
		padding: space[2],
		borderBottom: [[1, color.border, 'solid']],
	},
});

const Sidebar = ({
	classes,
	title,
	onToggleSidebar,
	sidebarVisible,
	toc,
	toggleAllProps,
	styles,
}) => (
	<div>
		{sidebarVisible ? (
			<aside className={classes.sidebar}>
				<div className={classes.logo}>
					<Logo>{title}</Logo>
				</div>
				{toc}
				<MdFormatIndentDecrease className={styles} onClick={onToggleSidebar} />
				<FaFileTextO onClick={toggleAllProps} className={cx(styles, classes.toggleProps)} />
			</aside>
		) : (
			<MdFormatIndentIncrease className={styles} onClick={onToggleSidebar} />
		)}
	</div>
);

Sidebar.propTypes = {
	classes: PropTypes.object.isRequired,
	styles: PropTypes.object.isRequired,
	onToggleSidebar: PropTypes.func.isRequired,
	toggleAllProps: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	sidebarVisible: PropTypes.bool,
	toc: PropTypes.node.isRequired,
};

export default Styled(styles)(Sidebar);
