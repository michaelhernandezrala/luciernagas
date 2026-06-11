# 👥 Guía Rápida por Persona

Esta guía desglosa las tareas específicas para cada miembro del equipo.

---

## 🎨 Persona 1 - UI / Layout & Navigation

### Archivos de tu responsabilidad:
- ✅ `/components/HomeScreen.jsx`
- ✅ `/components/GameOverScreen.jsx`
- ✅ `/components/ScoreBoard.jsx`

### Tareas Completadas:
- [x] Estructura de pantallas móviles
- [x] SafeAreaView configurado
- [x] Navegación entre pantallas (manejada en App.js)
- [x] HUD superior con ScoreBoard
- [x] Diseño responsive

### Tareas Pendientes (Hora 2-3):
- [ ] **Probar en dispositivos reales**: Asegurarte de que el notch/Dynamic Island no tape contenido
- [ ] **Ajustar responsive**: Probar en diferentes tamaños (iPhone SE, Pro Max, tablets)
- [ ] **Mejorar mensajes**: Personalizar mensajes de ánimo en GameOverScreen
- [ ] **Pulir estilos**: Ajustar espaciados, tamaños de fuente según feedback

### Comandos útiles:
```bash
# Ver la app en tu teléfono
npx expo start
# Escanea el QR con Expo Go

# Ver diferentes dispositivos en el simulador
# iOS: Cmd+Shift+H para cambiar dispositivo
# Android: AVD Manager para diferentes resoluciones
```

### Tips:
- Usa `Dimensions.get('window')` para hacer cálculos responsive
- SafeAreaView maneja automáticamente el notch
- Los colores están en el README.md

---

## 🧠 Persona 2 - Game Logic & State Management

### Archivos de tu responsabilidad:
- ✅ `/hooks/useGameEngine.js`
- ✅ `/utils/sequenceGenerator.js`

### Tareas Completadas:
- [x] Hook useGameEngine con toda la lógica
- [x] Generación de secuencias aleatorias
- [x] Gestión de niveles y puntuación
- [x] Validación de entrada del usuario
- [x] Bloqueo de toques durante reproducción
- [x] Persistencia de récord con AsyncStorage

### Tareas Pendientes (Hora 2-4):
- [ ] **Testear lógica**: Jugar varias partidas para encontrar bugs
- [ ] **Ajustar dificultad**: Cambiar `NUMBER_OF_FIREFLIES` si necesario
- [ ] **Optimizar tiempos**: Ajustar delays entre niveles
- [ ] **Añadir variaciones**: (Opcional) Modo difícil con menos tiempo

### Archivos relacionados:
- `App.js` - Integración de AsyncStorage para high score
- `components/GameScreen.jsx` - Usa tu hook useGameEngine

### Para probar tu lógica:
```javascript
// En useGameEngine.js, puedes añadir console.logs:
console.log('Secuencia actual:', sequence);
console.log('Input del usuario:', userSequence);
console.log('Nivel:', currentLevel, 'Score:', score);
```

### Tips:
- El hook ya bloquea input durante `isPlayingSequence`
- AsyncStorage guarda automáticamente el high score
- Si quieres cambiar la velocidad del juego, edita el delay en `GameScreen.jsx` (línea ~37: `600` ms)

---

## ✨ Persona 3 - Luciérnagas y Animaciones

### Archivos de tu responsabilidad:
- ✅ `/components/Firefly.jsx`
- ✅ `/components/FireflyGrid.jsx`
- ✅ `/animations/gameAnimations.js`

### Tareas Completadas:
- [x] Componente Firefly con TouchableOpacity
- [x] Animaciones de brillo (opacidad + escala)
- [x] Sistema de animación en cadena
- [x] Grid responsive de luciérnagas
- [x] Animaciones de shake, flash, pulse

### Tareas Pendientes (Hora 3-4):
- [ ] **Mejorar efecto glow**: Ajustar shadowRadius y colores
- [ ] **Optimizar animaciones**: Probar diferentes duraciones
- [ ] **Añadir más efectos**: (Opcional) Partículas, trails
- [ ] **Testear performance**: Asegurar 60fps en dispositivos reales

### Parámetros a ajustar:

En `/components/Firefly.jsx`:
```javascript
// Duración del brillo (línea 18-19)
duration: 300  // Cambiar este valor

// Tamaño de la luciérnaga (línea 6)
const FIREFLY_SIZE = width > 375 ? 90 : 75;
```

En `/animations/gameAnimations.js`:
```javascript
// Delay entre luciérnagas (línea 18)
delayBetween = 600  // Más rápido = más difícil
```

### Tips:
- Usa `Animated.parallel` para combinar animaciones
- `useNativeDriver: true` mejora el performance
- shadowRadius alto = más glow (pero afecta performance)

---

## 🎵 Persona 4 - Integración, Audio y Hápticos

### Archivos de tu responsabilidad:
- ✅ `/utils/audioManager.js`
- ✅ `/utils/hapticManager.js`
- ✅ `/components/GameScreen.jsx`
- ✅ `App.js`

### Tareas Completadas:
- [x] Proyecto Expo inicializado
- [x] Estructura de carpetas
- [x] audioManager con expo-av
- [x] hapticManager con expo-haptics
- [x] Integración de todos los componentes
- [x] SafeAreaView configurado

### Tareas Pendientes (Hora 2-5):
- [ ] **Añadir archivos de sonido**: Ver `/assets/sounds/README.md`
- [ ] **Cargar sonidos en App.js**: Actualizar función `initializeAudio`
- [ ] **Ajustar feedback háptico**: Probar en dispositivo real
- [ ] **Testing completo**: iOS y Android
- [ ] **(Opcional) Añadir settings**: Switch para sonido/vibración

### Cómo añadir sonidos:

1. Descarga o crea 4 archivos de audio (.mp3)
2. Ponlos en `/assets/sounds/`
3. Edita `/App.js`:

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

### Recursos para sonidos:
- [BeepBox.co](https://beepbox.co/) - Crear tonos
- [Freesound.org](https://freesound.org/) - Sonidos gratis
- [Audacity](https://www.audacityteam.org/) - Editar audio

### Tipos de feedback háptico:

En `/utils/hapticManager.js`:
```javascript
hapticManager.light()      // Toque suave
hapticManager.medium()     // Toque medio
hapticManager.heavy()      // Toque fuerte
hapticManager.success()    // Éxito (2 toques)
hapticManager.error()      // Error (3 toques)
```

### Tips:
- Testa en dispositivo real (haptics no funcionan en simulador)
- Los sonidos deben ser cortos (<600ms)
- En iOS, el audio funcionará en modo silencioso

---

## 🚀 Comandos Útiles para Todo el Equipo

```bash
# Iniciar el proyecto
npx expo start

# Ver en tu teléfono
# Escanea el QR con Expo Go app

# Abrir en emulador
npx expo start --ios      # Requiere Mac
npx expo start --android  # Requiere Android Studio

# Limpiar caché (si hay problemas)
npx expo start -c

# Ver logs en tiempo real
# Los logs aparecen automáticamente en la terminal
```

## 📱 Testing Checklist

### Home Screen
- [ ] Se ve bien el título y subtítulo
- [ ] Botón "COMENZAR" funciona
- [ ] High score se muestra correctamente
- [ ] No hay elementos cortados por el notch

### Game Screen
- [ ] 4 luciérnagas se ven correctamente
- [ ] ScoreBoard muestra nivel, puntos y récord
- [ ] Animación de secuencia funciona
- [ ] "Observa la secuencia..." aparece
- [ ] "¡Tu turno!" aparece después
- [ ] Sonido se reproduce (si están cargados)
- [ ] Vibración funciona (en dispositivo real)
- [ ] Toques se bloquean durante secuencia

### Game Over Screen
- [ ] Muestra puntuación final
- [ ] "¡NUEVO RÉCORD!" aparece si aplica
- [ ] Botón "JUGAR DE NUEVO" funciona
- [ ] Botón "INICIO" vuelve al home
- [ ] Récord se guarda permanentemente

## 🐛 Problemas Comunes y Soluciones

### "No se ven las luciérnagas"
- Revisar que FireflyGrid esté correctamente importado
- Verificar que los colores estén definidos

### "No suena nada"
- Añadir archivos de audio en `/assets/sounds/`
- Actualizar `initializeAudio()` en App.js
- Verificar volumen del dispositivo

### "No vibra"
- Haptics solo funcionan en dispositivos reales
- No funcionan en simuladores/emuladores
- Verificar que el dispositivo no esté en modo "No molestar"

### "El notch tapa el contenido"
- Asegurar que todos los screens usen SafeAreaView
- Ya está implementado en HomeScreen, GameOverScreen
- GameScreen tiene SafeAreaView en ScoreBoard

### "La app va lenta"
- Reducir shadowRadius en Firefly.jsx
- Usar `useNativeDriver: true` en animaciones
- Probar en dispositivo real (más rápido que emulador)

---

## 📊 Distribución de Tiempo Sugerida

### Hora 2: Core Loop (TODOS)
- Persona 1: Testear navegación
- Persona 2: Verificar lógica del juego
- Persona 3: Ajustar velocidad de animaciones
- Persona 4: Añadir sonidos básicos

### Hora 3: Integración Completa (TODOS)
- Testear flujo completo
- Verificar que el récord se guarde
- Probar en 2-3 dispositivos diferentes

### Hora 4: Pulido (TODOS)
- Persona 1: Mejorar estilos y mensajes
- Persona 2: Optimizar tiempos y dificultad
- Persona 3: Perfeccionar animaciones
- Persona 4: Refinar audio y haptics

### Hora 5: Testing Final (TODOS)
- Jugar muchas partidas
- Buscar bugs
- Ajustar detalles finales
- Preparar demo

---

## 🎯 Objetivos Mínimos por Hora

**Hora 2**: Poder jugar 1 partida completa
**Hora 3**: Navegar entre todas las pantallas sin bugs
**Hora 4**: Sonidos y vibraciones funcionando
**Hora 5**: App lista para demo

---

**¡Éxito! 🔥 Cualquier duda, revisa el README.md principal**
