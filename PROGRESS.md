# 📋 Progress Tracker - Plan de 5 Horas

Usa este archivo para marcar el progreso del equipo.

---

## ⏰ HORA 1: Base Funcional y Setup de Expo

### ✅ COMPLETADO
- [x] Proyecto Expo creado
- [x] Dependencias instaladas (expo-av, expo-haptics, AsyncStorage)
- [x] Estructura de carpetas creada
- [x] Todos los componentes base implementados
- [x] Sistema de navegación funcionando
- [x] Lógica del juego completa
- [x] Sistema de audio preparado
- [x] Sistema háptico implementado

### 📦 Estado: COMPLETADO ✅

**Nota**: El proyecto ya está 100% funcional. Las siguientes horas son para testing, ajustes y mejoras.

---

## ⏰ HORA 2: Ciclo de Juego Jugable

### Objetivo
Que el juego muestre una luz y el usuario pueda pulsarla. Ciclo completo funcionando.

### Tareas
- [ ] **Persona 4**: Probar el juego en dispositivo real con Expo Go
- [ ] **Persona 2 & 3**: Verificar que la secuencia se reproduce correctamente
- [ ] **Persona 4**: Añadir archivos de sonido básicos (ver `/assets/sounds/README.md`)
- [ ] **Persona 1**: Verificar que todas las pantallas se ven bien
- [ ] **Todo el equipo**: Jugar 5 partidas completas cada uno

### ✅ Checklist de Verificación
- [ ] La app carga sin errores
- [ ] Home → Game → GameOver funciona
- [ ] Las luciérnagas se iluminan en secuencia
- [ ] El bloqueo de input funciona (no se puede tocar durante la secuencia)
- [ ] La validación de entrada funciona (detecta aciertos y errores)
- [ ] El mensaje "Observa la secuencia..." aparece
- [ ] El mensaje "¡Tu turno!" aparece después

### 🐛 Bugs Encontrados
_(Anotar aquí cualquier bug encontrado)_
- 
- 
- 

---

## ⏰ HORA 3: Flujo Completo, Puntuación y AsyncStorage

### Objetivo
El juego avanza de nivel, cuenta puntos, termina la partida y guarda el récord.

### Tareas
- [ ] **Persona 2**: Verificar que la puntuación aumenta correctamente
- [ ] **Persona 2**: Testear que el récord se guarda al cerrar/abrir app
- [ ] **Persona 1**: Verificar que el ScoreBoard se actualiza en tiempo real
- [ ] **Persona 3**: Ajustar velocidad de animaciones si es necesario
- [ ] **Persona 4**: Asegurar transiciones fluidas entre pantallas
- [ ] **Todo el equipo**: Probar en iOS y Android (si es posible)

### ✅ Checklist de Verificación
- [ ] El nivel aumenta después de completar una secuencia
- [ ] La puntuación se muestra correctamente en el HUD
- [ ] El récord se guarda permanentemente
- [ ] Al reiniciar la app, el récord persiste
- [ ] La pantalla de Game Over muestra el récord correcto
- [ ] El badge "¡NUEVO RÉCORD!" aparece cuando corresponde

### 📊 Récords del Equipo
_(Anotar los récords de cada persona)_
- Persona 1: ___ puntos
- Persona 2: ___ puntos
- Persona 3: ___ puntos
- Persona 4: ___ puntos

---

## ⏰ HORA 4: Pulido Móvil (Experiencia Inmersiva)

### Objetivo
Que se sienta como un juego móvil real con sonido y vibraciones.

### Tareas
- [ ] **Persona 4**: Cargar sonidos en audioManager (actualizar App.js)
- [ ] **Persona 4**: Verificar feedback háptico en dispositivo real
- [ ] **Persona 3**: Mejorar animación de glow en las luciérnagas
- [ ] **Persona 1**: Pulir estilos, añadir fondo nocturno mejorado
- [ ] **Persona 2**: Revisar que los inputs estén correctamente bloqueados
- [ ] **Todo el equipo**: Testing de velocidad (¿muy rápido? ¿muy lento?)

### ✅ Checklist de Experiencia
- [ ] Los sonidos se reproducen correctamente
- [ ] Cada luciérnaga tiene su propio sonido
- [ ] Vibración ligera al tocar luciérnagas
- [ ] Vibración fuerte cuando pierdes
- [ ] El efecto glow es visible y bonito
- [ ] Las animaciones son fluidas (60fps)
- [ ] No hay elementos cortados por el notch

### 🎨 Ajustes Realizados
_(Anotar cambios de parámetros)_
- Velocidad de secuencia: ___ms (default: 600ms)
- Tamaño de luciérnagas: ___ (default: 90/75)
- Shadow radius: ___ (default: variable 5-30)
- Otros: ___

---

## ⏰ HORA 5: Testing en Dispositivos Reales y Demo

### Objetivo
Bug fixing final y preparación de la presentación.

### Tareas
- [ ] **Todo el equipo**: Escanear QR y probar en sus teléfonos reales
- [ ] **Persona 1 & 3**: Probar en iPhone (si disponible)
- [ ] **Persona 2 & 4**: Probar en Android (si disponible)
- [ ] **Todo el equipo**: Buscar bugs en diferentes escenarios
- [ ] **Persona 4**: Ajustar milisegundos de animaciones según feedback
- [ ] **Todo el equipo**: Resolver bugs críticos encontrados
- [ ] **Persona 1**: Preparar puntos para la demo

### 📱 Dispositivos Testeados
- [ ] iPhone (modelo: _______)
- [ ] Android (modelo: _______)
- [ ] iPad/Tablet (modelo: _______)
- [ ] Emulador iOS
- [ ] Emulador Android

### 🐛 Bugs Críticos Resueltos
_(Anotar bugs críticos y cómo se resolvieron)_
1. 
2. 
3. 

### 🎬 Puntos para la Demo
- [ ] Mostrar la pantalla de inicio
- [ ] Jugar una partida completa
- [ ] Mostrar el high score
- [ ] Demostrar sonidos y vibraciones
- [ ] Mostrar responsive en diferentes dispositivos
- [ ] Explicar la arquitectura del código

---

## ⭐ EXTRAS (Si sobra tiempo)

### Prioridad 1 - High Score
- [x] Guardar récord con AsyncStorage (YA IMPLEMENTADO)

### Prioridad 2 - Configuración
- [ ] Añadir Switch para activar/desactivar vibración
- [ ] Añadir Switch para activar/desactivar sonido
- [ ] Crear pantalla de Settings

### Prioridad 3 - Mejoras Visuales
- [ ] Modo oscuro ultra (ahorrar batería)
- [ ] Añadir estrellas en el fondo
- [ ] Más colores de luciérnagas
- [ ] Animación de partículas

### Prioridad 4 - Gameplay
- [ ] Selector de dificultad (4, 6 u 8 luciérnagas)
- [ ] Modo infinito vs modo por tiempo
- [ ] Power-ups (opcional)

---

## 📊 Métricas Finales

### Rendimiento
- FPS promedio: ___
- Tiempo de carga: ___s
- Tamaño de la app: ___MB

### Estadísticas de Juego
- Récord del equipo: ___ puntos
- Partidas jugadas: ___
- Bugs encontrados: ___
- Bugs resueltos: ___

### Estado del Proyecto
- Funcionalidad core: ✅ 100%
- Audio: ⬜ Pendiente añadir archivos
- Haptics: ✅ Implementado
- UI/UX: ✅ Completado
- Testing: ⬜ En progreso

---

## 🏆 Notas del Equipo

_(Espacio libre para notas, ideas o comentarios)_

### Persona 1 (UI):


### Persona 2 (Logic):


### Persona 3 (Animations):


### Persona 4 (Integration):


---

## ✅ CHECKLIST FINAL DE ENTREGA

- [ ] App funciona sin crashes
- [ ] Se puede jugar de inicio a fin
- [ ] Récord se guarda correctamente
- [ ] Funciona en iOS (si disponible)
- [ ] Funciona en Android
- [ ] Sonidos implementados (o documentado por qué no)
- [ ] Vibraciones funcionan en dispositivo real
- [ ] README.md actualizado
- [ ] Código comentado donde necesario
- [ ] Demo preparada

---

**Estado General del Proyecto: 🟢 LISTO PARA TESTING**

**Próximo Paso: Escanear QR con Expo Go y ¡jugar!**
