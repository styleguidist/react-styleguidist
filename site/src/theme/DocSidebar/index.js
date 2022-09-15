import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useScript from '@charlietango/use-script';
import DocSidebarBase from '@theme-original/DocSidebar';
import styles from './styles.module.css';

const SCRIPT_URL = 'https://media.ethicalads.io/media/client/ethicalads.min.js';
const PUBLISHER_ID = 'react-styleguidist';

function Extra({ path }) {
	// Load the EthicalAds script
	useScript(SCRIPT_URL);

	const adElement = useRef(null);

	// Update the ad on navigation
	useEffect(() => {
		if (window.ethicalads) {
			adElement.current?.classList.add(styles.hidden);
			adElement.current?.classList.remove('loaded');
			window.ethicalads.load_placements();
			setTimeout(() => {
				adElement.current?.classList.remove(styles.hidden);
			}, 500);
		}
	}, [path]);

	return (
		<div className={styles.extra}>
			<div
				ref={adElement}
				data-ea-publisher={PUBLISHER_ID}
				data-ea-type="image"
				data-ea-keywords="frontend|react"
				className="bordered"
			></div>
		</div>
	);
}

Extra.propTypes = {
	path: PropTypes.string.isRequired,
};

function DocSidebar({ showExtra, ...props }) {
	return (
		<div className={styles.sidebar}>
			{showExtra && <Extra path={props.path} />}
			<DocSidebarBase {...props} />
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
