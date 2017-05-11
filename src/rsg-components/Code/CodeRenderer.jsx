import React, { PropTypes } from 'react';

import s from '../Markdown/Markdown.css';

const CodeRenderer = ({ className, children, plain }) => (
  <span className={className}>
    {plain
      ? <plaintext className={s.plain}>{children}</plaintext>
      : <code className={s.code}>{children}</code>
    }
  </span>
);

CodeRenderer.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  children: PropTypes.node,
};

export default CodeRenderer;
