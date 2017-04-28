import React from 'react';

export function createSimpleJsDocTagTest(Renderer, tag) {
	return describe(Renderer.displayName, () => {
		const oneTag = {
			[tag]: [{
				title: tag,
				description: 'Test *description*',
			}],
		};

		const twoTags = {
			[tag]: [{
				title: tag,
				description: 'Test description',
			}, {
				title: tag,
				description: 'I should not be visible',
			}],
		};

		it('renderer should render', () => {
			const actual = render(
				<Renderer classes={{}} tags={oneTag} />
			);

			expect(actual).toMatchSnapshot();
		});

		it(`renderer should only render one ${tag} tag`, () => {
			const actual = render(
				<Renderer classes={{}} tags={twoTags} />
			);

			expect(actual.text().includes('I should not be visible')).toBe(false);
		});


		it('renderer should not render for empty tags', () => {
			const actual = shallow(
				<Renderer classes={{}} tags={{}} />
			);

			expect(actual.node).toBe(null);
		});
	});
}
