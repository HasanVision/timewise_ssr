import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

export type CustomSession = session.Session & Partial<session.SessionData>;