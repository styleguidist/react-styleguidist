/// <reference types="webpack-dev-server" />
import { Configuration } from 'webpack';
import * as Rsg from '../typings';
export default function (config: Rsg.SanitizedStyleguidistConfig, env: 'development' | 'production' | 'none'): Configuration;
