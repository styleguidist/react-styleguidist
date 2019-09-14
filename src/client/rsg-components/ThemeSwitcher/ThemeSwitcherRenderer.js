import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import map from 'lodash/map';

const styles = ({ color, fontFamily, fontSize }) => ({
	themeSwitcher: {
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.base,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export function ThemeSwitcherRenderer({ classes, themes, currentTheme, onThemeSwitch }) {
	const handleThemeSwitch = e => onThemeSwitch(e.target.value);

	return (
		<span className={classes.themeSwitcher}>
			Theme
			<select value={currentTheme} onBlur={handleThemeSwitch} onChange={handleThemeSwitch}>
				{map(themes, ({ id }) => (
					<option key={id}>{id}</option>
				))}
			</select>
		</span>
	);
}

ThemeSwitcherRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	themes: PropTypes.array.isRequired,
	currentTheme: PropTypes.string,
	onThemeSwitch: PropTypes.func.isRequired,
};

export default Styled(styles)(ThemeSwitcherRenderer);
