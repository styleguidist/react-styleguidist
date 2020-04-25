import jssBase from 'jss';
import jss from '../setupjss';

describe('setupjss', () => {
	it('should renerate prefixed class names', () => {
		const { classes } = jss.createStyleSheet({
			root: {},
		});
		expect(classes.root).toMatch(/^rsg--\w+-\d+$/);
	});

	it('jss-global plugin should be enabled', () => {
		const css = jss
			.createStyleSheet({
				'@global body': {
					color: 'red',
				},
			})
			.toString();
		expect(css).toMatch(/^body {/);
	});

	it('jss plugins should be enabled', () => {
		const stylesheet = jss.createStyleSheet({
			root: {
				backgroundColor: 'tomato',
				width: 1,
				'&:hover': {
					color: 'snow',
				},
			},
			child: {
				composes: '$root',
				color: 'blue',
			},
		});

		const root = (stylesheet.getRule('root') as any).style;
		expect(root).toEqual(expect.any(Object));
		expect(root['background-color']).toBe('tomato');
		expect(root.width).toBe('1px');
		expect(stylesheet.classes.root).toMatch(/^rsg--root-\d+$/);

		const child = (stylesheet.getRule('child') as any).style;
		expect(child).toEqual(expect.any(Object));
		expect(child.color).toBe('blue');
		expect(stylesheet.classes.child).toMatch(/^rsg--child-\d+ rsg--root-\d+$/);

		const hover = (stylesheet as any).rules.map['.rsg--root-2:hover'];
		expect(hover).toEqual(expect.any(Object));
		expect(hover.style.color).toBe('snow');
	});

	it('base jss instance setup shoud not affect Styleguidist styles', () => {
		jssBase.setup();

		const stylesheet = jss.createStyleSheet({
			root: {
				width: 1,
			},
		});

		expect(stylesheet.classes.root).toMatch(/^rsg--root-\d+$/);

		const root = (stylesheet.getRule('root') as any).style;
		expect(root.width).toBe('1px');
	});
});
