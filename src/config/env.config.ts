export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'DEV',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3002,
  seed: process.env.SEED,
  hostsmtp: process.env.HOSTSMTP,
  portsmtp: process.env.PORTSMTP,
  usersmtp: process.env.USERSMTP,
  passwordsmtp: process.env.PASSWORDSMTP,
});
