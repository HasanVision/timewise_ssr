
// TODO: CHECK THE CODE BELOW AND SEE IF IT CAN BE USED TO GET THE IP ADDRESS OF THE USER
// import { IPInfo } from '../../models/ipInfo';
// import { Request, Response, NextFunction } from 'express';
// import https from 'https';

// const fetchAndStoreIPInfo = async (req: Request, res: Response, next: NextFunction) => {
//   console.log('IP Middleware hit. Checking for user IP...');

//   try {
//     let userIp = req.connection.remoteAddress || '8.8.8.8'; // Default to public IP for testing

//     const options = {
//       path: `/${userIp}/json/`,
//       host: 'ipapi.co',
//       port: 443,
//       headers: { 'User-Agent': 'nodejs-ipapi-v1.02' },
//     };

//     https.get(options, function (resp) {
//       let body = '';
//       resp.on('data', function (data) {
//         body += data;
//       });

//       resp.on('end', async function () {
//         const loc = JSON.parse(body);
//         const {
//           ip,
//           version,
//           city,
//           region,
//           region_code,
//           country_code,
//           country_code_iso3,
//           country_name,
//           country_capital,
//           country_tld,
//           continent_code,
//           in_eu,
//           postal,
//           latitude,
//           longitude,
//           timezone,
//           utc_offset,
//           country_calling_code,
//           currency,
//           currency_name,
//           languages,
//           country_area,
//           country_population,
//           asn,
//           org,
//           hostname,
//         } = loc;

//         await IPInfo.create({
//           ip,
//           version,
//           city,
//           region,
//           region_code,
//           country_code,
//           country_code_iso3,
//           country_name,
//           country_capital,
//           country_tld,
//           continent_code,
//           in_eu,
//           postal,
//           latitude,
//           longitude,
//           timezone,
//           utc_offset,
//           country_calling_code,
//           currency,
//           currency_name,
//           languages,
//           country_area,
//           country_population,
//           asn,
//           org,
//           hostname,
//         });

//         console.log('IP info stored successfully');
//         next();
//       });
//     });
//   } catch (error) {
//     console.error('Error fetching or storing IP info:', error);
//     next();
//   }
// };

// export default fetchAndStoreIPInfo;

import axios from 'axios';
import { IPInfo } from '../../models/ipInfo';
import { Request, Response, NextFunction } from 'express';

const fetchAndStoreIPInfo = async (req: Request, res: Response, next: NextFunction) => {
  console.log('IP Middleware hit. Checking for user IP...');

  try {
    let userIp: string | undefined;

    if (req.headers['x-forwarded-for']) {
      const forwardedIps = (req.headers['x-forwarded-for'] as string).split(',').map(ip => ip.trim());
      userIp = forwardedIps[0];
    }

    if (!userIp) {
      userIp = req.connection.remoteAddress || undefined;
    }

    if (userIp === '127.0.0.1' || userIp === '::1') {
      userIp = '8.8.8.8'; // Public IP for testing
    }

    if (!userIp) {
      return next();
    }

    const response = await axios.get(`http://ipapi.co/${userIp}/json/`);
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
      return next();
    }

    const userId = req.session?.userId;
    if (!userId) {
      return next();
    }

    const existingIP = await IPInfo.findOne({
      where: { userId, ip },
    });

    if (existingIP) {
      console.log(`Existing IP found: ${existingIP.ip}. Current request count: ${existingIP.requestCount}`);

      // Ensure increment happens
      const newRequestCount = existingIP.requestCount + 1;
      await existingIP.save();  // Ensure the change is saved to the database
      console.log(`Updated request count for IP ${userIp}: ${existingIP.requestCount}`);

      console.log(`Updated request count for IP ${userIp}: ${newRequestCount}`);

      // const existingIP = await IPInfo.findOne({
      //   where: { ip },
      //   order: [['createdAt', 'DESC']],
      // });
      
      // if (existingIP && Date.now() - existingIP.createdAt.getTime() < 24 * 60 * 60 * 1000) {
      //   console.log('Using cached IP info.');
      //   return next();
      // }
    } else {
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
        requestCount: 1,
      });
      console.log('IP info stored successfully');
    }

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error('Error fetching or storing IP info:', error);
    next();
  }
};

export default fetchAndStoreIPInfo;


