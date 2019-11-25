import React from 'react';
import PropTypes from 'prop-types';
import ComponentsListRenderer from 'rsg-components/ComponentsList/ComponentsListRenderer';
import getUrl from '../../utils/getUrl';

interface ComponentsListProps {
	items: Rsg.Component[];
	hashPath?: string[];
	useRouterLinks?: boolean;
	useHashId?: boolean;
	openSection: string;
	searchTerm: string;
	onHeaderClick(href?: string): void;
}

const ComponentsList: React.FunctionComponent<ComponentsListProps> = ({
	items,
	useRouterLinks = false,
	useHashId,
	hashPath,
	openSection,
	searchTerm,
	onHeaderClick,
}) => {
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
	return (
		<ComponentsListRenderer
			items={mappedItems}
			onHeaderClick={onHeaderClick}
			openSection={openSection}
			searchTerm={searchTerm}
		/>
	);
};

ComponentsList.propTypes = {
	items: PropTypes.array.isRequired,
	hashPath: PropTypes.array,
	useRouterLinks: PropTypes.bool,
	useHashId: PropTypes.bool,
	openSection: PropTypes.string.isRequired,
	searchTerm: PropTypes.string.isRequired,
	onHeaderClick: PropTypes.func.isRequired,
};

export default ComponentsList;
