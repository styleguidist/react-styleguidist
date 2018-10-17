import globalizeComponents from '../globalizeComponents';

beforeEach(() => {
	global.RsgUserComponents = {};
});

afterEach(() => {
	delete global.RsgUserComponents;
});

describe('globalizeComponents', () => {
	it('should set all components’ modules as a global variables', () => {
		globalizeComponents([
			{
				components: [
					{
						name: 'Foo',
						props: {},
						module: 13,
					},
				],
				sections: [
					{
						components: [
							{
								name: 'Bar',
								props: {},
								module: 14,
							},
						],
					},
				],
			},
		]);
		expect(Object.keys(global.RsgUserComponents).length).toBe(2);
		expect(global.RsgUserComponents.Foo).toBe(13);
		expect(global.RsgUserComponents.Bar).toBe(14);
	});
});
