import React from 'react';
import { MenuItem } from "@blueprintjs/core";

const SubMenu = ({ value, options, onChange, icon, text }) => {
  return (
    <MenuItem icon={icon} text={text} value={value}>
        {options.map((item, key) => {
            const optionProps = { key };
            if (value === item) {
            optionProps.value = item;
            }
            return (
                <MenuItem key={key} icon="code-block" text={item} onClick={onChange}/>
            );
        })}
    </MenuItem>
  );
};

export default SubMenu;
