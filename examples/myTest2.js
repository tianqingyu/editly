import editly from '../index.js';
import { getPanEffectBy } from '../zoompan/zoompan.js';

editly({
  width: 1024,
  height: 576,
  fps: 30,
  outPath: './output/myTest2.mp4',
  clips: [
    {
      duration: 3,
      layers: [
        // { type: 'audio', path: './assets/sample1.m4a' },
        { type: 'canvas', func: getPanEffectBy('h-pan-down') },
      ],
    },
  ],
  loopAudio: true,
  keepSourceAudio: true,
  // audioTracks: [
  //   { path: './assets/High [NCS Release] - JPB  (No Copyright Music)-R8ZRCXy5vhA.m4a', mixVolume: 0.2 },
  // ],
}).catch(console.error);
