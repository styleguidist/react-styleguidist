/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import React, { PropTypes } from 'react';
import Examples from 'rsg-components/Examples';
import Components from 'rsg-components/Components';
import SectionRenderer from 'rsg-components/Section/SectionRenderer';

export default function Section({
  section,
  sidebar,
}) {
	const { name, content, components, sections } = section;
	const contentJsx = content && (
	<Examples examples={content} />
  );
	const componentsJsx = (components || sections) && (
	<Components
		components={components || []}
		sections={sections || []}
		sidebar={sidebar}
	/>
  );
	return (
		<SectionRenderer
			name={name}
			content={contentJsx}
			components={componentsJsx}
		/>
 );
}

Section.propTypes = {
	section: PropTypes.object.isRequired,
	sidebar: PropTypes.bool,
};
