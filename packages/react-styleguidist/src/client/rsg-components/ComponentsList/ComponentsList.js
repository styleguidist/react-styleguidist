import React from 'react';
import ComponentsListRenderer from 'rsg-components/ComponentsList/ComponentsListRenderer';
import PropTypes from 'prop-types';
import getUrl from '../../utils/getUrl';

function ComponentsList({ classes, items, useRouterLinks = false, useHashId, hashPath }) {
	const mappedItems = items.map(item => ({
		...item,
		href: item.href
			? item.href
			: getUrl({
					name: item.name,
					slug: item.slug,
					anchor: !useRouterLinks,
					hashPath: useRouterLinks ? hashPath : false,
					id: useRouterLinks ? useHashId : false,
			  }),
	}));
	return <ComponentsListRenderer classes={classes} items={mappedItems} />;
}

ComponentsList.propTypes = {
	items: PropTypes.array.isRequired,
	classes: PropTypes.object,
	hashPath: PropTypes.array,
	useRouterLinks: PropTypes.bool,
	useHashId: PropTypes.bool,
};

export default ComponentsList;
