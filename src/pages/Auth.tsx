import { useState } from "react";
import { useHistory } from "react-router-dom"; // CAMBIO AQUÍ
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

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); // CAMBIO AQUÍ
  const [presentToast] = useIonToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication (in real app, this would be backend)
    if (username === "admin" && password === "cocina2024") {
      localStorage.setItem("isAdmin", "true");
      presentToast({
        message: '¡Bienvenido! Inicio de sesión exitoso.',
        duration: 2000,
        color: 'success'
      });
      history.push("/admin"); // CAMBIO AQUÍ
    } else {
      presentToast({
        message: 'Usuario o contraseña incorrectos.',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <IonCard style={{ maxWidth: '450px' }}>
            <IonCardHeader className="ion-text-center">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                  <div style={{
                      height: '64px',
                      width: '64px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-primary-shade))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}>
                      <IonIcon icon={restaurantOutline} style={{ fontSize: '32px', color: 'white' }} />
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
                    onIonChange={(e) => setUsername(e.detail.value!)}
                    required
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Contraseña</IonLabel>
                  <IonInput
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    required
                  />
                </IonItem>
                  <IonButton type="submit" expand="block" className="ion-margin-top">
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