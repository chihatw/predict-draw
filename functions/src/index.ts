import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
// CORS対策参考:
// https://qiita.com/qrusadorz/items/40234ac0b5c5c2315cad
// https://stackoverflow.com/questions/24897801/enable-access-control-allow-origin-for-multiple-domains-in-node-js

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://predict-draw.vercel.app',
];

export const deleteIpInfo = functions.https.onRequest(async (req, res) => {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
    const collection = req.query.collection as string;
    console.log({ collection });
    if (['liSans', 'kouSans'].includes(collection)) {
      const ipInfo = req.query.ipInfo as string;
      console.log({ ipInfo });
      // doc が存在しなくても error にならない
      try {
        await admin.firestore().collection(collection).doc(ipInfo).delete();
        console.log('deleted');
        res.json({
          result: `One of ${collection} with ID: ${ipInfo} deleted.`,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('incorrect collection');
      res.json({ result: `Incorrect collection: ${collection}` });
    }
  } else {
    console.log('incorrect origin');
    res.json({ result: `Incorrect origin: ${origin}` });
  }
});
