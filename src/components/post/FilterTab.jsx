import React, { createContext, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { MenuItem, Select } from '@mui/material';
import { filterValues } from './Utils';

export const filterContext = createContext();
const FilterContextProvider = filterContext.Provider;

const FilterTab = () => {
  const [filterClass, setFilterClass] = useState('');

  const handleChange = (e) => {
    setFilterClass(e.target.value);
  };
  return (
    <FilterContextProvider value={filterClass}>
      <div>
        <Box>
          <FormControl fullWidth>
            <InputLabel>Age</InputLabel>
            <Select value={filterClass} label="Age" onChange={handleChange}>
              {filterValues.map((item, index) => (
                <MenuItem value={item.class} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </FilterContextProvider>
  );
};

export default FilterTab;
