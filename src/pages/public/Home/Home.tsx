import "./Home.css";
import { Nav, Carousel, VirtualAssistant } from "../../../components/";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const modalPages = [
  // 0 - Menú Principal
  {
    question: "¿En qué puedo ayudarte?",
    options: [
      { text: "Tutorial", goesToPageIndex: 126 },
      { text: "Mi Cuenta", goesToPageIndex: 1 },
      { text: "Explorar el Museo", goesToPageIndex: 2 },
      { text: "Minijuegos", goesToPageIndex: 3 },
      { text: "Tienda y Canjes", goesToPageIndex: 4 },
      { text: "Contenido Interactivo", goesToPageIndex: 5 },
    ]
  },

  // 1 - Mi Cuenta
  {
    question: "¿En qué te puedo ayudar con tu cuenta?",
    options: [
      { text: "Registro", goesToPageIndex: 6 },
      { text: "Inicio de sesión", goesToPageIndex: 12 },
      { text: "Perfil", goesToPageIndex: 18 },
      { text: "Mascota virtual", goesToPageIndex: 24 },
      { text: "Tokens", goesToPageIndex: 30 },
      { text: "Back", goesToPageIndex: 0 }
    ]
  },

  // 2 - Explorar el Museo
  {
    question: "¿En qué te puedo ayudar con la exploración del museo?",
    options: [
      { text: "Mapa", goesToPageIndex: 36 },
      { text: "Galerías", goesToPageIndex: 42 },
      { text: "X-Ray", goesToPageIndex: 48 },
      { text: "Dinosaurios", goesToPageIndex: 54 },
      { text: "Back", goesToPageIndex: 0 }
    ]
  },

  // 3 - Juegos
  {
    question: "¿En qué te puedo ayudar con los minijuegos?",
    options: [
      { text: "Minijuegos", goesToPageIndex: 60 },
      { text: "Logros", goesToPageIndex: 66 },
      { text: "Álbum", goesToPageIndex: 72 },
      { text: "Stickers", goesToPageIndex: 78 },
      { text: "Back", goesToPageIndex: 0 }
    ]
  },

  // 4 - Tienda y Canjes
  {
    question: "¿En qué te puedo ayudar con la tienda y los canjes?",
    options: [
      { text: "Compras", goesToPageIndex: 84 },
      { text: "Productos", goesToPageIndex: 90 },
      { text: "Carrito", goesToPageIndex: 96 },
      { text: "Wallet", goesToPageIndex: 102 },
      { text: "Historial", goesToPageIndex: 108 },
      { text: "Back", goesToPageIndex: 0 }
    ]
  },

  // 5 - Contenido Interactivo
  {
    question: "¿En qué te puedo ayudar con el contenido interactivo?",
    options: [
      { text: "Biblioteca", goesToPageIndex: 114 },
      { text: "Cine", goesToPageIndex: 120 },
      { text: "Back", goesToPageIndex: 0 }
    ]
  },

  // 6 - Registro
  {
    question: "¿En qué te puedo ayudar con el registro?",
    options: [
      { text: "¿Cómo me registro en la plataforma?", goesToPageIndex: 7 },
      { text: "¿Qué actividades puedo hacer sin registrarme?", goesToPageIndex: 8 },
      { text: "¿Cuál es el beneficio de registrarme?", goesToPageIndex: 9 },
      { text: "¿Qué datos necesito para crear mi cuenta?", goesToPageIndex: 10 },
      { text: "¿Puedo registrarme con una red social?", goesToPageIndex: 11 },
      { text: "Back", goesToPageIndex: 1 }
    ]
  },

  // 7 a 11 - Subpáginas de Registro
  { question: "¿Cómo me registro en la plataforma?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 6 }] },           // 7
  { question: "¿Qué actividades puedo hacer sin registrarme?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 6 }] }, // 8
  { question: "¿Cuál es el beneficio de registrarme?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 6 }] },         // 9
  { question: "¿Qué datos necesito para crear mi cuenta?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 6 }] },     // 10
  { question: "¿Puedo registrarme con una red social?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 6 }] },        // 11


  // 12 - Inicio de Sesión
  {
    question: "¿En qué te puedo ayudar con el inicio de sesión?",
    options: [
      { text: "¿Dónde inicio sesión?", goesToPageIndex: 13 },
      { text: "¿Qué hago si olvidé mi contraseña?", goesToPageIndex: 14 },
      { text: "¿Puedo mantener mi sesión iniciada?", goesToPageIndex: 15 },
      { text: "¿Cómo cierro sesión?", goesToPageIndex: 16 },
      { text: "¿Puedo iniciar sesión desde otro dispositivo?", goesToPageIndex: 17 },
      { text: "Back", goesToPageIndex: 1 }
    ]
  },

  // 13 a 17 - Subpáginas de Inicio de Sesión
  { question: "¿Dónde inicio sesión?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 12 }] },                           // 13
  { question: "¿Qué hago si olvidé mi contraseña?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 12 }] },              // 14
  { question: "¿Puedo mantener mi sesión iniciada?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 12 }] },            // 15
  { question: "¿Cómo cierro sesión?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 12 }] },                            // 16
  { question: "¿Puedo iniciar sesión desde otro dispositivo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 12 }] },  // 17

  // 18 - Perfil
  {
    question: "¿En qué te puedo ayudar con tu perfil?",
    options: [
      { text: "¿Cómo edito los datos de mi perfil?", goesToPageIndex: 19 },
      { text: "¿Puedo cambiar mi nombre de usuario?", goesToPageIndex: 20 },
      { text: "¿Qué información muestra mi perfil?", goesToPageIndex: 21 },
      { text: "¿Cómo veo mis logros desde el perfil?", goesToPageIndex: 22 },
      { text: "¿Puedo eliminar mi cuenta?", goesToPageIndex: 23 },
      { text: "Back", goesToPageIndex: 1 }
    ]
  },

  { question: "¿Cómo edito los datos de mi perfil?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 18 }] },                // 19
  { question: "¿Puedo cambiar mi nombre de usuario?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 18 }] },                      // 20
  { question: "¿Qué información muestra mi perfil?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 18 }] },                  // 21
  { question: "¿Cómo veo mis logros desde el perfil?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 18 }] },                 // 22
  { question: "¿Puedo eliminar mi cuenta?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 18 }] },        // 23


  // 24 - Mascota virtual
  {
    question: "¿En qué te puedo ayudar con tu mascota virtual?",
    options: [
      { text: "¿Cómo elijo mi mascota virtual?", goesToPageIndex: 25 },
      { text: "¿Puedo cambiarla después?", goesToPageIndex: 26 },
      { text: "¿Cómo la visto o personalizo?", goesToPageIndex: 27 },
      { text: "¿Mi mascota puede evolucionar?", goesToPageIndex: 28 },
      { text: "¿Para qué sirve la mascota en el museo?", goesToPageIndex: 29 },
      { text: "Back", goesToPageIndex: 1 }
    ]
  },

  // 25 a 29 - Subpáginas de Mascota
  { question: "¿Cómo elijo mi mascota virtual?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 24 }] },                // 25
  { question: "¿Puedo cambiarla después?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 24 }] },                      // 26
  { question: "¿Cómo la visto o personalizo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 24 }] },                  // 27
  { question: "¿Mi mascota puede evolucionar?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 24 }] },                 // 28
  { question: "¿Para qué sirve la mascota en el museo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 24 }] },        // 29

  // 30 - Tokens
  {
    question: "¿En qué te puedo ayudar con los tokens?",
    options: [
      { text: "¿Para qué son los tokens?", goesToPageIndex: 31 },
      { text: "¿Cómo gano tokens?", goesToPageIndex: 32 },
      { text: "¿Dónde veo cuántos tengo?", goesToPageIndex: 33 },
      { text: "¿Puedo usarlos en la tienda?", goesToPageIndex: 34 },
      { text: "¿Puedo perder tokens?", goesToPageIndex: 35 },
      { text: "Back", goesToPageIndex: 1 }
    ]
  },

  // 26 a 30 - Subpáginas de Tokens
  { question: "¿Para qué son los tokens?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 30 }] },                      // 26
  { question: "¿Cómo gano tokens?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 30 }] },                             // 27
  { question: "¿Dónde veo cuántos tengo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 30 }] },                      // 28
  { question: "¿Puedo usarlos en la tienda?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 30 }] },                   // 29
  { question: "¿Puedo perder tokens?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 30 }] },                          // 30

  // -------------------------------------- EXPLORAR EL MUSEO --------------------------------------

  // 36. Mapa
  {
    question: "¿En qué te puedo ayudar con el mapa", options: [
      { text: "¿Cómo accedo?", goesToPageIndex: 37 },
      { text: "¿Cómo está estructurado?", goesToPageIndex: 38 },
      { text: "¿Qué información muestra?", goesToPageIndex: 39 },
      { text: "¿Puedo acceder a todas las galerías?", goesToPageIndex: 40 },
      { text: "¿Qué pasa si paso el cursor sobre una sala?", goesToPageIndex: 41 },
      { text: "Back", goesToPageIndex: 2 }
    ]
  },

  // 37 a 40 - Subpáginas de Mapa
  { question: "¿Cómo accedo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 36 }] },                      // 26
  { question: "¿Cómo está estructurado?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 36 }] },                             // 27
  { question: "¿Qué información muestra?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 36 }] },                      // 28
  { question: "¿Puedo acceder a todas las galerías?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 36 }] },                   // 29
  { question: "¿Qué pasa si paso el cursor sobre una sala?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 36 }] },

  // 42. Galerías
  {
    question: "¿En qué te puedo ayudar con las galerías?", options: [
      { text: "¿Qué es una galería?", goesToPageIndex: 43 },
      { text: "¿Cuántas galerías hay?", goesToPageIndex: 44 },
      { text: "¿Qué dinosaurios hay en cada galería?", goesToPageIndex: 45 },
      { text: "¿Cómo ingreso a una galería?", goesToPageIndex: 46 },
      { text: "¿Cómo desbloqueo una galería?", goesToPageIndex: 47 },
      { text: "Back", goesToPageIndex: 2 }
    ]
  },

  // 43 a 47 - Subpáginas de Galerías
  { question: "¿Qué es una galería?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 42 }] },                      // 26
  { question: "¿Cuántas galerías hay?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 42 }] },                             // 27
  { question: "¿Qué dinosaurios hay en cada galería?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 42 }] },                      // 28
  { question: "¿Cómo ingreso a una galería?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 42 }] },                   // 29
  { question: "¿Cómo desbloqueo una galería?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 42 }] },

  // 48. X-Ray
  {
    question: "¿En qué te puedo ayudar con la funcionalidad X-Ray", options: [
      { text: "¿Qué es la función X-Ray?", goesToPageIndex: 49 },
      { text: "¿Dónde puedo usarla?", goesToPageIndex: 50 },
      { text: "¿Cómo se usa?", goesToPageIndex: 51 },
      { text: "¿Qué obtengo con el escaneo?", goesToPageIndex: 52 },
      { text: "¿Cómo completo un escaneo?", goesToPageIndex: 53 },
      { text: "Back", goesToPageIndex: 2 }
    ]
  },

  // 49 a 53 - Subpáginas de X-Ray
  { question: "¿Qué es la función X-Ray?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 48 }] },
  { question: "¿Dónde puedo usarla?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 48 }] },
  { question: "¿Cómo se usa?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 48 }] },
  { question: "¿Qué obtengo con el escaneo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 48 }] },
  { question: "¿Cómo completo un escaneo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 48 }] },

  // 54. Dinosaurios
  {
    question: "¿En qué te puedo ayudar con los dinosaurios?", options: [
      { text: "¿Qué dinosaurios están disponibles?", goesToPageIndex: 55 },
      { text: "¿Puedo interactuar con los dinosaurios?", goesToPageIndex: 56 },
      { text: "¿Qué puedo aprender de cada especie?", goesToPageIndex: 57 },
      { text: "¿Qué relación hay entre los dinosaurios de la galería?", goesToPageIndex: 58 },
      { text: "¿Los dinosaurios de las galerías son los del museo?", goesToPageIndex: 59 },
      { text: "Back", goesToPageIndex: 2 }
    ]
  },

  // 55 a 59 - Subpáginas de Dinosaurios
  { question: "¿Qué dinosaurios están disponibles?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 54 }] },
  { question: "¿Puedo interactuar con los dinosaurios?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 54 }] },
  { question: "¿Qué puedo aprender de cada especie?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 54 }] },
  { question: "¿Qué relación hay entre los dinosaurios de la galería?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 54 }] },
  { question: "¿Los dinosaurios de las galerías son los mismos que los de los museos?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 54 }] },

  // -------------------------------------- MINIJUEGOS --------------------------------------

  // 60. Minijuegos
  {
    question: "¿En qué te puedo ayudar con los minijuegos?", options: [
      { text: "¿Dónde encuentro los minijuegos?", goesToPageIndex: 61 },
      { text: "¿Qué minijuegos hay?", goesToPageIndex: 62 },
      { text: "¿Cómo se juega al Puzzleaurus?", goesToPageIndex: 63 },
      { text: "¿Cómo se juega al Memodyn?", goesToPageIndex: 64 },
      { text: "¿Puedo ganar algo jugando?", goesToPageIndex: 65 },
      { text: "Back", goesToPageIndex: 3 }
    ]
  },

  // 55 a 59 - Subpáginas de Minijuegos
  { question: "¿Dónde encuentro los minijuegos?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 60 }] },
  { question: "¿Qué minijuegos hay?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 60 }] },
  { question: "¿Cómo se juega al Puzzleaurus?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 60 }] },
  { question: "¿Cómo se juega al Memodyn?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 60 }] },
  { question: "¿Puedo ganar algo jugando?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 60 }] },

  // 66. Logros
  {
    question: "¿En qué te puedo ayudar con los logros?", options: [
      { text: "¿Cómo los desbloqueo?", goesToPageIndex: 67 },
      { text: "¿Para qué sirven?", goesToPageIndex: 68 },
      { text: "¿Dónde los veo?", goesToPageIndex: 69 },
      { text: "¿Cuántos hay en total?", goesToPageIndex: 70 },
      { text: "¿Hay alguna meta específica?", goesToPageIndex: 71 },
      { text: "Back", goesToPageIndex: 3 }
    ]
  },

  // 67 a 71 - Subpáginas de Minijuegos
  { question: "¿Cómo los desbloqueo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 66 }] },
  { question: "¿Para qué sirven?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 66 }] },
  { question: "¿Dónde los veo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 66 }] },
  { question: "¿Cuántos hay en total?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 66 }] },
  { question: "¿Hay alguna meta específica?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 66 }] },

  // 72. Álbum
  {
    question: "¿En qué te puedo ayudar con el álbum?", options: [
      { text: "¿Qué es?", goesToPageIndex: 73 },
      { text: "¿Cómo accedo?", goesToPageIndex: 74 },
      { text: "¿Qué información contiene?", goesToPageIndex: 75 },
      { text: "¿Qué pasa si lo completo?", goesToPageIndex: 76 },
      { text: "¿Qué es la funcionalidad <Dyno-Selfie>?", goesToPageIndex: 77 },
      { text: "Back", goesToPageIndex: 3 }
    ]
  },

  // 73 a 77 - Subpáginas de Álbum
  { question: "¿Qué es?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 72 }] },
  { question: "¿Cómo accedo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 72 }] },
  { question: "¿Qué información contiene?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 72 }] },
  { question: "¿Qué pasa si lo completo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 72 }] },
  { question: "¿Qué es la funcionalidad <Dyno-Selfie>?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 72 }] },

  // 78. Stickers
  {
    question: "¿En qué te puedo ayudar con los stickers?", options: [
      { text: "¿Cómo obtengo stickers?", goesToPageIndex: 79 },
      { text: "¿Qué tipos de stickers hay?", goesToPageIndex: 80 },
      { text: "¿Puedo intercambiar stickers?", goesToPageIndex: 81 },
      { text: "¿Cómo coloco un sticker?", goesToPageIndex: 82 },
      { text: "¿Qué pasa si coloco un sticker incorrectamente?", goesToPageIndex: 83 },
      { text: "Back", goesToPageIndex: 3 }
    ]
  },

  // 79 a 83 - Subpáginas de Stickers
  { question: "¿Cómo obtengo stickers?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 78 }] },
  { question: "¿Qué tipos de stickers hay?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 78 }] },
  { question: "¿Puedo intercambiar stickers?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 78 }] },
  { question: "¿Cómo coloco un sticker?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 78 }] },
  { question: "¿Qué pasa si coloco un sticker incorrectamente?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 78 }] },

  // -------------------------------------- TIENDA Y CANJES --------------------------------------

  // 84. Compras
  {
    question: "¿En qué te puedo ayudar con las compras?", options: [
      { text: "¿Qué puedo comprar con dinero?", goesToPageIndex: 85 },
      { text: "¿Hay productos digitales y físicos?", goesToPageIndex: 86 },
      { text: "¿Cómo se realiza una compra?", goesToPageIndex: 87 },
      { text: "¿Es segura la compra online?", goesToPageIndex: 88 },
      { text: "¿Qué métodos de págo acepta?", goesToPageIndex: 89 },
      { text: "Back", goesToPageIndex: 4 }
    ]
  },

  // 85 a 89 - Subpáginas de compras
  { question: "¿Qué puedo comprar con dinero?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 84 }] },
  { question: "¿Hay productos digitales y físicos?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 84 }] },
  { question: "¿Cómo se realiza una compra?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 84 }] },
  { question: "¿Es segura la compra online?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 84 }] },
  { question: "¿Qué métodos de págo acepta?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 84 }] },

  // 90. Productos
  {
    question: "¿En qué te puedo ayudar con los productos?", options: [
      { text: "¿Qué productos hay en la tienda?", goesToPageIndex: 91 },
      { text: "¿Hay merchandising del museo?", goesToPageIndex: 92 },
      { text: "¿Puedo comprar entradas al museo?", goesToPageIndex: 93 },
      { text: "¿Hay artículos solo por tokens?", goesToPageIndex: 94 },
      { text: "¿Cómo veo los detalles de un producto?", goesToPageIndex: 95 },
      { text: "Back", goesToPageIndex: 4 }
    ]
  },

  // 91 a 95 - Subpáginas de productos
  { question: "¿Qué productos hay en la tienda?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 84 }] },
  { question: "¿Hay merchandising del museo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 84 }] },
  { question: "¿Puedo comprar entradas al museo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 84 }] },
  { question: "¿Hay artículos solo por tokens?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 84 }] },
  { question: "¿Cómo veo los detalles de un producto?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 84 }] },

  // 96. Carrito
  {
    question: "¿En qué te puedo ayudar con el carrito?", options: [
      { text: "¿Cómo agrego un producto al carrito?", goesToPageIndex: 97 },
      { text: "¿Puedo modificar la cantidad?", goesToPageIndex: 98 },
      { text: "¿Qué hago para finalizar la compra?", goesToPageIndex: 99 },
      { text: "¿Puedo eliminar algo del carrito?", goesToPageIndex: 100 },
      { text: "¿El carrito guarda los artículos si salgo?", goesToPageIndex: 101 },
      { text: "Back", goesToPageIndex: 4 }
    ]
  },

  // 97 a 101 - Subpáginas de carrito
  { question: "¿Cómo agrego un producto al carrito?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 96 }] },
  { question: "¿Puedo modificar la cantidad?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 96 }] },
  { question: "¿Qué hago para finalizar la compra?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 96 }] },
  { question: "¿Puedo eliminar algo del carrito?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 96 }] },
  { question: "¿El carrito guarda los artículos si salgo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 96 }] },

  // 102. Wallet
  {
    question: "¿En qué te puedo ayudar la wallet?", options: [
      { text: "¿Qué es la wallet?", goesToPageIndex: 103 },
      { text: "¿Puedo guardar tarjetas o métodos de pago?", goesToPageIndex: 104 },
      { text: "Donde veo mi saldo?", goesToPageIndex: 105 },
      { text: "¿Cómo veo mis tokens?", goesToPageIndex: 106 },
      { text: "¿Cómo recargo mi wallet?", goesToPageIndex: 107 },
      { text: "Back", goesToPageIndex: 4 }
    ]
  },

  // 103 a 107 - Subpáginas de wallet
  { question: "¿Cómo agrego un producto al carrito?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 102 }] },
  { question: "¿Puedo modificar la cantidad?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 102 }] },
  { question: "Donde veo mi saldo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 102 }] },
  { question: "¿Cómo veo mis tokens?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 102 }] },
  { question: "¿Cómo recargo mi wallet?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 102 }] },


  // 108. Historial
  {
    question: "¿En qué te puedo ayudar con el historial?", options: [
      { text: "¿Dónde veo mis compras pasada?", goesToPageIndex: 109 },
      { text: "¿También aparece lo que canjeé?", goesToPageIndex: 110 },
      { text: "¿Puedo repetir una compra anterior?", goesToPageIndex: 111 },
      { text: "¿Cómo reviso mi actividad en minijuegos?", goesToPageIndex: 112 },
      { text: "El historial muestra mis tokens ganados?", goesToPageIndex: 113 },
      { text: "Back", goesToPageIndex: 4 }
    ]
  },

  // 109 a 113  - Subpáginas de historial
  { question: "¿Dónde veo mis compras pasada?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 108 }] },
  { question: "También aparece lo que canjeé?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 108 }] },
  { question: "¿Puedo repetir una compra anterior?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 108 }] },
  { question: "¿Cómo reviso mi actividad en minijuegos?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 108 }] },
  { question: "El historial muestra mis tokens ganados?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 108 }] },

  // -------------------------------------- CONTENIDO INTERACTIVO --------------------------------------

  // 114. Biblioteca
  {
    question: "¿En qué te puedo ayudar la biblioteca?", options: [
      { text: "¿Qué libros hay disponibles?", goesToPageIndex: 115 },
      { text: "¿Puedo leer sin conexión?", goesToPageIndex: 116 },
      { text: "Hay libros gratuitos?", goesToPageIndex: 117 },
      { text: "Qué pasa si cierro un libro sin terminarlo?", goesToPageIndex: 118 },
      { text: "¿Los libros también dan tokens?", goesToPageIndex: 119 },
      { text: "Back", goesToPageIndex: 5 }
    ]
  },

  // 115 a 119 - Biblioteca
  { question: "¿Qué libros hay disponibles?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 114 }] },
  { question: "¿Puedo leer sin conexión?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 114 }] },
  { question: "Hay libros gratuitos?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 114 }] },
  { question: "Qué pasa si cierro un libro sin terminarlo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 114 }] },
  { question: "¿Los libros también dan tokens?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 114 }] },

  // 120. Cine
  {
    question: "¿En qué te puedo ayudar con el cine?", options: [
      { text: "¿Qué tipo de peliculas hay?", goesToPageIndex: 121 },
      { text: "¿Cómo accedo al cine virtual?", goesToPageIndex: 122 },
      { text: "¿Puedo ver películas sin tokens?", goesToPageIndex: 123 },
      { text: "¿Hay funciones especiales con contenido exclusivo?", goesToPageIndex: 124 },
      { text: "¿Gano tokens por ver pelis completas?", goesToPageIndex: 125 },
      { text: "Back", goesToPageIndex: 5 }
    ]
  },

  // 121 a 125 - Subpáginas de cine
  { question: "¿Qué tipo de películas hay?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 120 }] },
  { question: "¿Cómo accedo al cine virtual?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 120 }] },
  { question: "¿Puedo ver películas sin tokens?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 120 }] },
  { question: "¿Hay funciones especiales con contenido exclusivo?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 120 }] },
  { question: "¿Gano tokens por ver pelis completas?", options: [{ text: "RESPUESTA" }, { text: "Back", goesToPageIndex: 120 }] },

  // TUTORIAL
  {
    question: 'TUTORIAL', options: [{ text: 'Tutorial' }, { text: "Back", goesToPageIndex: 0 }],

  }

];


export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalCurrentPage, setModalCurrentPage] = useState<number>(0);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalCurrentPage(0);
  };

  const changeModalPage = (page: number) => {
    setModalCurrentPage(page);
  }

  const navigatePage = (route: string) => {
    navigate(route);
  };


  return (
    <div className="homePage">
      <Nav />
      <header>
        <div className="text">
          <div className="header-title">ACADEMIA DEL DINO CULTO</div>
          <div className="header-subtitle">MUSEO INTERACTIVO DE PALEONTOLOGIA</div>
        </div>
      </header>
      <div className="periods-container">

        <Carousel />

        <div className="ticket-purchase-container">
          <img className="star" src="assets/img/ticket/star.png" alt="star" />

          <button className="ticket-wrapper" onClick={() => navigatePage("/store")}>
            <img className="ticket" src="assets/img/ticket/ticket.png" alt="tickets" />
          </button>

          <span>¡Comprá tus entradas!</span>
        </div>


        <div className="dynardContainer">
          {!isModalOpen && (
            <VirtualAssistant
              onClick={openModal}
              text="¿Necesitas Ayuda?"
              boldWords={["Ayuda"]}
              looped={true}
              dialogStyle={{
                width: "20vh",
                height: "10vh",
                textAlign: "center"
              }}
            />
          )}
        </div>


        {isModalOpen && (
          <div className={"modalOverlay"} onClick={closeModal}>
            <button className="dynardModalCloseBtn" onClick={closeModal}>×</button>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <img src="assets/giph/logo.gif" alt="logoGiph" className="modalLogoGiph" />
              <div className="dynardQuestion">{modalPages[modalCurrentPage].question}</div>
              <div className="dynardOptionsWrapper">
                {modalPages[modalCurrentPage].options.map((option, index) => {
                  const isBack = option.text === "Back";
                  const isButton = option.goesToPageIndex !== undefined;
                  const className = isButton
                    ? `dynardQuestionOption ${isBack ? "dynardBtnBack" : ""}`
                    : "dynardQuestionText";

                  return (
                    <div
                      key={index}
                      className={className}
                      onClick={isButton ? () => changeModalPage(option.goesToPageIndex) : undefined}
                    >
                      {option.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

