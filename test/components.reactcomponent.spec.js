import ReactComponent from 'rsg-components/ReactComponent';
import Renderer from 'rsg-components/ReactComponent/Renderer';
import Markdown from 'rsg-components/Markdown';

import {createRenderer} from 'react-addons-test-utils';

const ComponentRenderer = ReactComponent(Renderer);

describe('ReactComponent', () => {

	it('should render component properties', () => {
		let component = {
			name: 'Foo',
			pathLine: 'foo/bar.js',
			props: {
				description: 'Bar'
			}
		};
		let result = <ComponentRenderer highlightTheme="foo" component={component}/>;

		expectReactShallow(result).to.have.rendered(
			<div>
				<header>
					<h2>Foo</h2>
					<div>foo/bar.js</div>
				</header>
				<div>
					<Markdown text="Bar"/>
				</div>
			</div>
		);
	});

});
