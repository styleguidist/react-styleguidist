import globalizeComponents from '../globalizeComponents';

describe('globalizeComponents', () => {
	it('should set all components’ modules as a global variables', () => {
		const globalsCount = Object.keys(global).length;
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
		expect(Object.keys(global).length).toBe(globalsCount + 2);
		expect(global.Foo).toBe(13);
		expect(global.Bar).toBe(14);
	});
});
