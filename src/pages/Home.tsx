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
  IonCol,
  IonIcon,
  IonCardSubtitle,
  IonRow,
} from '@ionic/react';
import axios from 'axios';
import './Home.css';
import { download, shuffle } from 'ionicons/icons';
import moment from 'moment';
import { usePhotoGallery } from '../hooks/usePhotoGallery';

require('dotenv').config();

const API_KEY = process.env.REACT_APP_API_KEY;

export interface Image {
  id: string;
  url: string;
  webPath: string;
  user: string;
  exif: string;
  location: string;
}

const Home: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loaded, setIsLoaded] = useState(false);
  const [status, setStatus] = useState('');
  const [searchText, setSearchText] = useState('');
  const { downloadPhoto } = usePhotoGallery();

  const keyPressed = (e: any) => {
    if (e.key === 'Enter') {
      fetchImages(1, searchText);
      setSearchText('');
    }
  };

  const fetchImages = (count: number, query: string) => {
    const apiRoot = 'https://api.unsplash.com';
    let getUrl = `${apiRoot}/photos/random/?query=${query}&orientation=squarish&client_id=${API_KEY}&count=${count}`;

    // this is for development!
    if (API_KEY !== null) {
      if (query === 'random') {
        getUrl = `${apiRoot}/photos/random/?orientation=squarish&client_id=${API_KEY}&count=${count}`;
      }
      console.log(getUrl);
      axios.get(getUrl).then((res) => {
        if (res.status === 403) {
          setStatus('limited');
        }
        let temp = res.data[0];
        let tempData = {
          id: temp.id,
          url: temp.urls.regular,
          webPath: temp.urls.raw,
          user: temp.user.name,
          exif: temp.exif,
          location: temp.location.name,
        };
        setImages([tempData]);
        setIsLoaded(true);
      });
    }
  };

  useEffect(() => {
    fetchImages(1, 'old+town');
  }, []);

  const getRandomImage = () => {
    fetchImages(1, 'random');
  };

  const getDate = () => {
    const date = moment().utcOffset('+05:30').format('DD MMM YYYY');
    return date;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol size='1'></IonCol>
          <IonCol size='10'>
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => setSearchText(e.detail.value!)}
              onKeyPress={(e) => keyPressed(e)}></IonSearchbar>
          </IonCol>
          <IonCol size='1'></IonCol>
        </IonRow>

        <br></br>
        {loaded ? (
          images.map((image, i) => (
            <IonList key={i}>
              <IonCard
                className='polaroid ion-padding ion-padding-bottom'
                slot='center'>
                <img width='380px' height='380px' alt='' src={image.webPath} />
                <br></br>
                <IonCardSubtitle>
                  <div className='polaroid-title ion-text-lg-center'>
                    {getDate()}
                  </div>
                </IonCardSubtitle>
              </IonCard>
              <IonRow>
                <IonCol></IonCol>
                <IonCol className='ion-text-center'>
                  <button>
                    <IonIcon
                      icon={shuffle}
                      size='large'
                      onClick={(e) => {
                        getRandomImage();
                      }}></IonIcon>
                  </button>
                  <button>
                    <IonIcon
                      icon={download}
                      size='large'
                      onClick={(e) => {
                        downloadPhoto(image);
                      }}></IonIcon>
                  </button>
                </IonCol>
                <IonCol></IonCol>
              </IonRow>
            </IonList>
          ))
        ) : status === 'limited' ? (
          <div>API Limit Exceeded!</div>
        ) : (
          <div>Please wait!</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
