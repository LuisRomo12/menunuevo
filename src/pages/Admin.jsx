import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  IonButtons
} from '@ionic/react';
import FoodCard from "../components/FoodCard";
import FoodModal from "../components/FoodModal";
import { initialMenuData } from "../data/menuData";
import { logOutOutline, addOutline, restaurantOutline, timeOutline } from 'ionicons/icons';
import './Admin.css';

const Admin = () => {
  const [menuData, setMenuData] = useState(() => {
    const saved = localStorage.getItem("menuData");
    return saved ? JSON.parse(saved) : initialMenuData;
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [currentDay, setCurrentDay] = useState("Lunes");
  const history = useHistory();
  const [changeLog, setChangeLog] = useState(() => {
    const savedLog = localStorage.getItem("changeLog");
    return savedLog ? JSON.parse(savedLog) : [];
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      history.push("/auth");
    }
  }, [history]);

  useEffect(() => {
    localStorage.setItem("menuData", JSON.stringify(menuData));
  }, [menuData]);

  useEffect(() => {
    localStorage.setItem("changeLog", JSON.stringify(changeLog));
  }, [changeLog]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    history.push("/");
  };

  const handleAddFood = () => {
    setEditingFood(null);
    setModalOpen(true);
  };
  
  const handleEditFood = (id) => {
    const food = menuData.flatMap((day) => day.foods).find((f) => f.id === id);
    if (food) {
      setEditingFood(food);
      setModalOpen(true);
    }
  };
  
  const handleDeleteFood = (id) => {
    const foodToDelete = menuData.flatMap((day) => day.foods).find((f) => f.id === id);
    const dayOfFood = menuData.find(d => d.foods.some(f => f.id === id));

    if (foodToDelete && dayOfFood) {
        const timestamp = new Date().toISOString();
        const newLogEntry = {
            action: "Eliminado",
            foodName: foodToDelete.name,
            day: dayOfFood.day,
            timestamp,
        };
        setChangeLog(prev => [newLogEntry, ...prev]);
    }

    setMenuData((prev) =>
      prev.map((day) => ({
        ...day,
        foods: day.foods.filter((food) => food.id !== id),
      }))
    );
  };

  const handleSaveFood = (foodData) => {
    const timestamp = new Date().toISOString();
    let action = foodData.id ? "Editado" : "Agregado";
    let foodName = foodData.name;

    if(foodData.id) {
        const originalFood = menuData.flatMap(d => d.foods).find(f => f.id === foodData.id);
        if(originalFood && originalFood.name !== foodData.name) {
            foodName = `${originalFood.name} -> ${foodData.name}`
        }
    }

    const newLogEntry = {
        action,
        foodName: foodName,
        day: currentDay,
        timestamp,
    };
    setChangeLog(prev => [newLogEntry, ...prev]);

    if (foodData.id) {
      setMenuData((prev) =>
        prev.map((day) => ({
          ...day,
          foods: day.foods.map((food) =>
            food.id === foodData.id ? { ...food, ...foodData } : food
          ),
        }))
      );
    } else {
      const newFood = { id: Date.now().toString(), ...foodData };
      setMenuData((prev) =>
        prev.map((day) =>
          day.day === currentDay ? { ...day, foods: [...day.foods, newFood] } : day
        )
      );
    }
  };

  const activeDayMenu = menuData.find(d => d.day === currentDay);

  return (
    <IonPage className="admin-page">
      <IonHeader>
        <IonToolbar>
          <div className="admin-header-content">
            <div className="admin-header-title">
              <IonIcon icon={restaurantOutline} size="large" color="primary" />
              <div>
                <h1>Panel de Administración</h1>
                <p>Gestión de Menú</p>
              </div>
            </div>
            <IonButtons slot="end">
              <IonButton fill="outline" href="/changelog">
                  <IonIcon slot="start" icon={timeOutline} />
                  Historial
              </IonButton>
              <IonButton fill="outline" onClick={handleLogout}>
                <IonIcon slot="start" icon={logOutOutline} />
                Salir
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="admin-content ion-padding">
          <IonSegment 
            value={currentDay} 
            onIonChange={e => setCurrentDay(e.detail.value)}
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
                <div className="day-menu-header">
                  <div>
                    <h2>Menú del {activeDayMenu.day}</h2>
                    <p>{activeDayMenu.foods.length} platillos</p>
                  </div>
                  <IonButton onClick={handleAddFood}>
                    <IonIcon slot="start" icon={addOutline} />
                    Agregar Platillo
                  </IonButton>
                </div>
                
                {activeDayMenu.foods.length > 0 ? (
                  <div className="food-grid">
                    {activeDayMenu.foods.map((food) => (
                      <FoodCard
                        key={food.id}
                        {...food}
                        isAdmin
                        onEdit={handleEditFood}
                        onDelete={handleDeleteFood}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-food-placeholder">
                    <p>No hay platillos para este día.</p>
                    <IonButton fill="outline" onClick={handleAddFood} className="ion-margin-top">
                      <IonIcon slot="start" icon={addOutline} />
                      Agregar Primer Platillo
                    </IonButton>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </IonContent>

      <FoodModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveFood}
        food={editingFood}
      />
    </IonPage>
  );
};

export default Admin;