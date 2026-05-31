const generateTile = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const canvas = document.createElement('canvas');
      canvas.width = w * 2;
      canvas.height = h * 2;
      const ctx = canvas.getContext('2d');

      ctx.save();
      ctx.translate(0, 0);
      ctx.scale(1, 1);
      ctx.drawImage(img, 0, 0, w, h);

      ctx.save();
      ctx.translate(w * 2, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, w, h);
      ctx.restore();

      ctx.save();
      ctx.translate(0, h * 2);
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0, w, h);
      ctx.restore();

      ctx.save();
      ctx.translate(w * 2, h * 2);
      ctx.scale(-1, -1);
      ctx.drawImage(img, 0, 0, w, h);
      ctx.restore();

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = src;
  });

export default generateTile;
