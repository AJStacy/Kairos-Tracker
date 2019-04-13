export default ({
  compileEnhancements: false,
  require: [
    'ts-node/register/transpile-only',
  ],
  files: [
    'test/**/*.ts',
  ],
  sources: [
    'src/**/*.ts',
  ],
  verbose: true,
  extensions: [
    'ts',
  ],
});
