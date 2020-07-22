import React from 'react';
import PropTypes from 'prop-types';
import ComponentsListRenderer from 'rsg-components/ComponentsList/ComponentsListRenderer';
import * as Rsg from '../../../typings';

interface ComponentsListProps {
	items: Rsg.TOCItem[];
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = ({ items }) => {
	const visibleItems = items.filter(item => item.visibleName);

	return visibleItems.length > 0 ? <ComponentsListRenderer items={visibleItems} /> : null;
};

ComponentsList.propTypes = {
	items: PropTypes.array.isRequired,
};

export default ComponentsList;
