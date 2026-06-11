# 🔥 Luciérnagas - Juego de Memoria para Móvil

Un juego de memoria tipo "Simon Says" desarrollado con React Native y Expo, optimizado para dispositivos móviles con audio y feedback háptico.

## 🚀 Comenzar

### Prerequisitos

- Node.js (v14 o superior)
- npm o yarn
- Expo Go app en tu dispositivo móvil (iOS/Android)
- Opcional: Android Studio o Xcode para emuladores

### Instalación

```bash
# Las dependencias ya están instaladas, pero si necesitas reinstalar:
npm install

# O si usas yarn:
yarn install
```

### Ejecutar el Proyecto

```bash
# Iniciar el servidor de desarrollo
npx expo start

# O con npm:
npm start
```

Escanea el código QR con:
- **iOS**: App de Cámara nativa o Expo Go
- **Android**: App Expo Go

## 📁 Estructura del Proyecto

```
luciernaCopilot/
├── components/          # Componentes de UI
│   ├── HomeScreen.jsx      # Persona 1 - Pantalla de inicio
│   ├── GameScreen.jsx      # Persona 4 - Pantalla principal del juego
│   ├── GameOverScreen.jsx  # Persona 1 - Pantalla de fin de juego
│   ├── ScoreBoard.jsx      # Persona 1 - HUD de puntuación
│   ├── Firefly.jsx         # Persona 3 - Componente individual de luciérnaga
│   └── FireflyGrid.jsx     # Persona 3 - Grid de luciérnagas
├── hooks/               # React Hooks personalizados
│   └── useGameEngine.js    # Persona 2 - Lógica principal del juego
├── utils/               # Utilidades
│   ├── sequenceGenerator.js # Persona 2 - Generador de secuencias
│   ├── audioManager.js      # Persona 4 - Gestión de sonidos
│   └── hapticManager.js     # Persona 4 - Gestión de vibraciones
├── animations/          # Animaciones
│   └── gameAnimations.js    # Persona 3 - Animaciones del juego
├── assets/              # Recursos multimedia
│   └── sounds/             # Archivos de sonido (añadir aquí)
└── App.js              # Punto de entrada principal

```

## 👥 Distribución del Equipo

### Persona 1 - UI / Layout & Navigation ✅
**Archivos creados:**
- `/components/HomeScreen.jsx`
- `/components/GameOverScreen.jsx`
- `/components/ScoreBoard.jsx`

**Características:**
- Navegación entre pantallas (Home → Game → GameOver)
- SafeAreaView para compatibilidad con notch
- Diseño responsive para diferentes tamaños de pantalla
- Tema nocturno optimizado

### Persona 2 - Game Logic & State Management ✅
**Archivos creados:**
- `/hooks/useGameEngine.js`
- `/utils/sequenceGenerator.js`

**Características:**
- Hook personalizado `useGameEngine` con toda la lógica
- Generación de secuencias aleatorias
- Gestión de niveles y puntuación
- Validación de entrada del usuario
- Persistencia de récord con AsyncStorage

### Persona 3 - Fireflies & Animations ✅
**Archivos creados:**
- `/components/Firefly.jsx`
- `/components/FireflyGrid.jsx`
- `/animations/gameAnimations.js`

**Características:**
- Animaciones nativas con Animated API
- Efecto de brillo (glow) en luciérnagas
- Animaciones de escala y opacidad
- Sistema de animación en cadena
- Efectos de shake, flash y pulse

### Persona 4 - Integration, Audio & Haptics ✅
**Archivos creados:**
- `/utils/audioManager.js`
- `/utils/hapticManager.js`
- `/components/GameScreen.jsx`
- `App.js` (integración completa)

**Características:**
- Sistema de audio con expo-av
- Feedback háptico con expo-haptics
- Integración de todos los componentes
- SafeAreaView configurado
- Gestión de estado de la aplicación

## 🎮 Cómo Jugar

1. **Inicio**: Toca "COMENZAR" en la pantalla de inicio
2. **Observa**: Las luciérnagas se iluminarán en secuencia
3. **Repite**: Toca las luciérnagas en el mismo orden
4. **Avanza**: Cada nivel añade una nueva luciérnaga a la secuencia
5. **Récord**: Intenta superar tu puntuación más alta

## 🔊 Añadir Sonidos

Para añadir sonidos personalizados al juego:

1. Coloca tus archivos de audio en `/assets/sounds/`
2. Actualiza `App.js` en la función `initializeAudio()`:

```javascript
const initializeAudio = async () => {
  await audioManager.initialize();
  await audioManager.loadSounds([
    require('./assets/sounds/firefly1.mp3'),
    require('./assets/sounds/firefly2.mp3'),
    require('./assets/sounds/firefly3.mp3'),
    require('./assets/sounds/firefly4.mp3'),
  ]);
};
```

### Formatos de audio recomendados:
- **iOS**: .mp3, .m4a, .aac
- **Android**: .mp3, .wav
- **Duración**: 200-600ms por sonido
- **Tamaño**: Mantener archivos pequeños (<100KB)

## 📱 Características Móviles

### Audio (expo-av)
- ✅ Sonidos individuales por luciérnaga
- ✅ Audio de éxito/error
- ✅ Funciona en modo silencioso (iOS)

### Haptics (expo-haptics)
- ✅ Vibración ligera al tocar luciérnagas
- ✅ Vibración fuerte en error
- ✅ Feedback de éxito en nivel completado
- ✅ Se puede desactivar (opcional)

### Storage (AsyncStorage)
- ✅ Persistencia del récord
- ✅ Datos locales en el dispositivo

### Responsive Design
- ✅ SafeAreaView para notch y "Dynamic Island"
- ✅ Adaptación a diferentes tamaños de pantalla
- ✅ Probado en iPhone y Android

## ⚡ Plan de Desarrollo (5 Horas)

### ✅ Hora 1: Base Funcional (COMPLETADO)
- [x] Proyecto Expo inicializado
- [x] Dependencias instaladas
- [x] Estructura de carpetas creada

### 🎯 Hora 2: Ciclo de Juego Jugable
**Tareas pendientes:**
- [ ] Testear el flujo completo del juego
- [ ] Ajustar tiempos de animación
- [ ] Probar en dispositivo real con Expo Go

### 🎯 Hora 3: Flujo Completo
**Tareas pendientes:**
- [ ] Verificar persistencia de récord
- [ ] Testear navegación entre pantallas
- [ ] Ajustar responsive en diferentes dispositivos

### 🎯 Hora 4: Pulido Móvil
**Tareas pendientes:**
- [ ] Añadir archivos de sonido reales
- [ ] Optimizar feedback háptico
- [ ] Mejorar efectos visuales (glow)
- [ ] Añadir fondo estrellado (opcional)

### 🎯 Hora 5: Testing y Demo
**Tareas pendientes:**
- [ ] Testing en iOS y Android
- [ ] Ajustar velocidad de animaciones
- [ ] Bug fixing final
- [ ] Preparar demo

## 🌟 Extras Opcionales

### Prioridad 1 (Ya implementado)
- [x] Guardar High Score con AsyncStorage

### Prioridad 2 (Para implementar)
- [ ] Switch para activar/desactivar vibración
- [ ] Switch para activar/desactivar sonido
- [ ] Pantalla de configuración

### Prioridad 3 (Para implementar)
- [ ] Modo oscuro ultra para ahorrar batería
- [ ] Más colores de luciérnagas
- [ ] Dificultad ajustable (número de luciérnagas)

## 🐛 Debugging

### Ver logs:
```bash
npx expo start
# Presiona 'j' para abrir debugger
```

### Limpiar caché:
```bash
npx expo start -c
```

### Reinstalar dependencias:
```bash
rm -rf node_modules
npm install
```

## 📚 Documentación Adicional

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [expo-av (Audio)](https://docs.expo.dev/versions/latest/sdk/av/)
- [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## 🎨 Paleta de Colores

- **Fondo**: `#0a0e27` (Azul noche profundo)
- **Dorado primario**: `#ffd700` (Luciérnagas, botones)
- **Naranja**: `#ffa500`, `#ff6b00` (Brillo, sombras)
- **Púrpura**: `#a0a0ff` (Texto secundario, bordes)
- **Blanco**: `#e0e0e0` (Texto principal)

## 📄 Licencia

Este proyecto es un ejercicio educativo desarrollado en equipo.

---

**¡Buena suerte y que gane el mejor! 🔥✨**
# luciernagas
