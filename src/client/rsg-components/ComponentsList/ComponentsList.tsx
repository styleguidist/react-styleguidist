import React from 'react';
import PropTypes from 'prop-types';
import ComponentsListRenderer from 'rsg-components/ComponentsList/ComponentsListRenderer';
import getUrl from '../../utils/getUrl';

interface ComponentsListProps {
	items: Rsg.Component[];
	hashPath?: string[];
	useRouterLinks?: boolean;
	useHashId?: boolean;
	forceOpen?: boolean;
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = ({
	items,
	useRouterLinks = false,
	useHashId,
	hashPath,
	forceOpen,
}) => {
	const mappedItems = items.map(item => ({
		...item,
		shouldOpenInNewTab: !!item.href,
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
	return <ComponentsListRenderer items={mappedItems} forceOpen={forceOpen} />;
};

ComponentsList.propTypes = {
	items: PropTypes.array.isRequired,
	hashPath: PropTypes.array,
	useRouterLinks: PropTypes.bool,
	useHashId: PropTypes.bool,
	forceOpen: PropTypes.bool,
};

export default ComponentsList;
