import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // CAMBIO AQUÍ
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
  IonButtons,
  useIonToast,
  IonFooter
} from '@ionic/react';
import FoodCard from "../components/FoodCard";
import FoodModal from "../components/FoodModal";
import { initialMenuData, DayMenu, FoodItem } from "../data/menuData";
import { logOutOutline, addOutline } from 'ionicons/icons';

const Admin = () => {
  const [menuData, setMenuData] = useState<DayMenu[]>(() => {
    const saved = localStorage.getItem("menuData");
    return saved ? JSON.parse(saved) : initialMenuData;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [currentDay, setCurrentDay] = useState("Lunes");
  const history = useHistory(); // CAMBIO AQUÍ
  const [presentToast] = useIonToast();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      history.push("/auth"); // CAMBIO AQUÍ
    }
  }, [history]); // CAMBIO AQUÍ

  useEffect(() => {
    localStorage.setItem("menuData", JSON.stringify(menuData));
  }, [menuData]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    presentToast({
      message: 'Has cerrado sesión correctamente',
      duration: 2000,
      position: 'bottom'
    });
    window.location.href = "/"; // Usa esto en lugar de history.push
  };

  const handleAddFood = () => {
    setEditingFood(null);
    setModalOpen(true);
  };

  const handleEditFood = (id: string) => {
    const food = menuData
      .flatMap((day) => day.foods)
      .find((f) => f.id === id);
    if (food) {
      setEditingFood(food);
      setModalOpen(true);
    }
  };

  const handleDeleteFood = (id: string) => {
    setMenuData((prev) =>
      prev.map((day) => ({
        ...day,
        foods: day.foods.filter((food) => food.id !== id),
      }))
    );
    presentToast({
      message: 'Platillo eliminado correctamente',
      duration: 2000,
      position: 'bottom'
    });
  };

  const handleSaveFood = (foodData: Omit<FoodItem, "id"> & { id?: string }) => {
    if (foodData.id) {
      // Edit existing
      setMenuData((prev) =>
        prev.map((day) => ({
          ...day,
          foods: day.foods.map((food) =>
            food.id === foodData.id
              ? { ...food, ...foodData }
              : food
          ),
        }))
      );
      presentToast({
        message: 'Platillo actualizado correctamente',
        duration: 2000,
        position: 'bottom'
      });
    } else {
      // Add new
      const newFood: FoodItem = {
        id: Date.now().toString(),
        name: foodData.name,
        description: foodData.description,
        type: foodData.type,
      };
      setMenuData((prev) =>
        prev.map((day) =>
          day.day === currentDay
            ? { ...day, foods: [...day.foods, newFood] }
            : day
        )
      );
      presentToast({
        message: 'Platillo agregado correctamente',
        duration: 2000,
        position: 'bottom'
      });
    }
  };

  const activeDayMenu = menuData.find(d => d.day === currentDay);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Administración</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon slot="start" icon={logOutOutline} />
              Salir
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Gestión de Menú</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSegment 
          value={currentDay} 
          onIonChange={e => setCurrentDay(e.detail.value as string)}
          scrollable
        >
          {menuData.map((day) => (
            <IonSegmentButton key={day.day} value={day.day}>
              <IonLabel>{day.day}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        <div className="ion-padding-top">
          {activeDayMenu && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Menú del {activeDayMenu.day}</h2>
                  <p style={{ color: '#666' }}>{activeDayMenu.foods.length} platillos</p>
                </div>
                <IonButton onClick={handleAddFood}>
                  <IonIcon slot="start" icon={addOutline} />
                  Agregar
                </IonButton>
              </div>
              
              <div className="ion-padding-top">
                {activeDayMenu.foods.length > 0 ? (
                  activeDayMenu.foods.map((food) => (
                    <FoodCard
                      key={food.id}
                      {...food}
                      isAdmin
                      onEdit={handleEditFood}
                      onDelete={handleDeleteFood}
                    />
                  ))
                ) : (
                  <div className="ion-text-center ion-padding">
                    <p>No hay platillos para este día.</p>
                    <IonButton fill="outline" onClick={handleAddFood} className="ion-margin-top">
                      <IonIcon slot="start" icon={addOutline} />
                      Agregar Platillo
                    </IonButton>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </IonContent>

      <FoodModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveFood}
        food={editingFood}
      />
      
      <IonFooter>
         <IonToolbar>
           <p className="ion-text-center ion-padding-vertical" style={{fontSize: 'small'}}>Panel de Administración - Menú Digital</p>
         </IonToolbar>
      </IonFooter>

    </IonPage>
  );
};

export default Admin;