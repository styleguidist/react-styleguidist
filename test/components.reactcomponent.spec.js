import ReactComponent from 'rsg-components/ReactComponent';
import Markdown from 'rsg-components/Markdown';

describe('ReactComponent', () => {

	it('should render component properties', () => {
		let component = {
			name: 'Foo',
			relativePath: 'foo/bar.js',
			props: {
				description: 'Bar'
			}
		};
		let result = <ReactComponent highlightTheme="foo" component={component}/>;
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
