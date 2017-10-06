import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';
import Footer from './FooterRenderer';
import Sidebar from './SidebarRenderer';

const styles = ({ color, sidebarWidth, mq, space, maxWidth }) => ({
	root: {
		color: color.base,
		backgroundColor: color.baseBackground,
		transition: 'padding-left 200ms ease-in-out',
	},
	hasSidebar: {
		paddingLeft: sidebarWidth,
		[mq.small]: {
			paddingLeft: 0,
		},
	},
	content: {
		maxWidth,
		padding: [[space[2], space[4]]],
		margin: [[0, 'auto']],
		[mq.small]: {
			padding: space[2],
		},
		display: 'block',
	},
});

class StyleGuideRenderer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarVisible: true,
		};

		this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
	}

	handleToggleSidebar() {
		this.setState({ sidebarVisible: !this.state.sidebarVisible });
	}

	render() {
		const { classes, title, homepageUrl, children, toc, hasSidebar, toggleAllProps } = this.props;
		const { sidebarVisible } = this.state;

		return (
			<div className={cx(classes.root, hasSidebar && sidebarVisible && classes.hasSidebar)}>
				<main className={classes.content}>
					{children}
					<Footer homepageUrl={homepageUrl} />
				</main>
				<Sidebar
					title={title}
					hasSidebar={hasSidebar}
					toc={toc}
					toggleAllProps={toggleAllProps}
					sidebarVisible={sidebarVisible}
					onToggleSidebar={this.handleToggleSidebar}
				/>
			</div>
		);
	}
}

StyleGuideRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	homepageUrl: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	toc: PropTypes.node.isRequired,
	hasSidebar: PropTypes.bool,
	toggleAllProps: PropTypes.func,
};

export default Styled(styles)(StyleGuideRenderer);
