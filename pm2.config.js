module.exports = {
  apps: [
    {
      exec_mode: 'cluster',
      instances: 'max',
      name: 'NodeJS Concept Api',
      script: './src/bin/server.js',
      watch: false,
    },
  ],
}
