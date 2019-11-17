import keymirror from 'keymirror';
import * as theme from '../src/client/styles/theme';
import { Theme } from '../src/typings/Theme';

export default (styles: (theme: Theme) => any) => keymirror(styles(theme));
