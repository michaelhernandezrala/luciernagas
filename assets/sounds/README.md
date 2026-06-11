# Sounds Directory

Este directorio debe contener los archivos de audio para el juego.

## Archivos requeridos

Para un juego con 4 luciérnagas, necesitas 4 archivos de sonido diferentes:

```
sounds/
├── firefly1.mp3  (o .wav)
├── firefly2.mp3
├── firefly3.mp3
└── firefly4.mp3
```

## Especificaciones recomendadas

- **Formato**: MP3 o WAV
- **Duración**: 200-600ms
- **Tamaño**: <100KB por archivo
- **Sample Rate**: 44.1kHz
- **Bitrate**: 128kbps para MP3

## Tonos sugeridos

Para un juego estilo Simon Says, se recomienda usar diferentes frecuencias:

1. **Firefly 1**: 329.63 Hz (E4 - Mi)
2. **Firefly 2**: 261.63 Hz (C4 - Do)
3. **Firefly 3**: 392.00 Hz (G4 - Sol)
4. **Firefly 4**: 440.00 Hz (A4 - La)

## Recursos para crear sonidos

### Herramientas online gratuitas:
- [BeepBox](https://beepbox.co/) - Crear tonos personalizados
- [Audacity](https://www.audacityteam.org/) - Editor de audio gratuito
- [ChipTone](https://sfbgames.itch.io/chiptone) - Generador de efectos retro

### Librerías de sonidos gratuitos:
- [Freesound.org](https://freesound.org/)
- [Zapsplat](https://www.zapsplat.com/)
- [Mixkit](https://mixkit.co/free-sound-effects/)

## Cómo añadir los sonidos al proyecto

1. Coloca tus archivos de audio en esta carpeta (`/assets/sounds/`)

2. Abre `/App.js` y actualiza la función `initializeAudio`:

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

3. Reinicia la app con `npx expo start -c`

## Sonidos de prueba rápidos

Si necesitas empezar rápido, puedes usar sonidos generados programáticamente o buscar packs de "simon says sounds" en los recursos mencionados arriba.

## Notas importantes

- Los archivos deben ser pequeños para no afectar el rendimiento
- Testa los sonidos en dispositivos reales, no solo en emulador
- En iOS, los sonidos funcionarán incluso en modo silencioso gracias a la configuración de `audioManager`
