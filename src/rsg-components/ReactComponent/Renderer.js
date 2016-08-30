import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';

const s = require('./ReactComponent.css');

const Renderer = ({ name, pathLine, description, propList, examples, sidebar }) => {
	let designContent = sidebar.designContent;
	let tags = sidebar.tags;

	sidebar = sidebar.isIsolated;

	const string = `
		*, *:after, *:before {
		  -webkit-box-sizing: border-box;
		  -moz-box-sizing: border-box;
		  box-sizing: border-box;
		}

		.grid:after {
			content: "";
			display: table;
			clear: both;
		}

		.col {
			float: left;
			width: 50%;
			padding-right: 20px;
		}

		.col:last-of-type {
			padding-right: 0;
		}
	`;

	return (
		<div className={s.root + ' grid'}>
			{!sidebar &&
				<div className="col">
					<style>{string}</style>
					<Markdown text={designContent} />
				</div>
			}
			<div className="col">
				<header className={s.header}>
					<h2 className={s.heading} id={name}>
						{name}
					</h2>
					{sidebar && 
						<div className={s.pathLine}>
							{tags && tags.map(tag => <span key={tag} style={{border: '2px solid blue', padding: '2px', marginRight: '5px'}}>{tag}</span>)}
						</div>
					}
					{sidebar ? (
						<a className={s.isolatedLink} href={'#!/' + name}>Open isolated ⇢</a>
					) : (
						<a className={s.isolatedLink} href="#">← Back</a>
					)}
				</header>
				{!sidebar &&
					<div>
						{description}
						{propList}
						{examples}
					</div>
				}
			</div>
		</div>
	);
};

Renderer.propTypes = {
	name: PropTypes.string.isRequired,
	pathLine: PropTypes.string.isRequired,
	description: PropTypes.object,
	propList: PropTypes.object,
	examples: PropTypes.array,
	sidebar: PropTypes.object,
};

export default Renderer;
