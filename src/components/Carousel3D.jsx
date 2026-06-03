import { useRef, useEffect, useState } from 'react';

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

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !images.length) return;

    const isMobile = window.innerWidth < 640;

    const itemWidth = isMobile ? Math.round(desktopWidth * 0.45) : desktopWidth;
    const itemHeight = isMobile ? Math.round(desktopHeight * 0.45) : desktopHeight;
    const radius = isMobile ? Math.round(desktopRadius * 0.35) : desktopRadius;
    const offsetZ = isMobile ? Math.round(desktopOffsetZ * 0.6) : desktopOffsetZ;

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
    };

    images.forEach((src, i) => {
      const angle = (360 / count) * i;
      const item = document.createElement('div');
      item.className = 'carousel-item';
      item.style.width = `${itemWidth}px`;
      item.style.height = `${itemHeight}px`;
      item.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius + offsetZ}px)`;
      item.innerHTML = `<img src="${src}" alt="" />`;
      item.addEventListener('click', () => handleClick(src));
      carousel.appendChild(item);
    });

    return () => {
      carousel.innerHTML = '';
      anim.cancel();
    };
  }, [images, desktopWidth, desktopHeight, desktopRadius, desktopOffsetZ]);

  const handleClose = () => {
    if (animRef.current) animRef.current.play();
    setExpandedImg(null);
  };

  return (
    <>
      <div className="scene">
        <div ref={carouselRef} className="carousel" />
      </div>

      {expandedImg && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleClose}>
              &times;
            </button>
            <img src={expandedImg} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel3D;
