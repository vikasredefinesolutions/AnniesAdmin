import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';



const TooltipSlider = () => {
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 75,
    },
    {
      value: 100,
    },
    {
      value: 150,
    },
    {
      value: 200,
    },
    ,
    {
      value: 300,
    },    
    {
      value: 500,
    },
    {
      value: 700,
      label: '700',
    }
  ];
  
  const valuetext = (value) => {
    return `${value}°C`;
  }
  return (
    <>
      <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={0}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        max={700}
      />
    </Box>
    
    </>
  );
};
export default TooltipSlider;


