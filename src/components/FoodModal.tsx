import { useState, useEffect } from "react";
import { 
  IonModal, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonInput, 
  IonLabel, 
  IonTextarea, 
  IonSelect, 
  IonSelectOption, 
  IonItem, 
  IonButtons,
  IonFooter
} from "@ionic/react";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  type: string;
}

interface FoodModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (food: Omit<FoodItem, "id"> & { id?: string }) => void;
  food?: FoodItem | null;
}

const FoodModal = ({ open, onClose, onSave, food }: FoodModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (food) {
      setName(food.name);
      setDescription(food.description);
      setType(food.type);
    } else {
      // Resetear al abrir el modal para un nuevo platillo
      setName("");
      setDescription("");
      setType("");
    }
  }, [food, open]);

  const handleSave = () => {
    if (!name || !description || !type) {
      // Opcional: Mostrar una alerta si los campos están vacíos
      return;
    }
    onSave({ id: food?.id, name, description, type });
    onClose();
  };

  return (
    // Reemplazamos <Dialog> por <IonModal>
    <IonModal isOpen={open} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{food ? "Editar Platillo" : "Agregar Platillo"}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Cancelar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* En Ionic, los inputs suelen ir dentro de IonItem para un mejor estilo */}
        <IonItem>
          <IonLabel position="stacked">Nombre del Platillo</IonLabel>
          <IonInput
            placeholder="Ej: Tacos de Pollo"
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea
            placeholder="Describe el platillo..."
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
            rows={3}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Tipo</IonLabel>
          <IonSelect
            value={type}
            placeholder="Selecciona el tipo"
            onIonChange={(e) => setType(e.detail.value)}
          >
            <IonSelectOption value="Plato Fuerte">Plato Fuerte</IonSelectOption>
            <IonSelectOption value="Bebida">Bebida</IonSelectOption>
            <IonSelectOption value="Postre">Postre</IonSelectOption>
            <IonSelectOption value="Entrada">Entrada</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>
      <IonFooter>
        <IonToolbar>
            <IonButton expand="block" onClick={handleSave} className="ion-margin">
                Guardar
            </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default FoodModal;