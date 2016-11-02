import React from 'react';
import Layout from 'rsg-components/Layout';
import Renderer from 'rsg-components/Layout/Renderer';

export default function StyleGuide(props) {
	const LayoutRenderer = Layout(Renderer);

	return (
        <div className="rsg-style-guide">
            <LayoutRenderer {...props} />
        </div>
	);
}
