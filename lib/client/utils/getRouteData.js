import "core-js/modules/es.array.for-each";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/web.dom-collections.for-each";
import isFinite from 'lodash/isFinite';
import filterComponentExamples from './filterComponentExamples';
import filterComponentsInSectionsByExactName from './filterComponentsInSectionsByExactName';
import filterSectionExamples from './filterSectionExamples';
import findSection from './findSection';
import getInfoFromHash from './getInfoFromHash';
import { DisplayModes } from '../consts';

/**
 * Return sections / components / examples to show on a screen according to a current route.
 *
 * Default: show all sections and components.
 * #!/Button: show only Button section or Button component
 * #!/Button/1: show only the second example (index 1) of Button component
 *
 * @param {object} sections
 * @param {string} hash
 * @param {boolean} pagePerSection
 * @returns {object}
 */
export default function getRouteData(sections, hash, pagePerSection) {
  if (pagePerSection === void 0) {
    pagePerSection = false;
  }

  // Parse URL hash to check if the components list must be filtered
  var infoFromHash = getInfoFromHash(hash); // Name of the filtered component/section to show isolated (/#!/Button → Button)

  var targetName = infoFromHash.targetName,
      hashArray = infoFromHash.hashArray;
  var targetIndex = infoFromHash.targetIndex,
      isolate = infoFromHash.isolate;
  var displayMode = isolate ? DisplayModes.example : DisplayModes.all;

  if (pagePerSection && !targetName && sections[0] && sections[0].name) {
    // For default takes the first section when pagePerSection enabled
    targetName = sections[0].name;
    hashArray = [targetName];
  }

  if (targetName) {
    var filteredSections = [];

    if (pagePerSection && hashArray) {
      // hashArray could be an array as ["Documentation", "Files", "Button"]
      // each hashArray's element represent each section name with the same deep
      // so it should be filter each section to trying to find each one of array on the same deep
      hashArray.forEach(function (hashName, index) {
        // Filter the requested component if required but only on the first depth
        // so in the next time of iteration, it will be trying to filter only on the second depth and so on
        filteredSections = filterComponentsInSectionsByExactName(sections, hashName, !!isolate); // If filteredSections exists, its because is an array of an component
        // else it is an array of sections and depending his sectionDepth
        // his children could be filtered or not

        if (filteredSections.length) {
          sections = filteredSections;
        } else {
          var section = findSection(sections, hashName);

          if (section) {
            // Only if hashName is the last of hashArray his children should be filtered
            // because else there are possibilities to keep on filtering to try find the next section
            var isLastHashName = !hashArray || !hashArray[index + 1]; // When sectionDepth is bigger than 0, their children should be filtered

            var shouldFilterTheirChildren = (section.sectionDepth || 0) > 0 && isLastHashName;

            if (shouldFilterTheirChildren) {
              // Filter his sections and components
              section = Object.assign({}, section, {
                sections: [],
                components: []
              });
            }

            sections = [section];
          } else {
            sections = [];
          }
        }
      });

      if (!sections.length) {
        displayMode = DisplayModes.notFound;
      } // The targetName takes the last of hashArray


      targetName = hashArray[hashArray.length - 1];
    } else {
      // Filter the requested component if required
      filteredSections = filterComponentsInSectionsByExactName(sections, targetName, true);

      if (filteredSections.length) {
        sections = filteredSections;
        displayMode = DisplayModes.component;
      } else {
        var section = findSection(sections, targetName);
        sections = section ? [section] : [];
        displayMode = DisplayModes.section;
      }
    } // If a single component or section is filtered and a fenced block index is specified hide all other examples


    if (isFinite(targetIndex)) {
      if (filteredSections.length === 1) {
        var filteredComponents = filteredSections[0].components;
        sections = [Object.assign({}, filteredSections[0], {
          components: filteredComponents && typeof targetIndex === 'number' ? [filterComponentExamples(filteredComponents[0], targetIndex)] : []
        })];
        displayMode = DisplayModes.example;
      } else if (sections.length === 1) {
        sections = [filterSectionExamples(sections[0], targetIndex)];
        displayMode = DisplayModes.example;
      }
    }
  }

  return {
    sections: sections,
    displayMode: displayMode
  };
}