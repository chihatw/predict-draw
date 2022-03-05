import { doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Layout from '../../Layout';
import { db } from '../../repositories/firebase';

const COLLECTION = 'liSans';

const perpetuateIpInfo = async ({
  collection,
  setIpInfo,
}: {
  collection: string;
  setIpInfo: (ipInfo: string) => void;
}) => {
  const res = await window.fetch(
    `https://ipinfo.io?callback&token=${import.meta.env.VITE_IPINFO_TOKEN}`
  );
  const { ip, city, region, country } = ((await res.json()) as {
    ip: string;
    city: string;
    region: string;
    country: string;
  }) || {
    ip: '',
    city: '',
    region: '',
    country: '',
  };
  const ipInfo = [country, region, city, ip]
    .join('_')
    .replaceAll('.', '')
    .replaceAll('/', '');

  setIpInfo(ipInfo);
  await setDoc(doc(db, collection, ipInfo), {});
};

const removeIpInfo = async ({
  ipInfo,
  collection,
}: {
  ipInfo: string;
  collection: string;
}) => {
  if (!!ipInfo) {
    const url = `https://us-central1-predict-draw.cloudfunctions.net/deleteIpInfo?collection=${collection}&ipInfo=${ipInfo}`;
    window.navigator.sendBeacon(url);
  }
};

const LisanPage = () => {
  const [ipInfo, setIpInfo] = useState('');
  useEffect(() => {
    perpetuateIpInfo({
      setIpInfo,
      collection: COLLECTION,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      removeIpInfo({
        ipInfo,
        collection: COLLECTION,
      });
    });
    return () => {
      removeIpInfo({
        ipInfo,
        collection: COLLECTION,
      });
    };
  }, [ipInfo]);
  return <Layout user='liSan'></Layout>;
};

export default LisanPage;
