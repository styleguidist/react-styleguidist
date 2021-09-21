import React from 'react';
var StyleGuideContext = React.createContext({
  codeRevision: 0,
  cssRevision: '0',
  config: {},
  slots: {},
  displayMode: 'collapse'
});
export default StyleGuideContext;
export function useStyleGuideContext() {
  return React.useContext(StyleGuideContext);
}