// ============================================================================
// CUMPLEAÑOS DE GÉNESIS - CONFIGURACIÓN Y REFERENCIAS
// ============================================================================

// ========================================
// CONFIGURACIÓN DE LAS CARTAS
// ========================================
// Las imágenes se encuentran almacenadas dentro de la carpeta:
// public/images/
//
// Al compilar y desplegar en Vercel, Vite copia automáticamente todos los
// archivos de la carpeta "public/" a la raíz del sitio, por lo que quedan
// disponibles públicamente bajo las rutas directas:
// - /images/todas.jpg
// - /images/alicia.jpg
// - /images/elianis.jpg
// - /images/joice.jpg
//
// Puedes editar los nombres, rutas y mensajes aquí y en src/config.ts

export const CARTAS_CONFIG = [
  // 1. FOTO DE TODAS (Visualización en grande, sin texto ni título)
  {
    id: "todas",
    nombre: "",
    imagen: "/images/todas.jpg",
    mensaje: "",
    botonAnterior: "← Regresar",
    botonSiguiente: "Pasar a la siguiente →",
    soloImagenGrande: true,
  },
  // 2. CARTA 1 - ALICIA
  {
    id: "alicia",
    nombre: "Alicia",
    imagen: "/images/alicia.jpg",
    botonAnterior: "← Regresar",
    botonSiguiente: "Pasar a la siguiente →",
    mensaje: `Feliz cumpleaños a una de mis amistades más importantes.

Gracias por ser parte de tantos momentos bonitos, por acompañarme en cada locura y por ser ese “sí a todo” que siempre necesitaba JAJAJA.

Me llevo nuestras risas, y todos esos momentos que solo nosotras entendíamos.

Te quiero muchísimo y siempre voy a tener un pedacito de esta etapa guardado contigo.

Espero que logres todo lo que deseas y que este nuevo año sea de cosas prósperas a tu vida.

Loviu bb.`,
    soloImagenGrande: false,
  },
  // 3. CARTA 2 - ELIANIS
  {
    id: "elianis",
    nombre: "Elianis",
    imagen: "/images/elianis.jpg",
    botonAnterior: "← Regresar",
    botonSiguiente: "Pasar a la siguiente →",
    mensaje: `Feliz cumpleaños a una de las personas que jamás pensé que iba a terminar siendo tan importante para mí, porque al principio me caías MAL.

Quién diría que después de eso íbamos a terminar siendo mejores amigas y viviendo tantas cosas juntas.

Gracias por estar, por escucharme, por aguantar mis locuras y por hacer que hasta los días más normales sean más divertidos.

Espero que hoy la pases increíble rodeada de todas las personas que te aman y que este nuevo año te traiga muchísimas cosas buenas.

Te quiero muchísimo mi xixi.`,
    soloImagenGrande: false,
  },
  // 4. CARTA 3 - JOICE
  {
    id: "joice",
    nombre: "Joice",
    imagen: "/images/joice.jpg",
    botonAnterior: "← Regresar",
    botonSiguiente: "Finalizar",
    mensaje: `Feliz cumpleaños, mi Gene.

Hoy quiero desearle un feliz cumpleaños a una de las personas que forman parte de mi vida. Más que una amiga, eres una hermana más.

Gracias por todos los momentos, por las risas y hasta por las peleas.

Aunque antes no nos entendíamos muy bien, lograste convertirte en una persona muy especial en cada etapa de mi vida.

Quiero que Dios te regale un maravilloso cumpleaños y que te permita seguir compartiendo muchos años junto a todas las personas que te amamos, te queremos y estamos agradecidos de que estés en nuestras vidas.

Te quiero muchísimo, Génesis.`,
    soloImagenGrande: false,
  },
];
