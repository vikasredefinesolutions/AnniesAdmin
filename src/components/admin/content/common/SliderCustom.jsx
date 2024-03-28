import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const SliderCustom = ({ dots, min, max, step, defaultValue, onSliderChange, marks }) => {
  const [currentVal, setCurrentVal] = useState(defaultValue);
  const handleChangeValue = (event, value) => 
  {
//    setCurrentVal(value);
    onSliderChange(value);
  }
  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Slider
        aria-label="Custom marks"
        value={defaultValue}
        step={step}
        valueLabelDisplay="auto"
        marks={marks}
        min={min}
        max={max}
        onChange={handleChangeValue}
      />
    </Box>
      {/* <p className='mx-auto flex flex-wrap mb-4 text-[12px] text-center'>Current Value: <strong>{currentVal}</strong></p>
      <Slider dots={dots} min={min} max={max} defaultValue={defaultValue} step={step} maximumTrackStyle={{ backgroundColor: 'red', height: 10 }}
        minimumTrackStyle={{ backgroundColor: 'blue', height: 10 }} onChange={handleChangeValue} marks={marks} 
        />
     */}
    </>
  );
};
export default SliderCustom;


