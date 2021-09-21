import React from 'react';
import PropTypes from 'prop-types';
declare function ComponentsRenderer({ children }: {
    children: React.ReactNode;
}): JSX.Element;
declare namespace ComponentsRenderer {
    var propTypes: {
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    };
}
export default ComponentsRenderer;
