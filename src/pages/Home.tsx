import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Unsplash, { toJson } from 'unsplash-js';
import axios from 'axios';
import './Home.css';

require('dotenv').confid();

const REACT_APP_API_KEY = process.env.API_KEY;

const Home: React.FC = () => {
  const [images, setImages] = useState(['']);
  const [loaded, setIsLoaded] = useState(false);
  const [searchText, setSearchText] = useState('');

  // SET API KEY
  const unsplash = new Unsplash({ accessKey: { REACT_APP_API_KEY } });

  const fetchImages = ({ count = 9 }) => {
    const apiRoot = 'https://source.unsplash.com';
    const accessKey = API_KEY;

    unsplash.photos
      .getRandomPhoto({ count: { count }, collections: 'town' })
      .then(toJson)
      .then((json: { data: any }) => {
        setImages([...images, ...json.data]);
        setIsLoaded(true);
      });
    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then((res) => {
        setImages([...images, ...res.data]);
        setIsLoaded(true);
      });
  };

  React.useEffect(() => {
    fetchImages();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}></IonSearchbar>
        <div>This is wehere the images will go</div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
