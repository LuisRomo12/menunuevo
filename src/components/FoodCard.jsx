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

const FoodCard = ({ id, name, description, type, isAdmin, onEdit, onDelete }) => {
  // Función para asignar colores a las etiquetas según el tipo de platillo
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
    <IonCard>
      <IonItem lines="none">
        <div slot="start" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <IonCardTitle>{name}</IonCardTitle>
          <IonChip color={getTypeColor(type)}>
            <IonLabel>{type}</IonLabel>
          </IonChip>
        </div>
        
        {isAdmin && (
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => onEdit?.(id)}>
              <IonIcon slot="icon-only" icon={pencil} color="primary" />
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