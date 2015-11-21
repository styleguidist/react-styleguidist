import ReactDOMServer from 'react-dom/server';

import Markdown from 'rsg-components/Markdown';

describe('Markdown', () => {

	it('should render Markdown with custom CSS classes', () => {
		let markdown = `
# Header

Text with *some* **formatting** and a [link](/foo).

![Image](/bar.png)
`;
		let expected = `
<span class="_src_rsg_components_Markdown_Markdown__root _src_styles_common__font">
	<h3 class="_src_rsg_components_Markdown_Markdown__h3">Header</h3>
	<p class="_src_rsg_components_Markdown_Markdown__p">Text with <em class="_src_rsg_components_Markdown_Markdown__em">some</em> <strong class="_src_rsg_components_Markdown_Markdown__strong">formatting</strong> and a <a href="/foo" class="_src_rsg_components_Markdown_Markdown__a _src_styles_colors__link">link</a>.</p>
	<p class="_src_rsg_components_Markdown_Markdown__p"><img alt="Image" src="/bar.png"/></p>
</span>`.replace(/[\n\t]/g, '');
		let actual = ReactDOMServer.renderToStaticMarkup(<Markdown text={markdown}/>);

		expect(actual).to.eql(expected);
	});

});
