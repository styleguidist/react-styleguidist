import { RsgComponent } from '../../typings/RsgComponent';

/**
 * Return a copy of the given component with the examples array filtered
 * to contain only the specified index:
 * filterComponentExamples({ examples: [1,2,3], ...other }, 2) → { examples: [3], ...other }
 *
 * @param {object} component
 * @param {number} index
 * @returns {object}
 */
export default function filterComponentExamples(
	component: RsgComponent,
	index: number
): RsgComponent {
	return {
		...component,
		props: {
			...component.props,
			examples:
				component.props && component.props.examples ? [component.props.examples[index]] : [],
		},
	};
}
