import React, { PropTypes } from 'react';
import cx from 'classnames';

import s from './ComponentsList.css';

const ComponentsListRenderer = ({ items }) => (
	items.length ? (
		<div className={s.list}>
			{items.map(({ heading, name, content }) => (
				<div className={cx(s.item, content && content.props.items.length && s.isParent)} key={name}>
					<a className={cx(s.link, heading && s.heading)} href={'#' + name}>{name}</a>
					{content}
				</div>
			))}
		</div>
	) : (
		null
	)
);

ComponentsListRenderer.propTypes = {
	items: PropTypes.array.isRequired,
};

export default ComponentsListRenderer;
