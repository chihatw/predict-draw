import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../../../../repositories/firebase';
import { CUE_CARDS } from '../CUE_CARDS';

const getImages = async (blobURLs: { [imagePath: string]: string }) => {
  const updatedBlobURLs: { [imagePath: string]: string } = {};
  await Promise.all(
    Object.values(CUE_CARDS).map(async (cueCard) => {
      if (!!cueCard.imagePath) {
        let _blobURL = '';

        if (blobURLs[cueCard.imagePath]) {
          _blobURL = blobURLs[cueCard.imagePath];
        } else {
          console.log('get imageBlob');
          const downloadURL = await getDownloadURL(
            ref(storage, cueCard.imagePath)
          );
          const response = await fetch(downloadURL);
          const blob = await response.blob();
          _blobURL = window.URL.createObjectURL(blob);
        }
        updatedBlobURLs[cueCard.imagePath] = _blobURL;
      }
    })
  );
  return updatedBlobURLs;
};

export default getImages;
