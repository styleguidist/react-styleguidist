module.exports = {
	title: 'React Styleguidist',
	tagline: 'Isolated React component development environment with a living style guide',
	url: 'https://react-styleguidist.js.org/',
	baseUrl: '/',
	favicon: 'img/favicon.ico',
	organizationName: 'styleguidist',
	projectName: 'react-styleguidist',
	stylesheets: ['https://fonts.googleapis.com/css?family=Bree+Serif|Open+Sans:400,400i,700'],
	themeConfig: {
		colorMode: {
			disableSwitch: true,
		},
		prism: {
			// eslint-disable-next-line import/no-extraneous-dependencies
			theme: require('prism-react-renderer/themes/nightOwlLight'),
		},
		navbar: {
			hideOnScroll: false,
			title: 'React Styleguidist',
			items: [
				{
					to: 'docs/getting-started',
					activeBasePath: 'docs',
					label: 'Docs',
					position: 'right',
				},
				{
					to: 'learn',
					activeBasePath: 'learn',
					label: 'Learn',
					position: 'right',
				},
				{
					href: 'https://github.com/styleguidist/react-styleguidist',
					label: 'GitHub',
					position: 'right',
				},
				{
					href: 'https://twitter.com/styleguidist',
					label: 'Twitter',
					position: 'right',
				},
			],
		},
		footer: {
			links: [
				{
					title: 'Misc',
					items: [
						{
							label: 'Changelog',
							href: 'https://github.com/styleguidist/react-styleguidist/releases',
						},
						{
							label: 'Code of conduct',
							href:
								'https://github.com/styleguidist/react-styleguidist/blob/master/.github/Code_of_Conduct.md',
						},
					],
				},
				{
					title: 'Social',
					items: [
						{
							label: 'GitHub',
							href: 'https://github.com/styleguidist/react-styleguidist',
						},
						{
							label: 'Twitter',
							href: 'https://twitter.com/styleguidist',
						},
					],
				},
				{
					title: 'Sponsor',
					items: [
						{
							label: 'Open Collective',
							href: 'https://opencollective.com/styleguidist',
						},
						{
							label: 'Buy me a coffee',
							href: 'https://www.buymeacoffee.com/sapegin',
						},
					],
				},
			],
			copyright: `Made with coffee in Berlin by <a href="https://sapegin.me/" target="_blank" rel="noopener noreferrer">Artem Sapegin</a> and <a href="https://github.com/styleguidist/react-styleguidist/graphs/contributors" target="_blank" rel="noopener noreferrer">amazing contributors</a>. Logo: <a href="https://okonet.ru/" target="_blank" rel="noopener noreferrer">Andrey Okonetchnikov</a> and <a href="https://iamsaravieira.com/" target="_blank" rel="noopener noreferrer">Sara Vieira</a>. Hosting: <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a>`,
		},
		algolia: {
			apiKey: '0bd0dc976499f3a333c9d26416b4fee1',
			indexName: 'react_styleguidist',
			algoliaOptions: {},
		},
	},
	plugins: [require.resolve('./src/plugins/goatcounter-plugin.js')],
	presets: [
		[
			'@docusaurus/preset-classic',
			{
				debug: false,
				docs: {
					includeCurrentVersion: true,
					sidebarPath: require.resolve('./sidebars.js'),
					remarkPlugins: require('./remark'),
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			},
		],
	],
};
