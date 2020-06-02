import React from 'react';
import PropTypes from 'prop-types';
import useScript from '@charlietango/use-script';
import DocSidebarBase from '@theme-original/DocSidebar';
import styles from './styles.module.css';

const SCRIPT_URL = 'https://app.codefund.io/properties/135/funder.js';

function Extra() {
	useScript(SCRIPT_URL);
	return <div id="codefund" className={styles.extra}></div>;
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
