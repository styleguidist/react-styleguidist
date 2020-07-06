import React from 'react';
import PropTypes from 'prop-types';
import useScript from '@charlietango/use-script';
import DocSidebarBase from '@theme-original/DocSidebar';
import styles from './styles.module.css';

const SCRIPT_URL = 'https://media.ethicalads.io/media/client/ethicalads.min.js';
const PUBLISHER_ID = 'react-styleguidist';

function Extra() {
	useScript(SCRIPT_URL);
	return (
		<div className={styles.extra}>
			<div data-ea-publisher={PUBLISHER_ID} data-ea-type="image" className="bordered"></div>
		</div>
	);
}

function DocSidebar({ showExtra, ...props }) {
	return (
		<div className={styles.sidebar}>
			<DocSidebarBase {...props} />
			{showExtra && <Extra />}
		</div>
	);
}

DocSidebar.propTypes = {
	showExtra: PropTypes.bool,
};

DocSidebar.defaultProps = {
	showExtra: true,
};

export default DocSidebar;
