import slots from './index';
import IsolateButton from './IsolateButton';

describe('slots', () => {
	it('should contain IsolateButton in toolbars if pagePerSection is false', () => {
		const config = slots({ pagePerSection: false });
		expect(config.componentToolbar).toContain(IsolateButton);
		expect(config.exampleToolbar).toContain(IsolateButton);
		expect(config.sectionToolbar).toContain(IsolateButton);
	});

	it('should not contain IsolateButton in toolbars if pagePerSection is true', () => {
		const config = slots({ pagePerSection: true });
		expect(config.componentToolbar).not.toContain(IsolateButton);
		expect(config.exampleToolbar).not.toContain(IsolateButton);
		expect(config.sectionToolbar).not.toContain(IsolateButton);
	});
});
