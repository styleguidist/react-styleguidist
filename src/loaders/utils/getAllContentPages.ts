/**
 * Get all section content pages.
 *
 * @param {Array} sections
 * @returns {Array}
 */
export default function getAllContentPages(sections: Rsg.ConfigSection[]): string[] {
	return sections.reduce((pages: string[], section) => {
		if (section.content) {
			pages = pages.concat([section.content]);
		}

		if (section.sections) {
			pages = pages.concat(getAllContentPages(section.sections));
		}

		return pages;
	}, []);
}
