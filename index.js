#!/usr/bin/env node
const { cli } = require('./dist/cli/cli');
const cfg = require('./package.json');

cli(cfg.version);
