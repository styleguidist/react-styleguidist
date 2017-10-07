import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';
import FaFileTextO from 'react-icons/lib/fa/file-text-o';
import ToolbarButton from 'rsg-components/ToolbarButton';
import Footer from './FooterRenderer';
import Sidebar from './SidebarRenderer';
import { mq } from '../../styles/theme';

const styles = ({ color, sidebarWidth, mq, space, maxWidth }) => ({
	root: {
		color: color.base,
		backgroundColor: color.baseBackground,
		transition: 'padding-left 200ms ease-in-out',
	},
	sidebarActions: {
		position: 'fixed',
		left: space[2],
		bottom: space[2],
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
			sidebarVisible: window.innerWidth >= mq.smallValue,
		};

		this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
		this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
	}

	componentWillMount() {
		window.addEventListener('resize', this.handleWindowSizeChange);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange() {
		this.setState({ sidebarVisible: window.innerWidth >= mq.smallValue });
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
				{hasSidebar ? (
					<Sidebar
						title={title}
						toc={toc}
						toggleAllProps={toggleAllProps}
						sidebarVisible={sidebarVisible}
						onToggleSidebar={this.handleToggleSidebar}
						styles={classes.sidebarActions}
					/>
				) : (
					<ToolbarButton
						onClick={toggleAllProps}
						title="Toggle Focus Mode"
						className={classes.sidebarActions}
					>
						<FaFileTextO />
					</ToolbarButton>
				)}
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
