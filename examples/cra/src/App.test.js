import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';

it('renders without crashing', () => {
	const div = document.createElement('div');
	createRoot(<App />, div);
});
