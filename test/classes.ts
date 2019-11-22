import keymirror from 'keymirror';
import * as theme from '../src/client/styles/theme';

export default (styles: (theme: RsgTheme) => any) => keymirror(styles(theme));
