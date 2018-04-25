#!/usr/bin/env node
process.env.MRBUILDER_INTERNAL_PRESETS='';
process.env.MRBUILDER_INTERNAL_PLUGINS='react-styleguidist-builder';

require('mrbuilder/bin/mrbuilder');
