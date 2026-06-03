import { useRef, useEffect, useState, useCallback } from 'react';

const Carousel3D = ({
  images,
  itemWidth: desktopWidth = 540,
  itemHeight: desktopHeight = 360,
  radius: desktopRadius = 1500,
  offsetZ: desktopOffsetZ = -500,
}) => {
  const carouselRef = useRef(null);
  const [expandedImg, setExpandedImg] = useState(null);
  const animRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const wrapRef = useRef(null);

  const build = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel || !images.length) return;

    const w = window.innerWidth;
    let s;
    if (w < 640) s = { item: 0.35, radius: 0.3, offsetZ: 0.5 };
    else if (w < 1025) s = { item: 0.65, radius: 0.6, offsetZ: 0.7 };
    else s = { item: 1, radius: 1, offsetZ: 1 };

    const itemWidth = Math.round(desktopWidth * s.item);
    const itemHeight = Math.round(desktopHeight * s.item);
    const radius = Math.round(desktopRadius * s.radius);
    const offsetZ = Math.round(desktopOffsetZ * s.offsetZ);

    carousel.innerHTML = '';

    carousel.style.transform = '';
    carousel.style.animation = '';

    if (animRef.current) {
      animRef.current.cancel();
      animRef.current = null;
    }

    const anim = carousel.animate(
      [
        { transform: `translateZ(${offsetZ}px) rotateY(0deg)` },
        { transform: `translateZ(${offsetZ}px) rotateY(360deg)` },
      ],
      { duration: 45000, iterations: Infinity, easing: 'linear' }
    );
    animRef.current = anim;

    const count = images.length;

    const handleClick = (src) => {
      anim.pause();
      setExpandedImg(src);
      setZoom(1);
    };

    images.forEach((src, i) => {
      const angle = (360 / count) * i;
      const item = document.createElement('div');
      item.className = 'carousel-item';
      item.style.width = `${itemWidth}px`;
      item.style.height = `${itemHeight}px`;
      item.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius + offsetZ}px)`;
      item.innerHTML = `<img src="${src}" alt="" referrerpolicy="no-referrer" loading="lazy" />`;
      item.addEventListener('click', () => handleClick(src));
      carousel.appendChild(item);
    });
  }, [images, desktopWidth, desktopHeight, desktopRadius, desktopOffsetZ]);

  useEffect(() => {
    const carousel = carouselRef.current;
    build();

    let timer;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(build, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(timer);
      if (carousel) {
        carousel.innerHTML = '';
        if (animRef.current) {
          animRef.current.cancel();
          animRef.current = null;
        }
      }
    };
  }, [build]);

  const handleClose = () => {
    if (animRef.current) animRef.current.play();
    setExpandedImg(null);
    setZoom(1);
  };

  const handleWheel = (e) => {
    if (!expandedImg) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => +Math.max(0.3, Math.min(5, prev + delta)).toFixed(2));
  };

  const dragRef = useRef({ active: false, startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });

  const handleMouseDown = (e) => {
    if (zoom <= 1) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      scrollLeft: wrap.scrollLeft,
      scrollTop: wrap.scrollTop,
    };
    wrap.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    const d = dragRef.current;
    if (!d.active) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.scrollLeft = d.scrollLeft - (e.clientX - d.startX);
    wrap.scrollTop = d.scrollTop - (e.clientY - d.startY);
  };

  const handleMouseUp = () => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;
    const wrap = wrapRef.current;
    if (wrap) wrap.style.cursor = zoom > 1 ? 'grab' : '';
  };

  return (
    <>
      <div className="scene">
        <div ref={carouselRef} className="carousel" />
      </div>

      {expandedImg && (
        <div
          className="modal-overlay"
          onClick={handleClose}
          onWheel={handleWheel}
        >
          <div
            className="modal-image-wrap"
            ref={wrapRef}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: zoom > 1 ? 'grab' : 'default' }}
          >
            <img
              src={expandedImg}
              alt=""
              style={zoom > 1 ? { maxWidth: 'none', maxHeight: 'none' } : {}}
            />
          </div>
          <button className="modal-close" onClick={handleClose}>
            &times;
          </button>
          <div className="modal-zoom-badge">{Math.round(zoom * 100)}%</div>
        </div>
      )}
    </>
  );
};

export default Carousel3D;
