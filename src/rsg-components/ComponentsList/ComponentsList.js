import React from 'react';
import ComponentsListRenderer from 'rsg-components/ComponentsList/ComponentsListRenderer';
import PropTypes from 'prop-types';
import getUrl from '../../utils/getUrl';

function ComponentsList({ classes, items, useIsolatedLinks = false }) {
	const mappedItems = items.map(item => ({
		...item,
		href: getUrl({
			name: item.name,
			slug: item.slug,
			anchor: !useIsolatedLinks,
			isolated: useIsolatedLinks,
		}),
	}));
	return <ComponentsListRenderer classes={classes} items={mappedItems} />;
}

ComponentsList.propTypes = {
	items: PropTypes.array.isRequired,
	classes: PropTypes.object,
	useIsolatedLinks: PropTypes.bool,
};

export default ComponentsList;
