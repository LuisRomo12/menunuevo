export interface FoodItem {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface DayMenu {
  day: string;
  foods: FoodItem[];
}

export const initialMenuData: DayMenu[] = [
  {
    day: "Lunes",
    foods: [
      {
        id: "1",
        name: "Enchiladas Verdes",
        description: "Tortillas de maíz rellenas de pollo, bañadas en salsa verde con crema y queso",
        type: "Plato Fuerte",
      },
      {
        id: "2",
        name: "Agua de Jamaica",
        description: "Refrescante bebida natural de flor de jamaica",
        type: "Bebida",
      },
      {
        id: "3",
        name: "Flan Napolitano",
        description: "Postre tradicional de huevo con caramelo",
        type: "Postre",
      },
    ],
  },
  {
    day: "Martes",
    foods: [
      {
        id: "4",
        name: "Tacos de Bistec",
        description: "Tacos con carne de res asada, cebolla, cilantro y salsa",
        type: "Plato Fuerte",
      },
      {
        id: "5",
        name: "Horchata",
        description: "Bebida dulce de arroz con canela",
        type: "Bebida",
      },
      {
        id: "6",
        name: "Gelatina de Fresa",
        description: "Postre ligero y refrescante",
        type: "Postre",
      },
    ],
  },
  {
    day: "Miércoles",
    foods: [
      {
        id: "7",
        name: "Pozole Rojo",
        description: "Sopa tradicional mexicana con maíz cacahuazintle, carne de cerdo y especias",
        type: "Plato Fuerte",
      },
      {
        id: "8",
        name: "Limonada",
        description: "Agua fresca de limón natural",
        type: "Bebida",
      },
      {
        id: "9",
        name: "Pastel Tres Leches",
        description: "Bizcocho empapado en tres tipos de leche",
        type: "Postre",
      },
    ],
  },
  {
    day: "Jueves",
    foods: [
      {
        id: "10",
        name: "Chiles Rellenos",
        description: "Chiles poblanos rellenos de queso, cubiertos con salsa de tomate",
        type: "Plato Fuerte",
      },
      {
        id: "11",
        name: "Agua de Tamarindo",
        description: "Bebida refrescante de pulpa de tamarindo",
        type: "Bebida",
      },
    ],
  },
  {
    day: "Viernes",
    foods: [
      {
        id: "12",
        name: "Pescado a la Veracruzana",
        description: "Filete de pescado en salsa de jitomate con aceitunas y alcaparras",
        type: "Plato Fuerte",
      },
      {
        id: "13",
        name: "Agua de Piña",
        description: "Refrescante agua de piña natural",
        type: "Bebida",
      },
      {
        id: "14",
        name: "Arroz con Leche",
        description: "Postre cremoso de arroz con canela",
        type: "Postre",
      },
    ],
  },
  {
    day: "Sábado",
    foods: [
      {
        id: "15",
        name: "Tortas Ahogadas",
        description: "Pan birote relleno de carnitas, bañado en salsa de jitomate picante",
        type: "Plato Fuerte",
      },
      {
        id: "16",
        name: "Café de Olla",
        description: "Café tradicional con piloncillo y canela",
        type: "Bebida",
      },
    ],
  },
];
