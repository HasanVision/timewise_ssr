import session from 'express-session';
import SequelizeStoreInit from 'connect-session-sequelize';
import  db  from '../../models/db.js'; 


// Initialize Sequelize session store
const SequelizeStore = SequelizeStoreInit(session.Store);

export const sessionStore = new SequelizeStore({
  db: db.sequelize,
});

// Sync session table in the database
sessionStore.sync();

// Export session configuration
export const sessionConfig = session({
  secret: process.env['SESSION_SECRET'] || 'fallback-secret-key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // Session expiration time (1 day)
  },
});