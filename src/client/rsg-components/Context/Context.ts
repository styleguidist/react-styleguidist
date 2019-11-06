import React from 'react';

const StyleGuideContext = React.createContext({});

export default StyleGuideContext;

export function useStyleGuideContext() {
	return React.useContext(StyleGuideContext);
}
