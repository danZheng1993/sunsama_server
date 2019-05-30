// @flow

// Database Settings
export const MONGO_URI = process.env.MONGO || 'mongodb://localhost:27017/myserver';

export const jwtSecret = process.env.SECRET || 'awesome_secret';

export const port = process.env.PORT || 3000;
