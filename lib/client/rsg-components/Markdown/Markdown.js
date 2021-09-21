import "core-js/modules/es.object.assign";
import React, { isValidElement } from 'react';
import PropTypes from 'prop-types';
import { compiler } from 'markdown-to-jsx';
import stripHtmlComments from 'strip-html-comments';
import Link from 'rsg-components/Link';
import Text from 'rsg-components/Text';
import Para from 'rsg-components/Para';
import MarkdownHeading from 'rsg-components/Markdown/MarkdownHeading';
import List from 'rsg-components/Markdown/List';
import Blockquote from 'rsg-components/Markdown/Blockquote';
import PreBase from 'rsg-components/Markdown/Pre';
import Code from 'rsg-components/Code';
import Checkbox from 'rsg-components/Markdown/Checkbox';
import Hr from 'rsg-components/Markdown/Hr';
import { Details, DetailsSummary } from 'rsg-components/Markdown/Details';
import { Table, TableHead, TableBody, TableRow, TableCell } from 'rsg-components/Markdown/Table';

var Pre = function Pre(props) {
  if (isValidElement(props.children)) {
    // Avoid rendering <Code> inside <Pre>
    return /*#__PURE__*/React.createElement(PreBase, props.children.props);
  }

  return /*#__PURE__*/React.createElement(PreBase, props);
};

Pre.propTypes = {
  children: PropTypes.node
};
export var baseOverrides = {
  a: {
    component: Link
  },
  h1: {
    component: MarkdownHeading,
    props: {
      level: 1
    }
  },
  h2: {
    component: MarkdownHeading,
    props: {
      level: 2
    }
  },
  h3: {
    component: MarkdownHeading,
    props: {
      level: 3
    }
  },
  h4: {
    component: MarkdownHeading,
    props: {
      level: 4
    }
  },
  h5: {
    component: MarkdownHeading,
    props: {
      level: 5
    }
  },
  h6: {
    component: MarkdownHeading,
    props: {
      level: 6
    }
  },
  p: {
    component: Para,
    props: {
      semantic: 'p'
    }
  },
  em: {
    component: Text,
    props: {
      semantic: 'em'
    }
  },
  strong: {
    component: Text,
    props: {
      semantic: 'strong'
    }
  },
  ul: {
    component: List
  },
  ol: {
    component: List,
    props: {
      ordered: true
    }
  },
  blockquote: {
    component: Blockquote
  },
  code: {
    component: Code
  },
  pre: {
    component: Pre
  },
  input: {
    component: Checkbox
  },
  hr: {
    component: Hr
  },
  table: {
    component: Table
  },
  thead: {
    component: TableHead
  },
  th: {
    component: TableCell,
    props: {
      header: true
    }
  },
  tbody: {
    component: TableBody
  },
  tr: {
    component: TableRow
  },
  td: {
    component: TableCell
  },
  details: {
    component: Details
  },
  summary: {
    component: DetailsSummary
  }
};
export var inlineOverrides = Object.assign({}, baseOverrides, {
  p: {
    component: Text
  }
});
export var Markdown = function Markdown(_ref) {
  var text = _ref.text,
      inline = _ref.inline;
  var overrides = inline ? inlineOverrides : baseOverrides;
  return compiler(stripHtmlComments(text), {
    overrides: overrides,
    forceBlock: true
  });
};
Markdown.propTypes = {
  text: PropTypes.string.isRequired,
  inline: PropTypes.bool
};
export default Markdown;