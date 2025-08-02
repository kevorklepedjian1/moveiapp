import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setMenuOpen } from '../../store/slices/uiSlice';
import type { MenuItem } from '../../types';
import './Sidebar.css';

const menuItems: MenuItem[] = [
  { id: 'search', label: 'Search', icon: '../../../public/assets/icons//ICON - Search.png' },
  { id: 'home', label: 'Home', icon: '../../../public/assets/icons/Group 46.png', isActive: true },
  { id: 'tv-shows', label: 'TV Shows', icon: '../../../public/assets/icons/Group 47.png' },
  { id: 'movies', label: 'Movies', icon: '../../../public/assets/icons/Group 53.png' },
  { id: 'genres', label: 'Genres', icon: '../../../public/assets/icons/Group 54.png' },
  { id: 'watch-later', label: 'Watch Later', icon: '../../../public/assets/icons/Group 56.png' },
];

const bottomMenuItems = [
  { id: 'language', label: 'LANGUAGE' },
  { id: 'help', label: 'GET HELP' },
  { id: 'exit', label: 'EXIT' },
];

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector((state) => state.ui.isMenuOpen);

  const handleMouseEnter = () => {
    dispatch(setMenuOpen(true));
  };
 
  const handleMouseLeave = () => {
    dispatch(setMenuOpen(false));
  };

  return (
    <div
      className={`sidebar ${isMenuOpen ? 'sidebar--open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sidebar__content">
        {/* Profile Section */}
        <div className="sidebar__profile">
          {isMenuOpen && (
            <>
              <div className="sidebar__profile-avatar">
                <img 
                  src="../../../public/assets/icons/Group 46.png" 
                  alt="Profile" 
                  className="sidebar__profile-image"
                />
              </div>
              <div className="sidebar__profile-info">
                <span className="sidebar__profile-name">Daniel</span>
              </div>
            </>
          )}
        </div>

     
        <nav className="sidebar__nav">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`sidebar__nav-item ${item.isActive ? 'sidebar__nav-item--active' : ''}`}
            >
              
              {isMenuOpen ? (
                <>
                <div className="sidebar__nav-icon">
                <img src={item.icon} alt={item.label} />
              </div>
                <span className="sidebar__nav-label">{item.label}</span>
                </>
              ) : (
                <div className="sidebar__nav-icon-closed">
                <img src={item.icon} alt={item.label} />
              </div>
              )}
            </div>
          ))}
        </nav>

        {isMenuOpen && (
          <div className="sidebar__bottom">
            {bottomMenuItems.map((item) => (
              <div key={item.id} className="sidebar__bottom-item">
                <span className="sidebar__bottom-label">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;