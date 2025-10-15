import { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonNote
} from '@ionic/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './ChangeLog.css';

const ChangeLog = () => {
  const [log, setLog] = useState([]);

  useEffect(() => {
    const savedLog = localStorage.getItem("changeLog");
    if (savedLog) {
      setLog(JSON.parse(savedLog));
    }
  }, []);

  const getActionColor = (action) => {
    switch (action) {
      case 'Agregado':
        return 'success';
      case 'Editado':
        return 'warning';
      case 'Eliminado':
        return 'danger';
      default:
        return 'medium';
    }
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin" />
          </IonButtons>
          <IonTitle>Historial de Cambios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Historial</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList className="log-list">
          {log.length > 0 ? (
            log.map((entry, index) => (
              <IonItem key={index} lines="inset">
                <IonLabel>
                  <h2 className="log-entry-title">
                    <span className={`log-action-badge log-action-${getActionColor(entry.action)}`}>
                      {entry.action}
                    </span>
                    {entry.foodName}
                  </h2>
                  <p className="log-entry-day">Día: {entry.day}</p>
                  <IonNote className="log-entry-timestamp">
                    {format(new Date(entry.timestamp), "d 'de' MMMM, yyyy - h:mm:ss a", { locale: es })}
                  </IonNote>
                </IonLabel>
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel className="ion-text-center">
                <p>No hay cambios registrados todavía.</p>
              </IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ChangeLog;