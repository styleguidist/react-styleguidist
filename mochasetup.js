import path from 'path';
import React from 'react';
import { expect } from 'chai';
import expectReactShallow from 'expect-react-shallow';
import mock from 'mock-require';
import hook from 'css-modules-require-hook';

hook({});

global.React = React;
global.expect = expect;
global.expectReactShallow = expectReactShallow;

// Allow requiring rsg-components/Smth
process.env.NODE_PATH = path.join(__dirname, 'src');
require('module').Module._initPaths();

// Mock Editor component because CodeMirror doesn’t work in Node
mock('rsg-components/Editor', {});
