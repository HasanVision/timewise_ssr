import axios from 'axios';
import { IPInfo } from '../../models/ipInfo';
import { Request, Response, NextFunction } from 'express';

const fetchAndStoreIPInfo = async (req: Request, res: Response, next: NextFunction) => {
  console.log('IP Middleware hit. Checking for user IP...');

  try {
    let userIp: string | undefined;

    if (req.headers['x-forwarded-for']) {
      console.log('Found forwarded IP:', req.headers['x-forwarded-for']);
      const forwardedIps = (req.headers['x-forwarded-for'] as string).split(',').map(ip => ip.trim());
      userIp = forwardedIps[0];
    }

    if (!userIp) {
      console.log('Falling back to remote address');
      userIp = req.connection.remoteAddress || undefined;
    }

    if (userIp === '127.0.0.1' || userIp === '::1') {
      console.log('Using public IP for local development');
      userIp = '8.8.8.8'; // Public IP for testing
    }

    console.log('Detected IP:', userIp);

    if (!userIp) {
      console.log('No IP address found');
      return next();
    }

    const response = await axios.get(`http://ipapi.co/${userIp}/json/`);
    console.log('IP API Response:', response.data);

    const {
      ip,
      country_name: countryName = '',
      region = '',
      city = '',
      postal = null,
      latitude = 0,
      longitude = 0,
      timezone = '',
      org = '',
      in_eu = false,
      country = '',
      region_code: regionCode = '',
      currency = null,
    } = response.data;

    if (!ip || !city || !country || !region) {
      console.log('Missing required IP info fields');
      return next();
    }

    const userId = req.session?.userId;
    if (!userId) {
      console.log('User not logged in, skipping IP info storage');
      return next();
    }

    const existingIP = await IPInfo.findOne({
      where: { userId, ip },
    });

    if (!existingIP) {
      await IPInfo.create({
        ip,
        userId,
        countryName,
        region,
        city,
        postal,
        latitude,
        longitude,
        timezone,
        org,
        in_eu,
        country,
        regionCode,
        currency,
      });
      console.log('IP info stored successfully');
    } else {
      console.log('IP info already exists for this user');
    }

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Error fetching or storing IP info:', error);
    next();
  }
};

export default fetchAndStoreIPInfo;

// declare module 'express-session' {
//   interface SessionData {
//     userId: number;
//   }
// }

// const fetchAndStoreIPInfo = async (req: Request, res: Response, next: NextFunction) => {
//   console.log('IP Middleware hit. Checking for user IP...');
//     try {
//       console.log('IP Middleware hit. Checking for user IP...');
      
//       let userIp: string | undefined;
  
//       if (req.headers['x-forwarded-for']) {
//         const forwardedIps = (req.headers['x-forwarded-for'] as string).split(',').map(ip => ip.trim());
//         userIp = forwardedIps[0];
//       }
  
//       if (!userIp) {
//         userIp = req.connection.remoteAddress || undefined;
//       }
  
//       // Handle local dev IPs by using a public IP for testing
//       if (userIp === '127.0.0.1' || userIp === '::1') {
//         userIp = '8.8.8.8';
//       }
  
//       console.log('Detected IP:', userIp);
  
//       if (!userIp) {
//         console.log('No IP address found');
//         return next();
//       }
  
//       const response = await axios.get(`http://ipapi.co/${userIp}/json/`);
//       console.log('IP API Response:', response.data);
  
//       const {
//         ip,
//         country_name: countryName = '',
//         region = '',
//         city = '',
//         postal = null,
//         latitude = 0,
//         longitude = 0,
//         timezone = '',
//         org = '',
//         in_eu = false,
//         country = '',
//         region_code: regionCode = '',
//         currency = null,
//       } = response.data;
  
//       if (!ip || !city || !country || !region) {
//         console.log('Missing required IP info fields');
//         return next();
//       }
  
//       const userId = req.session?.userId;
//       if (!userId) {
//         console.log('User not logged in, skipping IP info storage');
//         return next();
//       }
  
//       const existingIP = await IPInfo.findOne({
//         where: { userId, ip },
//       });
  
//       if (!existingIP) {
//         await IPInfo.create({
//           ip,
//           userId,
//           countryName,
//           region,
//           city,
//           postal,
//           latitude,
//           longitude,
//           timezone,
//           org,
//           in_eu,
//           country,
//           regionCode,
//           currency,
//         });
//         console.log('IP info stored successfully');
//       } else {
//         console.log('IP info already exists for this user');
//       }
  
//       next(); // Proceed to the next middleware
//     } catch (error) {
//       console.error('Error fetching or storing IP info:', error);
//       next();
//     }
//   };
  
//   export default fetchAndStoreIPInfo;

