import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: number;
    // testKey: string;
  }
}

export type CustomSession = session.Session & Partial<session.SessionData>;