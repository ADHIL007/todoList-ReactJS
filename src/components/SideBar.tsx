import React, { useState } from "react";
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import RemoveDoneOutlinedIcon from '@mui/icons-material/RemoveDoneOutlined';

function SideBar({
  handleOptionChange,
  options,
  handleCollapseToggle,
  collapsed,
}: any) {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <span className="collapse-btn" onClick={handleCollapseToggle}>
          &#9776;
        </span>
        <span className={collapsed ? "sidebar-title hidden" : "sidebar-title"}>
          Todo List
        </span>
      </div>
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        {!collapsed && (
          <ul className="sidebar-options">
            <li
              className={
                options === "Today"
                  ? "sidebar-option active"
                  : "sidebar-option "
              }
              onClick={() => handleOptionChange("Today")}
            >
             <TodayOutlinedIcon /> <span>Today</span>

            </li>
            <li
              className={
                options === "Next" ? "sidebar-option active" : "sidebar-option"
              }
              onClick={() => handleOptionChange("Next")}
            >
              <DateRangeOutlinedIcon /> Next 7 Days

            </li>
            <li
              className={
                options === "others"
                  ? "sidebar-option active"
                  : "sidebar-option"
              }
              onClick={() => handleOptionChange("others")}
            >
              <CalendarMonthOutlinedIcon /> Other Tasks

            </li>
            <li
              className={
                options === "Completed"
                  ? "sidebar-option active"
                  : "sidebar-option"
              }
              onClick={() => handleOptionChange("Completed")}
            >
              <DoneAllOutlinedIcon /> Completed Tasks
            </li>
            <li
              className={
                options === "inCompleted"
                  ? "sidebar-option active"
                  : "sidebar-option"
              }
              onClick={() => handleOptionChange("inCompleted")}
            >
              <RemoveDoneOutlinedIcon /> Overdue Tasks
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default SideBar;
