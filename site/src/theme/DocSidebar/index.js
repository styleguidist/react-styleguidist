import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useScript from '@charlietango/use-script';
import DocSidebarBase from '@theme-original/DocSidebar';
import styles from './styles.module.css';

const SCRIPT_URL = 'https://media.ethicalads.io/media/client/ethicalads.min.js';
const PUBLISHER_ID = 'react-styleguidist';

function Extra({ path }) {
	// Load the EthicalAds script
	useScript(SCRIPT_URL);

	// Update the ad on navigation
	useEffect(() => {
		if (window.ethicalads) {
			window.ethicalads.load_placements();
		}
	}, [path]);

	return (
		<div className={styles.extra}>
			<div data-ea-publisher={PUBLISHER_ID} data-ea-type="image" className="bordered"></div>
		</div>
	);
}

Extra.propTypes = {
	path: PropTypes.string.isRequired,
};

function DocSidebar({ showExtra, ...props }) {
	return (
		<div className={styles.sidebar}>
			<DocSidebarBase {...props} />
			{showExtra && <Extra path={props.path} />}
		</div>
	);
}

DocSidebar.propTypes = {
	showExtra: PropTypes.bool,
	path: PropTypes.string.isRequired,
};

DocSidebar.defaultProps = {
	showExtra: true,
};

export default DocSidebar;
