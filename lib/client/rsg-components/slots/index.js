import Editor from 'rsg-components/Editor';
import Usage from 'rsg-components/Usage';
import IsolateButton from 'rsg-components/slots/IsolateButton';
import CodeTabButton from 'rsg-components/slots/CodeTabButton';
import UsageTabButton from 'rsg-components/slots/UsageTabButton';
export var EXAMPLE_TAB_CODE_EDITOR = 'rsg-code-editor';
export var DOCS_TAB_USAGE = 'rsg-usage';
var toolbar = [IsolateButton]; // eslint-disable-next-line @typescript-eslint/no-unused-vars

export default (function (config) {
  return {
    sectionToolbar: toolbar,
    componentToolbar: toolbar,
    exampleToolbar: toolbar,
    exampleTabButtons: [{
      id: EXAMPLE_TAB_CODE_EDITOR,
      render: CodeTabButton
    }],
    exampleTabs: [{
      id: EXAMPLE_TAB_CODE_EDITOR,
      render: Editor
    }],
    docsTabButtons: [{
      id: DOCS_TAB_USAGE,
      render: UsageTabButton
    }],
    docsTabs: [{
      id: DOCS_TAB_USAGE,
      render: Usage
    }]
  };
});