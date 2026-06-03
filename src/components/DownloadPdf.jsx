import { useState } from 'react';
import { jsPDF } from 'jspdf';
import projects from '../data/projects';

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 15;
const CONTENT_W = PAGE_W - MARGIN * 2;

const PORTRAIT_W = 40;
const PORTRAIT_H = 60;
const LANDSCAPE_W = 43;
const LANDSCAPE_H = 29;
const GAP = 2;
const MAX_DIM = 600;

const isPort = (p) =>
  p.carouselOptions && p.carouselOptions.itemWidth < p.carouselOptions.itemHeight;

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
      resolve(c.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });

const DownloadPdf = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    let y = MARGIN;
    let pageNum = 1;

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');

      const addPage = () => {
        pdf.setPage(pageNum);
        pdf.setFontSize(9);
        pdf.setTextColor(150);
        pdf.text(`${pageNum}`, PAGE_W / 2, PAGE_H - 7, { align: 'center' });
        pageNum++;
        pdf.addPage();
        y = MARGIN;
      };

      const checkSpace = (needed) => {
        if (y + needed > MARGIN + (PAGE_H - MARGIN * 2)) addPage();
      };

      checkSpace(35);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(30);
      pdf.setTextColor(26, 26, 26);
      pdf.text('ESTEFANY LADINO', PAGE_W / 2, y, { align: 'center' });
      y += 11;

      pdf.setFont('Helvetica', 'normal');
      pdf.setFontSize(13);
      pdf.setTextColor(128, 128, 128);
      pdf.text('ARQUITECTA', PAGE_W / 2, y, { align: 'center' });
      y += 8;

      pdf.setFontSize(10);
      pdf.text('estefany.ladinoest@unipamplona.edu.co', PAGE_W / 2, y, { align: 'center' });
      y += 12;

      pdf.setDrawColor(220);
      pdf.line(MARGIN, y, PAGE_W - MARGIN, y);
      y += 14;

      checkSpace(45);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(26, 26, 26);
      pdf.text('SOBRE MI', MARGIN, y);
      y += 10;

      pdf.setFont('Helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(51, 51, 51);
      const about =
        'Hola, soy estudiante de arquitectura con interes en el analisis urbano, la planificacion territorial, la gestion del patrimonio y la investigacion aplicada en los territorios. Mi experiencia academica se ha enfocado en el desarrollo de diagnosticos urbanos, elaboracion de cartografia tematica, analisis de espacio publico y estudio de dinamicas territoriales mediante metodologias de investigacion y herramientas de representacion espacial.';
      const aboutLines = pdf.splitTextToSize(about, CONTENT_W);
      pdf.text(aboutLines, MARGIN, y, { align: 'justify' });
      y += aboutLines.length * 4.5 + 14;

      checkSpace(50);
      pdf.setFont('Helvetica', 'bold');
      pdf.setFontSize(15);
      pdf.setTextColor(26, 26, 26);
      pdf.text('HERRAMIENTAS Y COMPETENCIAS', MARGIN, y);
      y += 10;

      const colW = CONTENT_W / 3;
      const cols = [
        { title: 'SIG', items: ['ArcGIS', 'Google Earth Pro'] },
        { title: 'Diseno', items: ['Illustrator', 'Photoshop'] },
        { title: 'Arquitectura', items: ['AutoCAD', 'Revit', 'SketchUp'] },
      ];
      const colY = y + 3;
      pdf.setDrawColor(220);
      cols.forEach((col, i) => {
        const x = MARGIN + i * colW;
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(11);
        pdf.setTextColor(26, 26, 26);
        pdf.text(col.title, x, colY);
        pdf.line(x, colY + 1, x + colW - 5, colY + 1);
        pdf.setFont('Helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(85, 85, 85);
        col.items.forEach((item, j) => {
          pdf.text(item, x, colY + 7 + j * 5);
        });
      });
      y = colY + 7 + Math.max(...cols.map((c) => c.items.length)) * 5 + 12;

      const preloaded = await Promise.all(
        projects.map(async (p) => ({
          id: p.id,
          images: await Promise.all(p.images.map(loadImg)),
        }))
      );

      for (const p of projects) {
        const imgData = preloaded.find((x) => x.id === p.id).images.filter(Boolean);

        checkSpace(25);
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(13);
        pdf.setTextColor(26, 26, 26);
        pdf.text(p.title, MARGIN, y);
        y += 8;

        pdf.setFont('Helvetica', 'normal');
        pdf.setFontSize(9);
        pdf.setTextColor(51, 51, 51);
        const descLines = pdf.splitTextToSize(p.description, CONTENT_W);
        pdf.text(descLines, MARGIN, y, { align: 'justify' });
        y += descLines.length * 4 + 8;

        const port = isPort(p);
        const imgW = port ? PORTRAIT_W : LANDSCAPE_W;
        const imgH = port ? PORTRAIT_H : LANDSCAPE_H;
        const perRow = Math.max(1, Math.floor((CONTENT_W + GAP) / (imgW + GAP)));
        const totalRowW = perRow * imgW + (perRow - 1) * GAP;
        const centerOff = Math.max(0, (CONTENT_W - totalRowW) / 2);
        const rows = Math.ceil(imgData.length / perRow);

        let rowY = y;
        for (let r = 0; r < rows; r++) {
          if (rowY + imgH > MARGIN + (PAGE_H - MARGIN * 2)) {
            addPage();
            rowY = y;
          }
          for (let col = 0; col < perRow; col++) {
            const idx = r * perRow + col;
            if (idx >= imgData.length) break;
            if (imgData[idx]) {
              pdf.addImage(imgData[idx], 'JPEG', MARGIN + centerOff + col * (imgW + GAP), rowY, imgW, imgH);
            }
          }
          rowY += imgH + GAP;
        }
        y = rowY + 12;
      }

      for (let i = 1; i <= pdf.getNumberOfPages(); i++) {
        pdf.setPage(i);
        pdf.setFontSize(9);
        pdf.setTextColor(150);
        pdf.text(`${i}`, PAGE_W / 2, PAGE_H - 7, { align: 'center' });
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
