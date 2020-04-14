import { useState, useEffect } from 'react';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { FilesystemDirectory } from '@capacitor/core';
import { Image } from '../pages/Home';

const PHOTO_STORAGE = 'photos';

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { deleteFile, readFile, writeFile } = useFilesystem();
  const { get, set } = useStorage();

  useEffect(() => {
    const loadSaved = async () => {
      const photosString = await get('photos');
      const photosInStorage = (photosString
        ? JSON.parse(photosString)
        : []) as Photo[];
      setPhotos(photosInStorage);
    };
    try {
      loadSaved();
    } catch (e) {
      console.log('Error Loading Photos');
    }
  }, [get, readFile]);

  const downloadPhoto = async (image: Image) => {
    const fileName = image.id + '.jpeg';
    const savedFileImage = await savePicture(image, fileName);
    const newPhotos = [savedFileImage, ...photos];
    setPhotos(newPhotos);
    set(
      PHOTO_STORAGE,
      JSON.stringify(
        newPhotos.map((p) => {
          // Don't save the base64 representation of the photo data,
          // since it's already saved on the Filesystem
          const photoCopy = { ...p };
          delete photoCopy.base64;
          return photoCopy;
        })
      )
    );
    alert('Download complete!');
  };

  const savePicture = async (photo: Image, fileName: string) => {
    let base64Data: string;
    base64Data = await base64FromPath(photo.webPath!);
    await writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data,
    });
    return getPhotoFile(photo, fileName);
  };

  const getPhotoFile = async (
    cameraPhoto: Image,
    fileName: string
  ): Promise<Photo> => {
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath,
    };
  };

  const deletePhoto = async (photo: Photo) => {
    // Remove this photo from the Photos reference data array
    const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);

    // Update photos array cache by overwriting the existing photo array
    set(PHOTO_STORAGE, JSON.stringify(newPhotos));

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await deleteFile({
      path: filename,
      directory: FilesystemDirectory.Data,
    });
    setPhotos(newPhotos);
  };

  return {
    deletePhoto,
    downloadPhoto,
    savePicture,
    photos,
  };
}

export interface Photo {
  filepath: string;
  webviewPath?: string;
  base64?: string;
}
