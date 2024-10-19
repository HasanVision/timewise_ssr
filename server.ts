import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import db from './models/index.js';
import { sessionConfig } from './src/api/middlewares/config/sessionConfig.js';
import bodyParser from 'body-parser';
import authRoutes from './src/api/auth/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


export function app(): express.Express {
  

  
  const server = express();
  server.use(bodyParser.json());
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use(sessionConfig);

  

  server.use(cors({
    origin: 'http://localhost:4200',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true  
  }));
  server.options('*', cors());  
  
  server.use('/api', authRoutes);

  // server.use('/api', (req, res, next) => {
  //   console.log('API Route hit', req.url);
  //   next();
  // });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));


  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    console.log('Request URL:', `${protocol}://${headers.host}${originalUrl}`);

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

async function run(): Promise<void> {
  const port = process.env['PORT'] || 4000;

  try {

    await db.sequelize.authenticate();
    // await db.sequelize.sync();  // This ensures that the models are synced with the database
    console.log('Database connected successfully.');
    await db.sequelize.sync({ alter: true })

    console.log('All models were synchronized successfully.');

 
    const server = app();
    server.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);  
  }
}

run();
