import { 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonChip, 
  IonLabel, 
  IonButton, 
  IonIcon, 
  IonItem, 
  IonButtons 
} from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  type: string;
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const FoodCard = ({ id, name, description, type, isAdmin, onEdit, onDelete }: FoodCardProps) => {
  // Función para asignar colores a las etiquetas según el tipo de platillo
  const getTypeColor = (type: string) => {
    const typeMap: Record<string, string> = {
      "Plato Fuerte": "primary",
      "Bebida": "secondary",
      "Postre": "tertiary",
      "Entrada": "medium",
    };
    return typeMap[type] || "medium";
  };

  return (
    // Reemplazamos <Card> con <IonCard>
    <IonCard>
      {/* En Ionic, en lugar de un CardHeader y CardTitle separados, 
        a menudo se usa un IonItem para estructurar el encabezado.
      */}
      <IonItem lines="none">
        <div slot="start" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <IonCardTitle>{name}</IonCardTitle>
          {/* Reemplazamos <Badge> con <IonChip> */}
          <IonChip color={getTypeColor(type)}>
            <IonLabel>{type}</IonLabel>
          </IonChip>
        </div>
        
        {isAdmin && (
          // <IonButtons> es el contenedor para botones en una toolbar o item
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