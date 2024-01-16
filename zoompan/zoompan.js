/* eslint-disable no-bitwise */
/* eslint-disable no-constant-condition */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-mixed-operators */
/* eslint-disable import/prefer-default-export */
import { loadImage } from 'canvas';

// registerFont('./assets/Patua_One/PatuaOne-Regular.ttf');

/** cover mode */
function resizeForCoverMode(canvas, img) {
  let rate = canvas.width / img.width;
  let imgW = rate >= 1 ? img.width * rate : img.width / rate;
  let imgH = rate >= 1 ? img.height * rate : img.height / rate;
  if (imgH < canvas.height) {
    rate = canvas.height / img.height;
    imgW = rate >= 1 ? img.width * rate : img.width / rate;
    imgH = rate >= 1 ? img.height * rate : img.height / rate;
  }
  return [imgW, imgH];
}

/** 获取当前播放时间对应的字幕内容 */
function getSrtTextOnCurrTime(progress, srtTexts, duration) {
  const ptime = duration * progress;
  const sec = Math.floor(ptime);
  const ms = (ptime - sec) * 1000;
  const dt = new Date(0, 0, 0, 0, 0, sec);
  const time = `${dt.toLocaleTimeString('zh-CN')},${ms.toFixed(0).padStart(3, '0')}`;

  const a = srtTexts.split('\n\n');
  for (const s of a) {
    if (s) {
      const b = s.split('\n');
      const c = b[1].split(' --> ');
      if (c[0] < time && time <= c[1]) {
        return b[2];
      }
    }
  }
  return '';
}

/** draw text */
function drawText(canvas, ctx, progress, fontSize, srtTexts, wavDuration) {
  ctx.font = `bold ${fontSize}px “San Franciso”`;
  ctx.fillStyle = '#fff';
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#000';

  const maxW = canvas.width * 0.9;
  const text = getSrtTextOnCurrTime(progress, srtTexts, wavDuration);

  const lines = [{ text: '', w: 0, y: 0 }];
  for (const c of text) {
    const { width } = ctx.measureText(c);
    const last = lines[lines.length - 1];
    last.text += c;
    last.w += width;
    if (last.w >= maxW) {
      lines.push({ text: '', w: 0, y: last.y + fontSize + 10 });
    }
  }

  const y = canvas.height / 4 * 3 - lines[lines.length - 1].y / 2;
  for (const line of lines) {
    const x = (canvas.width - line.w) / 2;
    ctx.fillText(line.text, x, y + line.y);
  }
}

/** 进度对应的index */
function getIndexBy(progress, count) {
  const f = 1 / count;
  return progress / f | 0;
}

/**
 * zoom: 放大
 */
function zoomIn({ srtTexts, mediaUrls, wavDuration, fontSize }) {
  return async ({ canvas }) => {
    const imgs = [];

    async function onRender(progress) {
      const ctx = canvas.getContext('2d');

      const i = getIndexBy(progress, mediaUrls.length);
      imgs[i] ??= await loadImage(mediaUrls[i]);
      const img = imgs[i];

      const [imgW, imgH] = resizeForCoverMode(canvas, img);
      const zoom = 1 + 0.3 * progress;
      const imgX = (canvas.width - imgW * zoom) / 2;
      const imgY = (canvas.height - imgH * zoom) / 2;
      ctx.drawImage(img, imgX, imgY, imgW * zoom, imgH * zoom);

      drawText(canvas, ctx, progress, fontSize, srtTexts, wavDuration);
    }
    function onClose() {
      imgs.length = 0;
    }

    return { onRender, onClose };
  };
}

/**
 * zoom: 缩小
 */
function zoomOut({ srtTexts, mediaUrls, wavDuration, fontSize }) {
  return async ({ canvas }) => {
    const imgs = [];

    async function onRender(progress) {
      const ctx = canvas.getContext('2d');

      const i = getIndexBy(progress, mediaUrls.length);
      imgs[i] ??= await loadImage(mediaUrls[i]);
      const img = imgs[i];

      const [imgW, imgH] = resizeForCoverMode(canvas, img);
      const zoom = 1.3 - 0.3 * progress;
      const imgX = (canvas.width - imgW * zoom) / 2;
      const imgY = (canvas.height - imgH * zoom) / 2;
      ctx.drawImage(img, imgX, imgY, imgW * zoom, imgH * zoom);

      drawText(canvas, ctx, progress, fontSize, srtTexts, wavDuration);
    }
    function onClose() {
      imgs.length = 0;
    }

    return { onRender, onClose };
  };
}

/**
 * pan：右移
 */
function panRight({ srtTexts, mediaUrls, wavDuration, fontSize }) {
  return async ({ canvas }) => {
    const imgs = [];

    async function onRender(progress) {
      const ctx = canvas.getContext('2d');

      const i = getIndexBy(progress, mediaUrls.length);
      imgs[i] ??= await loadImage(mediaUrls[i]);
      const img = imgs[i];

      const centerX = (canvas.width - img.width) / 2;
      const offset = Math.abs(centerX) * 0.5;
      const imgX = centerX + offset - offset * 2 * progress;
      ctx.drawImage(img, imgX, 0, canvas.height, canvas.height);

      drawText(canvas, ctx, progress, fontSize, srtTexts, wavDuration);
    }
    function onClose() {
      imgs.length = 0;
    }

    return { onRender, onClose };
  };
}

/**
 * pan：左移
 */
function panLeft({ srtTexts, mediaUrls, wavDuration, fontSize }) {
  return async ({ canvas }) => {
    const imgs = [];

    async function onRender(progress) {
      const ctx = canvas.getContext('2d');

      const i = getIndexBy(progress, mediaUrls.length);
      imgs[i] ??= await loadImage(mediaUrls[i]);
      const img = imgs[i];

      const centerX = (canvas.width - img.width) / 2;
      const offset = Math.abs(centerX) * 0.5;
      const imgX = centerX - offset + offset * 2 * progress;
      ctx.drawImage(img, imgX, 0, canvas.height, canvas.height);

      drawText(canvas, ctx, progress, fontSize, srtTexts, wavDuration);
    }
    function onClose() {
      imgs.length = 0;
    }

    return { onRender, onClose };
  };
}

/**
 * pan：上移
 */
function panUp({ srtTexts, mediaUrls, wavDuration, fontSize }) {
  return async ({ canvas }) => {
    const imgs = [];

    async function onRender(progress) {
      const ctx = canvas.getContext('2d');

      const i = getIndexBy(progress, mediaUrls.length);
      imgs[i] ??= await loadImage(mediaUrls[i]);
      const img = imgs[i];

      const centerY = (canvas.height - img.height) / 2;
      const offset = Math.abs(centerY) * 0.5;
      const imgY = centerY - offset + offset * 2 * progress;
      ctx.drawImage(img, 0, imgY, canvas.width, canvas.width);

      drawText(canvas, ctx, progress, fontSize, srtTexts, wavDuration);
    }
    function onClose() {
      imgs.length = 0;
    }

    return { onRender, onClose };
  };
}

/**
 * pan：下移
 */
function panDown({ srtTexts, mediaUrls, wavDuration, fontSize }) {
  return async ({ canvas }) => {
    const imgs = [];

    async function onRender(progress) {
      const ctx = canvas.getContext('2d');

      const i = getIndexBy(progress, mediaUrls.length);
      imgs[i] ??= await loadImage(mediaUrls[i]);
      const img = imgs[i];

      const centerY = (canvas.height - img.height) / 2;
      const offset = Math.abs(centerY) * 0.5;
      const imgY = centerY + offset - offset * 2 * progress;
      ctx.drawImage(img, 0, imgY, canvas.width, canvas.width);

      drawText(canvas, ctx, progress, fontSize, srtTexts, wavDuration);
    }
    function onClose() {
      imgs.length = 0;
    }

    return { onRender, onClose };
  };
}

/**
 * 获取缩放、平移效果
 *
 * @param {string} effectName zoom-in、zoom-out、pan-right、pan-left、pan-down、pan-up
 */
export function getZoomPanEffect(video, fontSize) {
  switch (video.effectName) {
    case 'zoom-in': return zoomIn({ ...video, fontSize });
    case 'zoom-out': return zoomOut({ ...video, fontSize });
    case 'pan-right': return panRight({ ...video, fontSize });
    case 'pan-left': return panLeft({ ...video, fontSize });
    case 'pan-down': return panDown({ ...video, fontSize });
    case 'pan-up': return panUp({ ...video, fontSize });
    default: return zoomIn({ ...video, fontSize });
  }
}
