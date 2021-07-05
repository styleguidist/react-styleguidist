import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Row, Column } from '../components/Column';
import { Stack } from '../components/Stack';
import { List } from '../components/List';
import { ImageLink } from '../components/ImageLink';
import { VideoImage } from '../components/VideoImage';
import styles from './learn.module.css';

const sections = [
	{
		title: 'Video courses',
		items: [
			{
				title: 'React Styleguidist essentials',
				href: 'https://egghead.io/playlists/react-styleguidist-essentials-627f',
				image: '/img/rsgcourse.png',
				type: 'video',
			},
			{
				title: 'Component-driven development in React',
				href: 'https://egghead.io/playlists/component-driven-development-in-react-e0bf',
				image: '/img/cddcourse.png',
				type: 'video',
			},
		],
	},
	{
		title: 'Workshops',
		description: (
			<Stack gap="m">
				<p>
					Learn how to create resilient component libraries using React Styleguidist from its
					maintainers at{' '}
					<Link
						href="https://component-driven.dev/offerings"
						target="_blank"
						rel="noopener noreferrer"
					>
						Component-driven
					</Link>
					.
				</p>
				<Link
					href="https://component-driven.dev/offerings"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.componentDrivenHero}
				>
					<img src="/img/component-driven-inverted.svg" alt="Component-driven" />
				</Link>
			</Stack>
		),
	},
	{
		title: 'Articles',
		links: [
			{
				title: 'Front-End Documentation, Style Guides and the Rise of MDX',
				href: 'https://css-tricks.com/front-end-documentation-style-guides-and-the-rise-of-mdx/',
			},
			{
				title: 'How to Visualise Your Components with React Styleguidist',
				href: 'https://medium.com/simply/3-react-styleguidist-c7f67830f40a',
			},
			{
				title: 'React Components Living Style Guides Overview',
				href: 'https://www.nearform.com/blog/react-components-living-style-guides-overview/',
			},
			{
				title: 'Storybook vs Styleguidist: A comparison of the top UI component explorers',
				href: 'https://blog.hichroma.com/storybook-vs-styleguidist-2bd93d6dcc06',
			},
		],
	},
	{
		title: 'Talks',
		links: [
			{
				title: 'Using React Styleguidist The Wrong Way by Bogdan Kolbik',
				href: 'https://youtu.be/2J0WtYfPc-A',
			},
			{
				title: 'Scalable Design Systems with TypeScript by Tejas Kumar',
				href: 'https://youtu.be/ZsBW4S8hYMU',
			},
			{
				title: 'The Dream of Styleguide Driven Development by Sara Vieira',
				href: 'https://youtu.be/JjXnmhNW8Cs',
			},
		],
	},
];

const EditIcon = () => (
	<svg
		fill="currentColor"
		height="1.2em"
		width="1.2em"
		preserveAspectRatio="xMidYMid meet"
		viewBox="0 0 40 40"
		style={{
			marginRight: '0.3em',
			verticalAlign: 'sub',
		}}
	>
		<g>
			<path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z" />
		</g>
	</svg>
);

function Learn() {
	return (
		<Layout
			title="Learn React Styleguidist"
			description="Video courses, workshops, talks, articles and other learning resources about React Styleguidist"
		>
			<Stack gap="l" className="container padding-vert--lg">
				<Stack gap="m" as="header">
					<h1>Learn React Styleguidist</h1>
					<p>
						Learn how to use React Styleguidist efficiently from its creators and the community.
					</p>
				</Stack>
				{sections.map((section) => (
					<Stack key={section.title} gap="m" as="section">
						<h2>{section.title}</h2>
						{section.description}
						{section.links && (
							<List>
								{section.links.map((link) => (
									<li key={link.href}>
										<Link href={link.href} target="_blank" rel="noopener noreferrer">
											{link.title}
										</Link>
									</li>
								))}
							</List>
						)}
						{section.items && (
							<Row>
								{section.items.map((item) => (
									<Column key={item.href} size={6}>
										<ImageLink href={item.href}>
											<Stack gap="xs">
												{item.type === 'video' && <VideoImage src={item.image} alt="" />}
												<div>{item.title}</div>
											</Stack>
										</ImageLink>
									</Column>
								))}
							</Row>
						)}
					</Stack>
				))}
				<p>
					<Link
						href="https://github.com/styleguidist/react-styleguidist/edit/master/site/src/pages/learn.js"
						target="_blank"
						rel="noopener noreferrer"
					>
						<EditIcon />
						Edit this page
					</Link>
				</p>
			</Stack>
		</Layout>
	);
}

export default Learn;
