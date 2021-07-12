import React from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    // Pass on our props
    <Menu {...props}>
      <a className="menu-item" href="/">
        หน้าหลัก
      </a>

      <a className="menu-item" href="/Give">
        ส่งถังออกซิเจนให้ผู้ป่วย
      </a>

      <a className="menu-item" href="/Return">
        รับถังออกซิเจนคืน
      </a>

      <a className="menu-item" href="/Dashboard">
        กราฟ
      </a>
    </Menu>
  );
};
