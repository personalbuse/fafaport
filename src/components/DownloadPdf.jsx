import { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import projects from '../data/projects';

const pxPerMm = 800 / 210;

const DownloadPdf = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    const pagePx = Math.round(pageHeight * pxPerMm);
    const marginPx = Math.round(margin * pxPerMm);

    const container = document.createElement('div');
    container.style.cssText = `position:fixed;left:-9999px;top:0;width:800px;background:#F9F6F0;padding:${marginPx}px;font-family:Inter,system-ui,sans-serif;`;

    container.innerHTML = `
      <div style="text-align:center;margin-bottom:40px;border-bottom:1px solid #ddd;padding-bottom:30px;">
        <h1 style="font-size:48px;font-family:'Ambule',sans-serif;letter-spacing:0.05em;color:#1A1A1A;margin:0 0 8px;">Estefany Ladino</h1>
        <p style="font-size:16px;letter-spacing:0.2em;text-transform:uppercase;color:#1A1A1A66;margin:0;">Arquitecta</p>
        <p style="font-size:12px;color:#1A1A1A66;margin-top:12px;">estefany.ladinoest@unipamplona.edu.co</p>
      </div>

      <div style="margin-bottom:40px;">
        <h2 style="font-size:22px;font-weight:500;letter-spacing:0.1em;color:#1A1A1A;margin:0 0 12px;">Sobre Mi</h2>
        <p style="font-size:13px;line-height:1.7;color:#333;margin:0;">Hola, soy estudiante de arquitectura con interes en el analisis urbano, la planificacion territorial, la gestion del patrimonio y la investigacion aplicada en los territorios. Mi experiencia academica se ha enfocado en el desarrollo de diagnosticos urbanos, elaboracion de cartografia tematica, analisis de espacio publico y estudio de dinamicas territoriales mediante metodologias de investigacion y herramientas de representacion espacial.</p>
      </div>

      <div style="margin-bottom:40px;">
        <h2 style="font-size:22px;font-weight:500;letter-spacing:0.1em;color:#1A1A1A;margin:0 0 16px;">Herramientas y Competencias</h2>
        <div style="display:flex;gap:40px;">
          <div style="flex:1;"><h3 style="font-size:15px;font-weight:500;border-bottom:1px solid #ddd;padding-bottom:8px;margin:0 0 10px;">SIG</h3><p style="font-size:13px;color:#555;margin:4px 0;">ArcGIS</p><p style="font-size:13px;color:#555;margin:4px 0;">Google Earth Pro</p></div>
          <div style="flex:1;"><h3 style="font-size:15px;font-weight:500;border-bottom:1px solid #ddd;padding-bottom:8px;margin:0 0 10px;">Diseno</h3><p style="font-size:13px;color:#555;margin:4px 0;">Illustrator</p><p style="font-size:13px;color:#555;margin:4px 0;">Photoshop</p></div>
          <div style="flex:1;"><h3 style="font-size:15px;font-weight:500;border-bottom:1px solid #ddd;padding-bottom:8px;margin:0 0 10px;">Arquitectura</h3><p style="font-size:13px;color:#555;margin:4px 0;">AutoCAD</p><p style="font-size:13px;color:#555;margin:4px 0;">Revit</p><p style="font-size:13px;color:#555;margin:4px 0;">SketchUp</p></div>
        </div>
      </div>

      ${projects.map((p) => `
        <div style="margin-bottom:40px;">
          <h2 style="font-size:20px;font-family:'Ambule',sans-serif;letter-spacing:0.03em;color:#1A1A1A;margin:0 0 10px;">${p.title}</h2>
          <p style="font-size:13px;line-height:1.6;color:#333;margin:0 0 16px;">${p.description}</p>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            ${p.images.map((img) => `
              <div style="width:${p.carouselOptions ? '170px' : '180px'};height:${p.carouselOptions ? '260px' : '120px'};overflow:hidden;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                <img src="${img}" style="width:100%;height:100%;object-fit:cover;" />
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}

      <div style="text-align:center;padding-top:30px;border-top:1px solid #ddd;color:#999;font-size:11px;">
        <p style="margin:0;">Portafolio - Estefany Ladino</p>
      </div>
    `;

    document.body.appendChild(container);

    await Promise.all(
      Array.from(container.querySelectorAll('img')).map(
        (img) => new Promise((resolve) => {
          if (img.complete) resolve();
          else { img.onload = resolve; img.onerror = resolve; }
        })
      )
    );

    await new Promise((r) => setTimeout(r, 500));

    const totalHeight = container.scrollHeight;
    let yOffset = 0;
    let pageNum = 1;

    try {
      while (yOffset < totalHeight) {
        const viewHeight = Math.min(pagePx, totalHeight - yOffset);

        const canvas = await html2canvas(container, {
          width: 800,
          height: viewHeight,
          y: yOffset,
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#F9F6F0',
          logging: false,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgH = (canvas.height * contentWidth) / canvas.width;

        if (pageNum > 1) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
        pdf.setFontSize(9);
        pdf.setTextColor(150);
        pdf.text(`${pageNum}`, pageWidth / 2, pageHeight - 7, { align: 'center' });

        yOffset += viewHeight;
        pageNum++;
      }

      pdf.save('portafolio-estefany-ladino.pdf');
    } finally {
      document.body.removeChild(container);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-dark text-cream text-sm font-sans font-medium uppercase tracking-wider hover:bg-dark/80 transition-all duration-200 shadow-lg flex items-center justify-center"
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
