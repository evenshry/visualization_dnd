import React, { useState } from 'react';
import { Select, Button } from 'antd';
import { ChromePicker, ColorResult } from 'react-color';
import { formatMessage } from 'umi-plugin-locale';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function ColorPicker(props: Props) {
  const { value, onChange } = props;

  const [colorPickVisible, setColorPickVisible] = useState<boolean>(false);

  /**
   * 拼接颜色值 RGBA
   */
  function handleColorChange(color: ColorResult) {
    const rgba = color.rgb;
    onChange(`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`);
  }

  /**
   * 打开选择框
   */
  function handleOpenDropdown(value: boolean) {
    if (value) {
      setColorPickVisible(value);
    }
  }

  /**
   * 关闭选择框
   */
  function handleCloseDropdown() {
    setColorPickVisible(false);
  }

  return (
    <Select
      suffixIcon={<div className="colorIcon" style={{ backgroundColor: value }} />}
      getPopupContainer={node => document.getElementById('sideBarContainer') || node}
      open={colorPickVisible}
      dropdownMatchSelectWidth={false}
      onDropdownVisibleChange={handleOpenDropdown}
      onBlur={handleCloseDropdown}
      dropdownRender={() => (
        <section className="colorPickContainer" onMouseDown={event => event.preventDefault()}>
          <ChromePicker color={value} onChangeComplete={handleColorChange} />
          <section className="colorPickBtn">
            <Button type="default" onClick={handleCloseDropdown}>
              {formatMessage({ id: 'button.close' })}
            </Button>
          </section>
        </section>
      )}
    />
  );
}

export default ColorPicker;
