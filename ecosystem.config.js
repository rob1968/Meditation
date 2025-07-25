module.exports = {
  apps: [
    {
      name: 'meditation-backend',
      script: './backend/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 5002
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5002,
        HOST: '127.0.0.1'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: 'pihappy.me',
      ref: 'origin/main',
      repo: 'git@github.com:yourusername/meditation-app.git',
      path: '/var/www/vhosts/pihappy.me/meditation-app',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build:production && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};