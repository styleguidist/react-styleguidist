import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ComponentsList from 'rsg-components/ComponentsList';
import TableOfContentsRenderer from 'rsg-components/TableOfContents/TableOfContentsRenderer';
import styleguide from 'store/styleguide';
import filterSectionsByName from '../../utils/filterSectionsByName';
import filterByGroups from '../../utils/filterByGroups';

@observer
export default class TableOfContents extends Component {

	static propTypes = {
		sections: PropTypes.array.isRequired,
	};

	static contextTypes = {
		config: PropTypes.object,
	};

	state = {
		searchTerm: '',
	};


  /**
   * Filter section by:
   * - groups
   * - static styleguide = false
   * - remove empty sections
   * @param children
   * @return {*}
   */
	sectionsFilter(children) {

    // handle sections as array
    // those can contain sub sections
    if (Array.isArray(children) && children.length) {
      for (const section of children) {
        // more sections inside ?
        if (section.sections && section.sections.length) {
          for (let subSection of section.sections) {
            subSection = this.sectionsFilter(subSection);
          }
          section.sections = section.sections.filter((section) => {
            if (section.static) return true;
            return section.components.length;
          })
        }
      }
    // handle object
    // usually components ?
    } else {
      const groupsConfig = this.context.config.groups[styleguide.type];
      children.components = filterByGroups(children.components, groupsConfig);
      children.components = children.components.filter((comp) => {
        if (comp.module.default) {
          return comp.module.default.styleguide !== false;
        }
        const mod = Object.keys(comp.module);
        return comp.module[mod[0]].styleguide !== false;
      });
    }

    return children;
  }

	renderLevel(sections, parent = null) {
		const groupsConfig = this.context.config.groups[styleguide.type];

		sections = filterByGroups(sections, groupsConfig);

		if (!parent) {
      sections = this.sectionsFilter(sections);
    }

		const items = sections.map(section => {
			const children = [...(section.sections || []), ...(section.components || [])];
			return Object.assign({}, section, {
				heading: !!section.name && children.length > 0,
				content: children.length > 0 && this.renderLevel(children, section),
			});
		});

		return <ComponentsList items={items} />;
	}

	renderSections() {
    const { searchTerm } = this.state;
		const { sections } = this.props;

		// If there is only one section, we treat it as a root section
		// In this case the name of the section won't be rendered and it won't get left padding
		const firstLevel = sections.length === 1 ? sections[0].components : sections;
		const filtered = filterSectionsByName(firstLevel, searchTerm);

    return this.renderLevel(filtered);
	}

	render() {
		const { searchTerm } = this.state;
		return (
			<div>
				<TableOfContentsRenderer
					searchTerm={searchTerm}
					onSearchTermChange={searchTerm => this.setState({ searchTerm })}
				>
					{this.renderSections()}
				</TableOfContentsRenderer>
			</div>
		);
	}
}
