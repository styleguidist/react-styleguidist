import keymirror from 'keymirror';
import * as theme from '../src/client/styles/theme';

export default (styles: (theme: Rsg.Theme) => any) => keymirror(styles(theme));
