import { useRef, useEffect, useState } from 'react';

const Carousel3D = ({
  images,
  itemWidth = 540,
  itemHeight = 360,
  radius = 1500,
  offsetZ = -500,
}) => {
  const carouselRef = useRef(null);
  const [expandedImg, setExpandedImg] = useState(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !images.length) return;

    carousel.innerHTML = '';

    const count = images.length;

    const handleClick = (src) => {
      carousel.classList.add('paused');
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
      carousel.classList.remove('paused');
    };
  }, [images]);

  const handleClose = () => {
    const carousel = carouselRef.current;
    if (carousel) carousel.classList.remove('paused');
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
