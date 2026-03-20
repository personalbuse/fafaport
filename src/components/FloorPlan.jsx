import React from 'react';
import './FloorPlan.css';

const FloorPlan = () => {
  return (
    <div className="floor-plan-container">
      <div className="floor-plan">
        {/* Floor 1 */}
        <div className="floor-1 _grid">
          <div className="kitchen">
            <p>KITCHEN</p>
            <div className="door"></div>
            <div className="window"></div>
            <div className="counter"></div>
            <div className="ref"></div>
            <div className="sink">
              <div className="inner">
                <div className="faucet"></div>
              </div>
            </div>
            <div className="stove">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div className="bar"></div>
            <div className="bar-stool-1"></div>
            <div className="bar-stool-2"></div>
          </div>
          
          <div className="outside-1"></div>
          
          <div className="dining">
            <p>DINING</p>
            <div className="table">
              <div className="chair-1"></div>
              <div className="chair-2"></div>
              <div className="chair-3"></div>
              <div className="chair-4"></div>
            </div>
          </div>
          
          <div className="living">
            <p>LIVING AREA</p>
            <div className="door"></div>
            <div className="couch-left">
              <div className="couch-inner"></div>
              <div className="couch-inner"></div>
            </div>
            <div className="couch-right">
              <div className="couch-inner"></div>
            </div>
            <div className="table"></div>
          </div>
          
          <div className="restroom-1">
            <p>T&B</p>
            <div className="door"></div>
            <div className="window"></div>
            <div className="shower"></div>
            <div className="toilet-top"></div>
            <div className="toilet-seat"></div>
            <div className="sink">
              <div className="inner"></div>
              <div className="faucet"></div>
              <div className="container"></div>
            </div>
          </div>
          
          <div className="closet">
            <p>WIC</p>
            <div className="door"></div>
            <div className="storage"></div>
          </div>
          
          <div className="bedroom">
            <p>MASTER BEDROOM</p>
            <div className="window"></div>
            <div className="window"></div>
            <div className="window"></div>
            <div className="window"></div>
            <div className="window"></div>
            <div className="door"></div>
            <div className="bed">
              <div className="inner">
                <div className="pillow"></div>
                <div className="pillow"></div>
              </div>
            </div>
            <div className="table-1"></div>
            <div className="table-2"></div>
            <div className="table-3"></div>
            <div className="chair"></div>
          </div>
          
          <div className="stairs">
            <p>STAIRS</p>
            <div className="wall"></div>
            <div className="lines-1 _lines"></div>
            <div className="lines-2 _lines"></div>
          </div>
          
          <div className="restroom-2">
            <p>T&B</p>
            <div className="door"></div>
            <div className="shower"></div>
            <div className="toilet-top"></div>
            <div className="toilet-seat"></div>
            <div className="sink">
              <div className="inner"></div>
              <div className="faucet"></div>
              <div className="container"></div>
            </div>
          </div>
          
          <div className="car-port">
            <p>CAR PORT</p>
          </div>
          
          <div className="outside-2"></div>
        </div>

        {/* Floor 2 */}
        <div className="floor-2 _grid">
          <div className="bedroom">
            <p>BEDROOM</p>
            <div className="door"></div>
            <div className="window"></div>
            <div className="bed">
              <div className="inner">
                  <div className="pillow"></div>
                  <div className="pillow"></div>
              </div>
            </div>
            <div className="closet"></div>
            <div className="table"></div>
            <div className="chair"></div>
          </div>
          
          <div className="outside-1"></div>
          
          <div className="storage">
            <p>STORAGE</p>
            <div className="door"></div>
            <div className="window"></div>
            <div className="shelf-1"></div>
            <div className="shelf-2"></div>
          </div>
          
          <div className="library">
            <p>LIBRARY</p>
            <div className="window"></div>
            <div className="shelf-1"></div>
            <div className="shelf-2"></div>
            <div className="chair"></div>
            <div className="table"></div>
          </div>
          
          <div className="path"></div>
          
          <div className="open">
            <p>OPEN TO BELOW</p>
            <div className="door"></div>
            <div className="lines-1 _lines"></div>
            <div className="lines-2 _lines"></div>
            <div className="lines-3"></div>
            <div className="lines-4"></div>
          </div>
          
          <div className="balcony">
            <p>BALCONY</p>
            <div className="door"></div>
          </div>
          
          <div className="outside-2"></div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
