import React, { useState, ChangeEvent } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({  color, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleColorChange = (color: ColorResult) => {
    if (color.rgb && color.rgb.a !== undefined) {
      const updatedColor = `${color.hex}${Math.round(color.rgb.a * 255).toString(16)}`;
      onChange(updatedColor);
    }
  };
  
  return (
    <div>
      <div className="flex items-center space-x-2">
        <div>
          <div className="rounded inline-block cursor-pointer" onClick={handleClick}>
            <div className="w-12 h-8 rounded" style={{ background: color }} />
          </div>
          {displayColorPicker && (
            <div className="absolute z-20">
              <div className="fixed inset-0" onClick={handleClose} />
              <SketchPicker color={color} onChange={handleColorChange} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
