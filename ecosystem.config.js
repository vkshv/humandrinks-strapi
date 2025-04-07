module.exports = {
  apps: [
    {
      name: 'strapi',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/humandrinks-strapi',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
