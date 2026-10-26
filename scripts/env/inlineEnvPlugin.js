/**
 * Babel plugin: replaces `process.env.APP_NAME` with the configured literal at
 * bundle time (React Native has no runtime `process.env` for custom values).
 * Declared-but-unset variables become `undefined` so the typed configuration
 * module can report them clearly. Undeclared names are left untouched.
 */
const path = require('node:path');
const { loadEnv } = require('./loadEnv');

let cached;
function getEnv() {
  cached ??= loadEnv(path.resolve(__dirname, '../..'));
  return cached;
}

module.exports = function inlineEnvPlugin({ types: t }) {
  const isProcessEnv = node =>
    t.isMemberExpression(node) &&
    t.isIdentifier(node.object, { name: 'process' }) &&
    t.isIdentifier(node.property, { name: 'env' });

  return {
    name: 'dermahealth-inline-env',
    visitor: {
      MemberExpression(nodePath) {
        const { node } = nodePath;
        if (!isProcessEnv(node.object)) {
          return;
        }
        const name = node.computed
          ? t.isStringLiteral(node.property)
            ? node.property.value
            : null
          : node.property.name;
        const { declared, values } = getEnv();
        if (!name || !declared.includes(name)) {
          return;
        }
        nodePath.replaceWith(
          name in values ? t.stringLiteral(values[name]) : t.identifier('undefined'),
        );
      },
    },
  };
};
