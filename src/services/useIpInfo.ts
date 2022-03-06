import { doc, setDoc } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { db } from '../repositories/firebase';

const getCollection = (pathname: string) => {
  switch (pathname) {
    case '/liSan':
      return 'liSans';
    case '/kouSan':
      return 'kouSans';
    default:
      return '';
  }
};

// ipInfo の永続化
const perpetuateIpInfo = async ({
  pathname,
  setIpInfo,
}: {
  pathname: string;
  setIpInfo: (ipInfo: string) => void;
}) => {
  const collection = getCollection(pathname);
  if (!collection) return;

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

const removeIpInfo = ({
  ipInfo,
  pathname,
}: {
  ipInfo: string;
  pathname: string;
}) => {
  const collection = getCollection(pathname);
  if (!pathname || !ipInfo) return;

  const url = `https://us-central1-predict-draw.cloudfunctions.net/deleteIpInfo?collection=${collection}&ipInfo=${ipInfo}`;
  window.navigator.sendBeacon(url);
};

const useIpInfo = () => {
  const { pathname } = useLocation();

  const [ipInfo, setIpInfo] = useState('');
  useEffect(() => {
    perpetuateIpInfo({ pathname, setIpInfo });
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      removeIpInfo({ ipInfo, pathname });
    });
    return () => removeIpInfo({ ipInfo, pathname });
  }, [ipInfo, pathname]);
};

export default useIpInfo;
