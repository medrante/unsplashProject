import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Liked.css';

const Liked: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liked Images</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Liked Images</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name='Liked Images page' />
      </IonContent>
    </IonPage>
  );
};

export default Liked;
