import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import map from 'lodash/map';

const styles = ({ color, fontFamily, fontSize }) => ({
	root: {
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.base,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export function ThemeSwitcherRenderer({ classes, themes, currentTheme, onThemeChange }) {
	const handleThemeChange = e => onThemeChange(e.target.value);

	return (
		<label className={classes.root}>
			Theme
			<select value={currentTheme} onBlur={handleThemeChange} onChange={handleThemeChange}>
				{map(themes, ({ id }) => (
					<option key={id}>{id}</option>
				))}
			</select>
		</label>
	);
}

ThemeSwitcherRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	themes: PropTypes.array.isRequired,
	currentTheme: PropTypes.string,
	onThemeChange: PropTypes.func.isRequired,
};

export default Styled(styles)(ThemeSwitcherRenderer);
