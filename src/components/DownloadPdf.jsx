import { useState } from 'react';
import { jsPDF } from 'jspdf';
import projects from '../data/projects';

const MARGIN = 18;
const MAX_DIM = 1600;

const loadImg = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      if (w > MAX_DIM || h > MAX_DIM) {
        const s = Math.min(MAX_DIM / w, MAX_DIM / h);
        w = Math.round(w * s);
        h = Math.round(h * s);
      }
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve({
        dataUrl: c.toDataURL('image/jpeg', 0.8),
        width: w,
        height: h,
      });
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });

const getOrientation = (w, h) => (w / h > 1.05 ? 'landscape' : 'portrait');

const P = 210;
const L = 297;

const DownloadPdf = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    let y = MARGIN;
    let pageSizes = [{ w: P, h: L }];

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');

      const addNewPage = (w, h, orient) => {
        pdf.addPage('a4', orient === 'landscape' ? 'l' : 'p');
        pageSizes.push({ w, h });
        y = MARGIN;
      };

      const checkSpace = (needed) => {
        const { h } = pageSizes[pageSizes.length - 1];
        if (y + needed > MARGIN + (h - MARGIN * 2)) addNewPage(P, L, 'p');
      };

      checkSpace(40);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(36);
      pdf.setTextColor(26, 26, 26);
      pdf.text('ESTEFANY LADINO', P / 2, y, { align: 'center' });
      y += 15;

      pdf.setFont('Helvetica', 'normal');
      pdf.setFontSize(18);
      pdf.setTextColor(128, 128, 128);
      pdf.text('ARQUITECTA', P / 2, y, { align: 'center' });
      y += 11;

      pdf.setFontSize(13);
      pdf.text('estefany.ladinoest@unipamplona.edu.co', P / 2, y, { align: 'center' });
      y += 9;

      pdf.setFontSize(13);
      pdf.setTextColor(70, 130, 200);
      pdf.text('estefanyladino.vercel.app', P / 2, y, { align: 'center' });
      pdf.setTextColor(26, 26, 26);
      y += 16;

      pdf.setDrawColor(220);
      pdf.line(MARGIN, y, P - MARGIN, y);
      y += 18;

      checkSpace(60);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.setTextColor(26, 26, 26);
      pdf.text('SOBRE MI', MARGIN, y);
      y += 13;

      pdf.setFont('Helvetica', 'normal');
      pdf.setFontSize(13);
      pdf.setTextColor(51, 51, 51);
      const about =
        'Hola, soy estudiante de arquitectura con interes en el analisis urbano, la planificacion territorial, la gestion del patrimonio y la investigacion aplicada en los territorios. Mi experiencia academica se ha enfocado en el desarrollo de diagnosticos urbanos, elaboracion de cartografia tematica, analisis de espacio publico y estudio de dinamicas territoriales mediante metodologias de investigacion y herramientas de representacion espacial.';
      const aboutLines = pdf.splitTextToSize(about, P - MARGIN * 2);
      pdf.text(aboutLines, MARGIN, y, { align: 'justify', maxWidth: P - MARGIN * 2 });
      y += aboutLines.length * 6 + 18;

      checkSpace(65);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.setTextColor(26, 26, 26);
      pdf.text('HERRAMIENTAS Y COMPETENCIAS', P / 2, y, { align: 'center' });
      y += 14;

      const cols = [
        { title: 'SIG', items: ['ArcGIS', 'Google Earth Pro'] },
        { title: 'Diseno', items: ['Illustrator', 'Photoshop'] },
        { title: 'Arquitectura', items: ['AutoCAD', 'Revit', 'SketchUp'] },
      ];
      const colW = 50;
      const totalW = cols.length * colW + (cols.length - 1) * 10;
      const colOff = (P - totalW) / 2;
      const colY = y;
      cols.forEach((col, i) => {
        const cx = colOff + i * (colW + 10);
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(26, 26, 26);
        pdf.text(col.title, cx + colW / 2, colY, { align: 'center' });
        pdf.setDrawColor(220);
        pdf.line(cx + 5, colY + 2, cx + colW - 5, colY + 2);
        pdf.setFont('Helvetica', 'normal');
        pdf.setFontSize(12);
        pdf.setTextColor(85, 85, 85);
        col.items.forEach((item, j) => {
          pdf.text(item, cx + colW / 2, colY + 8 + j * 6, { align: 'center' });
        });
      });
      y = colY + 8 + Math.max(...cols.map((c) => c.items.length)) * 6 + 16;

      const preloaded = await Promise.all(
        projects.map(async (p) => ({
          id: p.id,
          images: await Promise.all(p.images.map(loadImg)),
        }))
      );

      for (const p of projects) {
        const imgs = preloaded.find((x) => x.id === p.id).images.filter(Boolean);

        addNewPage(P, L, 'p');

        const cw = P - MARGIN * 2;

        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(22);
        pdf.setTextColor(26, 26, 26);
        const titleLines = pdf.splitTextToSize(p.title, cw);
        const titleH = titleLines.length * 7;

        pdf.setFont('Helvetica', 'normal');
        pdf.setFontSize(13);
        pdf.setTextColor(51, 51, 51);
        const descLines = pdf.splitTextToSize(p.description, cw);
        const descH = descLines.length * 5.5;

        const totalH = titleH + 12 + descH;
        let sy = (L - totalH) / 2;

        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(22);
        pdf.setTextColor(26, 26, 26);
        pdf.text(titleLines, MARGIN, sy);
        sy += titleH + 12;

        pdf.setFont('Helvetica', 'normal');
        pdf.setFontSize(13);
        pdf.setTextColor(51, 51, 51);
        pdf.text(descLines, MARGIN, sy, { align: 'justify', maxWidth: cw });

        for (const img of imgs) {
          const orient = p.portrait ? 'portrait' : getOrientation(img.width, img.height);
          const pw = orient === 'landscape' ? L : P;
          const ph = orient === 'landscape' ? P : L;

          addNewPage(pw, ph, orient);

          const areaW = pw - MARGIN * 2;
          const areaH = ph - MARGIN * 2;
          const imgRatio = img.width / img.height;
          const areaRatio = areaW / areaH;

          let rw, rh;
          if (imgRatio > areaRatio) {
            rw = areaW;
            rh = areaW / imgRatio;
          } else {
            rh = areaH;
            rw = areaH * imgRatio;
          }

          pdf.addImage(img.dataUrl, 'JPEG', (pw - rw) / 2, (ph - rh) / 2, rw, rh);
        }
      }

      for (let i = 1; i <= pdf.getNumberOfPages(); i++) {
        pdf.setPage(i);
        const { w, h } = pageSizes[i - 1];
        pdf.setFontSize(10);
        pdf.setTextColor(150);
        pdf.text(`${i}`, w / 2, h - 8, { align: 'center' });
      }

      pdf.save('portafolio-estefany-ladino.pdf');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      aria-label="Descargar portafolio en PDF"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-dark text-cream text-sm font-sans font-medium uppercase tracking-wider hover:bg-dark/80 transition-all duration-200 shadow-lg flex items-center justify-center"
    >
      {loading ? (
        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        'dl'
      )}
    </button>
  );
};

export default DownloadPdf;
