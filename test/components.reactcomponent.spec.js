import Markdown from 'rsg-components/Markdown';
import ReactComponent from 'rsg-components/ReactComponent';
import Renderer from 'rsg-components/ReactComponent/Renderer';

describe('ReactComponent', () => {

	it('should render component properties', () => {
		const component = {
			name: 'Foo',
			pathLine: 'foo/bar.js',
			props: {
				description: 'Bar'
			}
		};

		const RCComponentHOC = ReactComponent(Renderer);
		const RCComponent = new RCComponentHOC({component});

		expectReactShallow(RCComponent.render()).to.have.rendered(
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
