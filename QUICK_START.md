# 🚀 Quick Start - Comenzar en 5 Minutos

## ⚡ Inicio Rápido

### 1. Instala Expo Go en tu teléfono
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### 2. Inicia el proyecto
```bash
cd /home/felix/Desktop/luciernaCopilot
npm start
```

O alternativamente:
```bash
npx expo start
```

### 3. Abre en tu dispositivo
1. Aparecerá un código QR en la terminal
2. **iOS**: Abre la app de Cámara y escanea el QR
3. **Android**: Abre Expo Go y escanea el QR
4. ¡Listo! La app se cargará en tu teléfono

## 📱 Comandos Básicos

```bash
# Iniciar el servidor de desarrollo
npm start

# Iniciar en Android (requiere emulador)
npm run android

# Iniciar en iOS (requiere Mac + Xcode)
npm run ios

# Limpiar caché si hay problemas
npx expo start -c
```

## 🎮 Probar el Juego

1. Toca "COMENZAR"
2. Observa la secuencia de luciérnagas iluminándose
3. Repite la secuencia tocando las luciérnagas
4. ¡Intenta llegar lo más lejos posible!

## 🔊 Añadir Sonidos (Opcional)

Por defecto, el juego funciona sin sonidos. Para añadirlos:

1. Consigue 4 archivos de audio (.mp3 o .wav)
2. Nómbralos: `firefly1.mp3`, `firefly2.mp3`, `firefly3.mp3`, `firefly4.mp3`
3. Colócalos en `/assets/sounds/`
4. Edita `App.js` línea 34:

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

5. Reinicia con `npx expo start -c`

### Recursos para sonidos:
- [BeepBox](https://beepbox.co/) - Crear tonos online
- [Freesound.org](https://freesound.org/) - Sonidos gratuitos
- Buscar "simon says sounds" en Google

## 🎨 Personalizar

### Cambiar el número de luciérnagas:
Edita `components/GameScreen.jsx` línea 10:
```javascript
const NUMBER_OF_FIREFLIES = 4;  // Cambiar a 6 u 8
```

### Cambiar los colores:
Edita `components/FireflyGrid.jsx` línea 7:
```javascript
const DEFAULT_COLORS = [
  '#FFD700', // Dorado
  '#FFA500', // Naranja
  '#FF6347', // Rojo tomate
  '#FF69B4', // Rosa
];
```

### Cambiar la velocidad:
Edita `components/GameScreen.jsx` línea ~37:
```javascript
delayBetween = 600  // Menor = más rápido y difícil
```

## 🐛 Solución de Problemas

### No aparece el QR
```bash
npx expo start --tunnel
```

### La app no carga
1. Asegúrate de que tu teléfono y computadora están en la misma red WiFi
2. Intenta con `npx expo start --tunnel`
3. Reinicia con `npx expo start -c`

### No vibra
- Las vibraciones solo funcionan en dispositivos reales
- No funcionan en emuladores
- Verifica que tu teléfono no esté en modo silencio total

### Sale error en el código
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install

# Limpiar caché de Expo
npx expo start -c
```

## 📚 Documentación Completa

- Ver `README.md` - Documentación completa del proyecto
- Ver `TEAM_GUIDE.md` - Guía detallada por equipo
- Ver `assets/sounds/README.md` - Guía de audio

## ✅ Checklist de Verificación

- [ ] Expo Go instalado en el teléfono
- [ ] Proyecto iniciado con `npm start`
- [ ] QR escaneado desde el teléfono
- [ ] App cargando en el dispositivo
- [ ] Pantalla de inicio visible
- [ ] Botón "COMENZAR" funciona
- [ ] Luciérnagas se iluminan en secuencia
- [ ] Puedo tocar las luciérnagas
- [ ] El juego valida mi entrada
- [ ] Se guarda el récord

## 🎯 Próximos Pasos

1. **Testear todas las funciones** - Juega varias partidas
2. **Añadir sonidos** - Mejora la experiencia
3. **Personalizar estilos** - Hazlo tuyo
4. **Compartir con amigos** - ¡Que lo prueben!

---

**¿Problemas? Revisa `TEAM_GUIDE.md` sección "Problemas Comunes"**

**¡A jugar! 🔥✨**
