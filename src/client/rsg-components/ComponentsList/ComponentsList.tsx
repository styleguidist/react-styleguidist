import React from 'react';
import PropTypes from 'prop-types';
import ComponentsListRenderer from 'rsg-components/ComponentsList/ComponentsListRenderer';
import { ComponentViewModel } from 'rsg-components/ReactComponent';
import getUrl from '../../utils/getUrl';

interface ComponentsListProps {
	items: ComponentViewModel[];
	hashPath?: string[];
	useRouterLinks?: boolean;
	useHashId?: boolean;
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = ({
	items,
	useRouterLinks = false,
	useHashId,
	hashPath,
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
	return <ComponentsListRenderer items={mappedItems} />;
};

ComponentsList.propTypes = {
	items: PropTypes.array.isRequired,
	hashPath: PropTypes.array,
	useRouterLinks: PropTypes.bool,
	useHashId: PropTypes.bool,
};

export default ComponentsList;
