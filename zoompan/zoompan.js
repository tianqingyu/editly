/* eslint-disable import/prefer-default-export */
import { loadImage, registerFont } from 'canvas';

// registerFont('./assets/Patua_One/PatuaOne-Regular.ttf');

// ctx.font = '12px "Comic Sans"'
// ctx.fillText('Everyone loves this font :)', 250, 10)
// var text = ctx.measureText('Awesome!')
// text.width

/** 右移 */
export function panRight({ srtTexts, mediaUrls, wavDuration }) {
  return async ({ canvas, width, height }) => {
    async function onRender(progress) {
      const context = canvas.getContext('2d');
      const img = await loadImage(mediaUrls[0]);

      const centerX = (width - img.width) / 2;
      const offset = Math.abs(centerX) * 0.5;

      const x = centerX + offset - offset * 2 * progress;
      context.drawImage(img, x, 0, height, height);

      context.font = 'bold 40px “San Franciso”';
      context.fillStyle = '#fff';
      context.shadowBlur = 4;
      context.shadowColor = 'rgba(0,0,0,1)';
      context.fillText(srtTexts.split('\n\n')[0].split('\n')[2], 100, height - 100);
    }
    function onClose() {}
    return { onRender, onClose };
  };
}

/** 左移 */
export function panLeft({ srtTexts, mediaUrls, wavDuration }) {
  return async ({ canvas, width, height }) => {
    async function onRender(progress) {
      const context = canvas.getContext('2d');
      const img = await loadImage(mediaUrls[0]);

      const centerX = (width - img.width) / 2;
      const offset = Math.abs(centerX) * 0.5;

      const x = centerX - offset + offset * 2 * progress;
      context.drawImage(img, x, 0, height, height);

      context.font = '22px';
      context.fillText(srtTexts.split('\n\n')[0].split('\n')[2], 100, height - 100);
    }
    function onClose() {}
    return { onRender, onClose };
  };
}

/** 上移 */
export function panUp({ srtTexts, mediaUrls, wavDuration }) {
  return async ({ canvas, width, height }) => {
    async function onRender(progress) {
      const context = canvas.getContext('2d');
      const img = await loadImage(mediaUrls[0]);

      const centerY = (height - img.height) / 2;
      const offset = Math.abs(centerY) * 0.5;

      const y = centerY - offset + offset * 2 * progress;
      context.drawImage(img, 0, y, width, width);

      context.font = '22px';
      context.fillText(srtTexts.split('\n\n')[0].split('\n')[2], 100, height - 100);
    }
    function onClose() {}
    return { onRender, onClose };
  };
}

/** 下移 */
export function panDown({ srtTexts, mediaUrls, wavDuration }) {
  return async ({ canvas, width, height }) => {
    async function onRender(progress) {
      const context = canvas.getContext('2d');
      const img = await loadImage(mediaUrls[0]);

      const centerY = (height - img.height) / 2;
      const offset = Math.abs(centerY) * 0.5;

      const y = centerY + offset - offset * 2 * progress;
      context.drawImage(img, 0, y, width, width);

      context.font = '22px';
      context.fillText(srtTexts.split('\n\n')[0].split('\n')[2], 100, height - 100);
    }
    function onClose() {}
    return { onRender, onClose };
  };
}

/**
 * 获取平移效果
 *
 * @param {string} effectName pan-right、pan-left、pan-down、pan-up
 */
export function getPanEffectBy({ effectName, srtTexts, mediaUrls, wavDuration }) {
  switch (effectName) {
    case 'pan-right': return panRight({ srtTexts, mediaUrls, wavDuration });
    case 'pan-left': return panLeft({ srtTexts, mediaUrls, wavDuration });
    case 'pan-down': return panDown({ srtTexts, mediaUrls, wavDuration });
    case 'pan-up': return panUp({ srtTexts, mediaUrls, wavDuration });
    default: return panRight({ srtTexts, mediaUrls, wavDuration });
  }
}
