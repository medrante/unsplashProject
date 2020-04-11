import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Downloads.css';

const Downloads: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Downloads</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Downloads</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name='Downloads page' />
      </IonContent>
    </IonPage>
  );
};

export default Downloads;
