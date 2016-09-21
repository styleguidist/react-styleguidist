import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';

const Renderer = ({ name, pathLine, description, propList, examples, sidebar, designContent, tags }) => {
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
		<div>
			{!sidebar &&
				<div>
					<style>{string}</style>
					{designContent && <Markdown text={designContent.content} />}
				</div>
			}
			<div>
				<header>
					<h2 id={name}>
						{name}
					</h2>
					{sidebar && 
						<div>
							{tags && tags.map(tag => <span key={tag}>{tag}</span>)}
						</div>
					}
					{sidebar ? (
						<a href={'#!/' + name}>Open isolated ⇢</a>
					) : (
						<a href="#">← Back</a>
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
	sidebar: PropTypes.bool,
};

export default Renderer;
