import slots, { EXAMPLE_ISOLATE } from './index';

describe('slots', () => {
	const findToolbarSlot = slot => slot.id === EXAMPLE_ISOLATE;

	it('should contain IsolateButton in toolbars if pagePerSection is false', () => {
		const config = slots({ pagePerSection: false });
		expect(config.componentToolbar.some(findToolbarSlot)).toBeTruthy();
		expect(config.exampleToolbar.some(findToolbarSlot)).toBeTruthy();
		expect(config.sectionToolbar.some(findToolbarSlot)).toBeTruthy();
	});

	it('should not contain IsolateButton in toolbars if pagePerSection is true', () => {
		const config = slots({ pagePerSection: true });
		expect(config.componentToolbar.some(findToolbarSlot)).toBeFalsy();
		expect(config.exampleToolbar.some(findToolbarSlot)).toBeFalsy();
		expect(config.sectionToolbar.some(findToolbarSlot)).toBeFalsy();
	});
});
