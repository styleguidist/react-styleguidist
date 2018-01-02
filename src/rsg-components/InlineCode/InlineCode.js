import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export function InlineCode({ children, className }) {

  const isHighlighted = className && className.indexOf('lang-') !== -1;

  if (isHighlighted) {
    return <code className={className} dangerouslySetInnerHTML={{ __html: children }} />;
  }

  return (
    <span className="InlineCode">
			<code className="InlineCode__code">{children}</code>
		</span>
  );
}

InlineCode.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default InlineCode;
