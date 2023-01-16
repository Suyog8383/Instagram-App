import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import FilterTab, { filterContext } from './FilterTab';

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const BasicModal = () => {
  const { filterClass } = useContext(filterContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [imageFile, setImageFile] = useState(null);
  const handleInputChange = (e) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
    console.log('@SN 1', e.target.value);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Create</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {imageFile ? (
            <>
              <FilterTab />
              <img
                src={imageFile}
                className={filterClass}
                style={{ height: '300px', width: '300px' }}
                alt=""
              />
            </>
          ) : (
            <>
              <h2>Create new post</h2>
              <Button variant="contained" component="label">
                Select from computer
                <input hidden accept="image/*" onChange={handleInputChange} multiple type="file" />
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
