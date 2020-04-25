import React from 'react';
import PropTypes from 'prop-types';
import ComponentsListRenderer from 'rsg-components/ComponentsList/ComponentsListRenderer';
import getUrl from '../../utils/getUrl';
import * as Rsg from '../../../typings';

interface ComponentsListProps {
	items: Rsg.TOCItem[];
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
	const mappedItems = items
		.map(item => {
			const href = item.href
				? item.href
				: getUrl({
						name: item.name,
						slug: item.slug,
						anchor: !useRouterLinks,
						hashPath: useRouterLinks ? hashPath : false,
						id: useRouterLinks ? useHashId : false,
				  });

			return {
				...item,
				href,
			};
		})
		.filter(item => item.visibleName);

	return mappedItems.length > 0 ? <ComponentsListRenderer items={mappedItems} /> : null;
};

ComponentsList.propTypes = {
	items: PropTypes.array.isRequired,
	hashPath: PropTypes.array,
	useRouterLinks: PropTypes.bool,
	useHashId: PropTypes.bool,
};

export default ComponentsList;
