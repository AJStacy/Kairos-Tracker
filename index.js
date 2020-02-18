#!/usr/bin/env node
const { cli } = require('./dist');
const cfg = require('./package.json');

cli(cfg.version);
