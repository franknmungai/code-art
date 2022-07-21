// next.config.js
const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const withTM = require('next-transpile-modules')([
  // `monaco-editor` isn't published to npm correctly: it includes both CSS
  // imports and non-Node friendly syntax, so it needs to be compiled.
  'monaco-editor',
]);

module.exports = withTM({
  webpack: (config, options) => {
    const rule = config.module.rules
      .find((rule) => rule.oneOf)
      .oneOf.find(
        (r) =>
          // Find the global CSS loader
          r.issuer && r.issuer.include && r.issuer.include.includes('_app')
      );
    if (rule) {
      rule.issuer.include = [
        rule.issuer.include,
        // Allow `monaco-editor` to import global CSS:
        /[\\/]node_modules[\\/]monaco-editor[\\/]/,
      ];
    }

    // add env variables on client end
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    config.plugins.push(new Dotenv());

    if (!options.isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: [
            'json',
            'markdown',
            'css',
            'typescript',
            'javascript',
            'html',
            'graphql',
            'python',
            'scss',
            'yaml',
          ],
          filename: 'static/[name].worker.js',
        })
      );
    }
    return config;
  },

  env: {
    GITHUB_ID: process.env.NEXT_PUBLIC_GITHUB_ID,
    GITHUB_SECRET: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    STEPZEN_API_KEY: process.env.NEXT_PUBLIC_STEPZEN_API_KEY,
    NEXTAUTH_SECRET: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
  },
});
