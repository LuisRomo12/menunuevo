import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Tus imports de CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

/* Tus páginas */
import Index from './pages/Index';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import ChangeLog from './pages/ChangeLog'; // <- Este es el import importante

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={Index} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/admin" component={Admin} />
        {/* Aquí está la nueva ruta */}
        <Route exact path="/changelog" component={ChangeLog} /> 
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;