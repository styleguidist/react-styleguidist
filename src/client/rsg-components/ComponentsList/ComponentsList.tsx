import React from 'react';
import PropTypes from 'prop-types';
import ComponentsListRenderer from 'rsg-components/ComponentsList/ComponentsListRenderer';
import { useStyleGuideContext } from 'rsg-components/Context';
import { getHash } from '../../utils/handleHash';
import getUrl from '../../utils/getUrl';

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
	const {
		config: { pagePerSection, tocMode },
	} = useStyleGuideContext();

	// Match selected component in both basic routing and pagePerSection routing.
	const { hash, pathname } = window.location;
	const windowHash = pathname + (pagePerSection ? hash : getHash(hash));
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

			const [open, setOpen] =
				tocMode !== 'collapse' ? [true, () => {}] : React.useState(!!item.open);

			return {
				...item,
				shouldOpenInNewTab: !!item.href,
				href,
				open,
				selected: windowHash === href,
				setOpen,
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
