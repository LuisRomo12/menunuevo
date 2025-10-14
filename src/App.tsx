import { Redirect, Route, Switch } from 'react-router-dom'; // CAMBIO AQUÍ
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Importa los componentes de tus páginas
import Index from './pages/Index';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch> {/* CAMBIO: Switch en lugar de Routes */}
          {/* Sintaxis de React Router v5 */}
          <Route exact path="/" component={Index} /> {/* CAMBIO AQUÍ */}
          <Route exact path="/auth" component={Auth} /> {/* CAMBIO AQUÍ */}
          <Route exact path="/admin" component={Admin} /> {/* CAMBIO AQUÍ */}
          <Route component={NotFound} /> {/* Ruta catch-all para 404 */}
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;