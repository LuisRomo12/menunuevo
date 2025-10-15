import { useState } from "react";
import { useHistory } from "react-router-dom";
import { 
  IonContent, 
  IonPage, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  useIonToast,
  IonIcon
} from '@ionic/react';
import { restaurantOutline } from 'ionicons/icons';
import './Auth.css'; // Importamos nuestro nuevo CSS

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [presentToast] = useIonToast();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "cocina2024") {
      localStorage.setItem("isAdmin", "true");
      presentToast({
        message: '¡Bienvenido! Inicio de sesión exitoso.',
        duration: 2000,
        color: 'success'
      });
      history.push("/admin");
    } else {
      presentToast({
        message: 'Usuario o contraseña incorrectos.',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  return (
    <IonPage className="auth-page">
      <IonContent fullscreen>
        <div className="auth-container">
          <IonCard style={{ maxWidth: '450px' }}>
            <IonCardHeader className="ion-text-center">
              <div className="auth-icon-wrapper">
                <div className="auth-icon">
                  <IonIcon icon={restaurantOutline} />
                </div>
              </div>
              <IonCardTitle>Panel de Administración</IonCardTitle>
              <IonCardSubtitle>Ingresa tus credenciales para continuar</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <form onSubmit={handleLogin}>
                <IonItem>
                  <IonLabel position="floating">Usuario</IonLabel>
                  <IonInput
                    type="text"
                    placeholder="Ingresa tu usuario"
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value)}
                    required
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Contraseña</IonLabel>
                  <IonInput
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value)}
                    required
                  />
                </IonItem>
                <IonButton type="submit" expand="block">
                  Ingresar
                </IonButton>
                <IonButton type="button" expand="block" fill="outline" routerLink="/">
                  Volver al Menú
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Auth;