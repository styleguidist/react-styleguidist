// Get docs from the docs folder and each preset and task

const { readFileSync, writeFileSync, emptyDirSync } = require('fs-extra');
const glob = require('glob');
const { kebabCase } = require('lodash');

const DEST_DIR = 'docs';

const read = (file) => readFileSync(file, 'utf8');

const write = (file, contents) => writeFileSync(`${DEST_DIR}/${file}.md`, contents);

const getTitle = (contents) => contents.match(/^#\s*(.*?)$/m) || [];

const getSidebarTitle = (contents) => contents.match(/^<!--\s*(.*?)(?:\s*#([\w-]+))?\s*-->/) || [];

const stripTitle = (contents) => contents.replace(/^#.*?$/m, '');

const markdownToDocusaurus = (contents) =>
	contents.replace(
		/^>\s*\*\*(\w+):\*\*\s*(.*?)$/gm,
		(_, $1, $2) => `:::${$1.toLowerCase()}\n${$2}\n:::`
	);

const htmlToXml = (contents) => contents.replace(/<br>/g, '<br />');

const getEditUrl = (relativePath) =>
	`https://github.com/styleguidist/react-styleguidist/edit/master/${relativePath.replace(
		'../docs',
		'docs'
	)}`;

const template = ({ id, title, sidebarLabel, editUrl, contents }) => `---
id: ${id}
title: ${title}
sidebar_label: ${sidebarLabel}
custom_edit_url: ${getEditUrl(editUrl)}
---

${stripTitle(htmlToXml(markdownToDocusaurus(contents)))}`;

emptyDirSync(DEST_DIR);

console.log('Syncing docs...');

const docs = glob.sync('../docs/*.md');
docs.forEach((filepath) => {
	console.log(`👉 ${filepath}`);
	const contents = read(filepath);
	const [, title] = getTitle(contents);
	const [, sidebarLabel = title, customId] = getSidebarTitle(contents);
	const id = customId || kebabCase(sidebarLabel);
	write(
		id,
		template({
			id,
			title,
			sidebarLabel,
			editUrl: filepath,
			contents,
		})
	);
});
