module.exports = {
  apps: [
    {
      name: 'strapi',
      script: './node_modules/.bin/strapi',
      args: 'start',
      cwd: '/var/www/humandrinks-strapi',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
