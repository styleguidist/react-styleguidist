import React from 'react';
import PropTypes from 'prop-types';
import Slot from 'rsg-components/Slot';
import SectionHeadingRenderer from 'rsg-components/SectionHeading/SectionHeadingRenderer';
import getUrl from '../../utils/getUrl';

interface SectionHeadingProps {
	children?: React.ReactNode;
	id: string;
	slotName: string;
	slotProps: object;
	depth: number;
	deprecated?: boolean;
	pagePerSection?: boolean;
}

const SectionHeading: React.FunctionComponent<SectionHeadingProps> = ({
	slotName,
	slotProps,
	children,
	id,
	pagePerSection,
	...rest
}) => {
	const href = pagePerSection
		? getUrl({ slug: id, id: rest.depth !== 1, takeHash: true })
		: getUrl({ slug: id, anchor: true });
	return (
		<SectionHeadingRenderer
			toolbar={<Slot name={slotName} props={slotProps} />}
			id={id}
			href={href}
			{...rest}
		>
			{children}
		</SectionHeadingRenderer>
	);
};

SectionHeading.propTypes = {
	children: PropTypes.node,
	id: PropTypes.string.isRequired,
	slotName: PropTypes.string.isRequired,
	slotProps: PropTypes.object.isRequired,
	depth: PropTypes.number.isRequired,
	deprecated: PropTypes.bool,
	pagePerSection: PropTypes.bool,
};

export default SectionHeading;
