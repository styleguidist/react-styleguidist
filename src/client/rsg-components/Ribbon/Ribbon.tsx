import React from 'react';
import RibbonRenderer from 'rsg-components/Ribbon/RibbonRenderer';
import { useStyleGuideContext } from 'rsg-components/Context';

export default function Ribbon() {
	const {
		config: { ribbon },
	} = useStyleGuideContext();
	return ribbon ? <RibbonRenderer {...ribbon} /> : null;
}
