import { Box } from '@mui/material';
import FilterTab from './FilterTab';
// <FirstPage props={{ style2, imageFile, filterClass, filterStyle }} />
function FirstPage({ style2, imageFile, filterClass, filterStyle }) {
  return (
    <div>
      <Box sx={style2}>
        <div>
          <img
            src={imageFile}
            className={filterClass}
            style={{ height: '410px', width: '260px', fontSize: '8px' }}
            alt=""
          />
        </div>
        <div style={filterStyle}>
          <h3>Filters</h3>
          <FilterTab />
        </div>
      </Box>
    </div>
  );
}

export default FirstPage;
