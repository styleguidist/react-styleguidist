import React, { PropTypes } from 'react';
import Downloads from 'rsg-components/Downloads';

const ROUTES = {
	DEFAULT: 'Default',
	DOWNLOADS: 'Downloads'
};

const Renderer = ({ title, components, toc, routeName }) => (
	<div>
		<main>
			{((routeName) => {
				switch(routeName) {
					case ROUTES.DOWNLOADS:
						return <Downloads />
					default:
						return (
							<div>
								<div>
									{components}
									<footer>
										Generated with <a href="https://github.com/sapegin/react-styleguidist">React Styleguidist</a>
									</footer>
								</div>
							</div>
						)
				}
			})(routeName)}
		</main>
	</div>
);

Renderer.propTypes = {
	title: PropTypes.string.isRequired,
	components: PropTypes.object.isRequired,
	toc: PropTypes.node.isRequired,
};

export default Renderer;
