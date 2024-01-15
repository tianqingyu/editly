/* eslint-disable import/prefer-default-export */
import { loadImage } from 'canvas';

/** 右移 */
export async function panRight({ canvas, width, height }) {
  async function onRender(progress) {
    const context = canvas.getContext('2d');
    const img = await loadImage('./input/1.png');

    const centerX = (width - img.width) / 2;
    const offset = Math.abs(centerX) * 0.5;

    const x = centerX + offset - offset * 2 * progress;
    context.drawImage(img, x, 0, height, height);
  }
  function onClose() {}
  return { onRender, onClose };
}

/** 左移 */
export async function panLeft({ canvas, width, height }) {
  async function onRender(progress) {
    const context = canvas.getContext('2d');
    const img = await loadImage('./input/1.png');

    const centerX = (width - img.width) / 2;
    const offset = Math.abs(centerX) * 0.5;

    const x = centerX - offset + offset * 2 * progress;
    context.drawImage(img, x, 0, height, height);
  }
  function onClose() {}
  return { onRender, onClose };
}

/** 上移 */
export async function panUp({ canvas, width, height }) {
  async function onRender(progress) {
    const context = canvas.getContext('2d');
    const img = await loadImage('./input/1.png');

    const centerY = (height - img.height) / 2;
    const offset = Math.abs(centerY) * 0.5;

    const y = centerY - offset + offset * 2 * progress;
    context.drawImage(img, 0, y, width, width);
  }
  function onClose() {}
  return { onRender, onClose };
}

/** 下移 */
export async function panDown({ canvas, width, height }) {
  async function onRender(progress) {
    const context = canvas.getContext('2d');
    const img = await loadImage('./input/1.png');

    const centerY = (height - img.height) / 2;
    const offset = Math.abs(centerY) * 0.5;

    const y = centerY + offset - offset * 2 * progress;
    context.drawImage(img, 0, y, width, width);
  }
  function onClose() {}
  return { onRender, onClose };
}

/**
 * 获取平移效果
 *
 * @param {string} effectName v-pan-right、v-pan-left、h-pan-down、h-pan-up
 */
export function getPanEffectBy(effectName) {
  switch (effectName) {
    case 'v-pan-right': return panRight;
    case 'v-pan-left': return panLeft;
    case 'h-pan-down': return panDown;
    case 'h-pan-up': return panUp;
    default: return panRight;
  }
}
