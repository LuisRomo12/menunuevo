import { 
  IonCard, 
  IonCardContent, 
  IonChip, 
  IonLabel, 
  IonButton, 
  IonIcon, 
  IonItem, 
  IonButtons,
  IonCardTitle
} from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import './FoodCard.css'; // Importamos nuestro nuevo archivo CSS

const FoodCard = ({ id, name, description, type, isAdmin, onEdit, onDelete }) => {
  // ADAPTACIÓN: Esta función ahora devuelve los nombres de los colores de Ionic
  const getTypeColor = (type) => {
    const typeMap = {
      "Plato Fuerte": "primary",
      "Bebida": "secondary",
      "Postre": "tertiary",
      "Entrada": "medium",
    };
    return typeMap[type] || "medium";
  };

  return (
    <IonCard className="food-card"> {/* Aplicamos nuestra clase CSS */}
      <IonItem lines="none">
        <div slot="start" style={{ flex: 1 }}>
          <IonCardTitle>{name}</IonCardTitle>
          <IonChip color={getTypeColor(type)}>
            <IonLabel>{type}</IonLabel>
          </IonChip>
        </div>
        
        {isAdmin && (
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => onEdit?.(id)}>
              <IonIcon slot="icon-only" icon={pencil} />
            </IonButton>
            <IonButton fill="clear" onClick={() => onDelete?.(id)}>
              <IonIcon slot="icon-only" icon={trash} color="danger" />
            </IonButton>
          </IonButtons>
        )}
      </IonItem>

      <IonCardContent>
        {description}
      </IonCardContent>
    </IonCard>
  );
};

export default FoodCard;