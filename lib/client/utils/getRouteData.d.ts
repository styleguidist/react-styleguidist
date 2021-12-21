import * as Rsg from '../../typings';
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
export default function getRouteData(sections: Rsg.Section[], hash: string, pagePerSection?: boolean): {
    sections: Rsg.Section[];
    displayMode: string;
};
