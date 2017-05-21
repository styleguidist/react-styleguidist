import React from 'react';
import PropTypes from 'prop-types';
import MdLink from 'react-icons/lib/md/link';
import ToolbarButton from 'rsg-components/ToolbarButton';
import { getUrl } from '../../utils/utils';

const LinkButton = ({ slug }) => (
	<ToolbarButton href={getUrl({ slug, anchor: true })} title="Link to this component">
		<MdLink />
	</ToolbarButton>
);

LinkButton.propTypes = {
	slug: PropTypes.string.isRequired,
};

export default LinkButton;
