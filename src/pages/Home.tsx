import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonCard,
  IonList,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import fetch from 'node-fetch';
import axios from 'axios';
import './Home.css';
import Toggle from '../components/Toggle';

require('dotenv').config();

const API_KEY = '3za5nSrvbEgp_yu7U2oknDbXgzzmz5YonO8angKgUIY';

const Home: React.FC = () => {
  const [images, setImages] = useState(['']);
  const [loaded, setIsLoaded] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchImages = (count: number) => {
    const apiRoot = 'https://api.unsplash.com';
    const accessKey = API_KEY;

    // unsplash.photos
    //   .getRandomPhoto({ count: count, collections: ['town'] })
    //   .then(toJson)
    //   .then((json) => {
    //     console.log(json);
    //     // Your code
    //   });
    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then((res) => {
        console.log(res);
        // setImages({ data: res.data });
        setIsLoaded(true);
      });
    console.log(images);
  };
  const onSearchSubmit = async (term: string) => {
    axios
      .get('https://source.unsplash.com/collection/town/480x480')
      .then(({ request }) => {
        // setImages([...images, res.data]);
        // setImages([...images, request['responseURL']]);
        setImages([request['responseURL']]);
      });
  };

  useEffect(() => {
    onSearchSubmit('town');
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
        <br></br>
        <div>This is where the images will go</div>

        {images.map((image: string, i) => (
          <IonList key={i}>
            <IonCard
              className='ion-align-self-center ion-padding'
              slot='center'>
              <div className='ion-align-items-center'>
                <img width='480px' height='480px' src={image} />
              </div>
            </IonCard>
          </IonList>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
