import React from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontFamily, fontSize, borderRadius }) => ({
	root: {
		fontFamily: fontFamily.base,
	},
	search: {
		padding: space[2],
	},
	input: {
		display: 'block',
		width: '100%',
		padding: space[1],
		color: color.base,
		backgroundColor: color.baseBackground,
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		border: [[1, color.border, 'solid']],
		borderRadius,
		transition: 'border-color ease-in-out .15s',
		'&:focus': {
			isolate: false,
			borderColor: color.link,
			outline: 0,
		},
	},
	tocFooter: {
		color: '#fff',
		paddingLeft: '1rem',
		fontSize: 'small',
		paddingBottom: '1rem',
	},
	link: {
		color: '#fff',
		fontSize: 'small',
	},
});

function renderTOCFooter(classes) {
	const year = new Date().getFullYear();

	return (
		<div className={classes.tocFooter}>
			<p><a className={classes.link} href="https://github.com/policygenius/athenaeum">GitHub</a></p>
			<p><a className={classes.link} href="https://www.npmjs.com/package/athenaeum">NPM</a></p>
			<small>
				<a className={classes.link} href="https://www.policygenius.com">© {year} PolicyGenius</a>
			</small>
		</div>
	);
}

export function TableOfContentsRenderer(props) {
	const { classes, children, onSearchTermChange, searchTerm } = props;

	/* eslint-disable react/no-find-dom-node */
	return (
		<div>
			<div className={cx('TOC', classes.root)}>
				<div className={classes.search}>
					<input
						ref={component => component && findDOMNode(component).focus()}
						value={searchTerm}
						className={classes.input}
						placeholder="Filter by name"
						onChange={event => onSearchTermChange(event.target.value)}
					/>
				</div>
				{children}
				{renderTOCFooter(classes)}
			</div>
		</div>
	);
}

TableOfContentsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
	searchTerm: PropTypes.string.isRequired,
	onSearchTermChange: PropTypes.func.isRequired,
};

export default Styled(styles)(TableOfContentsRenderer);
