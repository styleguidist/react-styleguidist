import { PropTypes } from 'react';

import s from './TableOfContents.css';

const TableOfContents = ({
	components
}) => {
	return (
		<ul className={s.root}>
			{components.map(({ name }) => (
				<li className={s.item} key={name}>
					<a className={s.link} href={'#' + name}>{name}</a>
				</li>
			))}
		</ul>
	);
};

TableOfContents.propTypes = {
	components: PropTypes.array.isRequired
};

export default TableOfContents;
