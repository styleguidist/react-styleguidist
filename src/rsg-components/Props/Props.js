/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import React, { PropTypes } from 'react';
import PropsRenderer from './PropsRenderer';
import PropsFlowRenderer from './PropsFlowRenderer';

const Props = (props) => (
	<div>
		{props.flow ? <PropsFlowRenderer props={props.props} /> : <PropsRenderer props={props.props} />}
	</div>
);

Props.propTypes = {
	flow: PropTypes.bool,
	props: PropTypes.object.isRequired,
};

export default Props;
