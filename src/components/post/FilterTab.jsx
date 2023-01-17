import React, { createContext, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link, MenuItem, Select } from '@mui/material';
import { filterValues } from './Utils';
import '../post/instagram.css';
import BasicModal, { filterContext } from './Post';

const FilterTab = () => {
  const { filterClass, setFilterClass } = useContext(filterContext);

  const handleChange = (e) => {
    setFilterClass(e.target.value);
  };
  console.log('@SN ', filterClass);
  return (
    <>
      <div>
        <Box>
          {/* <Link>Back</Link> */}
          <FormControl fullWidth>
            <InputLabel>Filter</InputLabel>
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
    </>
  );
};

export default FilterTab;
