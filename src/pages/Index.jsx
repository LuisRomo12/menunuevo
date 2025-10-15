import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonFooter
} from '@ionic/react';
import FoodCard from "../components/FoodCard";
import { initialMenuData } from "../data/menuData";
import { shieldCheckmarkOutline } from 'ionicons/icons';

const Index = () => {
  const [menuData] = useState(initialMenuData);
  const [selectedDay, setSelectedDay] = useState(menuData[0].day);

  const activeDayMenu = menuData.find(day => day.day === selectedDay);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Cafetería UTA</IonTitle>
          <IonButton slot="end" fill="clear" color="light" href="/auth">
            <IonIcon slot="start" icon={shieldCheckmarkOutline} />
            Admin
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Menú Semanal</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSegment
          value={selectedDay}
          onIonChange={e => setSelectedDay(e.detail.value)}
          scrollable
        >
          {menuData.map((day) => (
            <IonSegmentButton key={day.day} value={day.day}>
              <IonLabel>{day.day}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        <div className="ion-padding-top">
          {activeDayMenu ? (
            <>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{activeDayMenu.day}</h2>
              <p style={{ color: '#666', fontSize: '0.875rem' }}>
                {activeDayMenu.foods.length} platillo{activeDayMenu.foods.length !== 1 ? "s" : ""} disponible{activeDayMenu.foods.length !== 1 ? "s" : ""}
              </p>

              <div className="ion-padding-top">
                {activeDayMenu.foods.length > 0 ? (
                  activeDayMenu.foods.map((food) => (
                    <FoodCard
                      key={food.id}
                      id={food.id}
                      name={food.name}
                      description={food.description}
                      type={food.type}
                    />
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 0', color: '#666' }}>
                    <p>No hay platillos disponibles para este día.</p>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <div className="ion-text-center ion-padding-vertical" style={{ fontSize: 'small' }}>
            <p>Universidad Tecnológica de Aguascalientes</p>
            <p style={{ marginTop: '0.25rem' }}>Menú Digital - Cafetería</p>
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Index;