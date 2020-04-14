import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonActionSheet,
} from '@ionic/react';
import './Downloads.css';
import { usePhotoGallery, Photo } from '../hooks/usePhotoGallery';
import { trash, close } from 'ionicons/icons';

const Downloads: React.FC = () => {
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();
  const { photos, deletePhoto } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Downloads</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size='6' key={index}>
                <img
                  onClick={() => setPhotoToDelete(photo)}
                  alt=''
                  src={photo.base64 ?? photo.webviewPath}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[
            {
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: () => {
                if (photoToDelete) {
                  deletePhoto(photoToDelete);
                  setPhotoToDelete(undefined);
                }
              },
            },
            {
              text: 'Cancel',
              icon: close,
              role: 'cancel',
            },
          ]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
      </IonContent>
    </IonPage>
  );
};

export default Downloads;
