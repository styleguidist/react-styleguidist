import find from 'lodash/find';

/**
 * Recursively finds a section with a given name (exact match)
 *
 * @param  {Array}  sections
 * @param  {string} name
 * @return {object}
 */
export default function findSection(sections, name) {
  // We're using Lodash because IE11 doesn't support Array.find.
  var found = find(sections, {
    name: name
  });

  if (found) {
    return found;
  }

  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];

    if (!section.sections || section.sections.length === 0) {
      continue;
    }

    var foundInSubsection = findSection(section.sections, name);

    if (foundInSubsection) {
      return foundInSubsection;
    }
  }

  return undefined;
}