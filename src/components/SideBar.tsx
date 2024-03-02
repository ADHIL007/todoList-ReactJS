import React, { useState } from 'react';

function SideBar({ handleOptionChange, options, handleCollapseToggle, collapsed }: any) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <span className="collapse-btn" onClick={handleCollapseToggle}>
          &#9776;
        </span>
        <span className={collapsed ? 'sidebar-title hidden' : 'sidebar-title'}>Todo List</span>
      </div>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        {!collapsed && (
          <ul className="sidebar-options">
            <li className={options === 'Today' ? "sidebar-option active" : "sidebar-option "} onClick={() => handleOptionChange('Today')}>Today</li>
            <li className={options === 'Next' ? "sidebar-option active" : "sidebar-option"} onClick={() => handleOptionChange('Next')}>Next 7 Days</li>
            <li className={options === 'Completed' ? "sidebar-option active" : "sidebar-option"} onClick={() => handleOptionChange('Completed')}>Completed Tasks</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default SideBar;

