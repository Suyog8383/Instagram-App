import { createContext, useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { v4 } from 'uuid';
import Modal from '@mui/material/Modal';
import FilterTab from './FilterTab';

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

const style2 = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const ViewOne = () => {
  const [textTitle, setTextTitle] = useState('');

  console.log('@SN ', textTitle);
  return (
    <div>
      <h3>Caption</h3>
      <textarea
        value={textTitle}
        onChange={(e) => setTextTitle(e.target.value)}
        style={{ width: '407px', height: '306px' }}
        cols="30"
        rows="20"
      ></textarea>
    </div>
  );
};

export const filterContext = createContext();
const FilterContextProvider = filterContext.Provider;

const BasicModal = () => {
  const [filterClass, setFilterClass] = useState('');
  const [uploadImages, setUploadImages] = useState([]);
  const [postData, setPostData] = useState([]);
  const [textTitle, setTextTitle] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [imageFile, setImageFile] = useState(null);
  const [selectFile, setSelectFile] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:4000/post/list', {
        params: {
          userId: 1234,
          page: 1,
          limit: 8,
        },
      })
      .then((response) => {
        // handle success
        console.log(response.data.data.results[0].response);
        setPostData(response.data.data.results[0].response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);
  console.log('@SN ', postData);
  const handleInputChange = (e) => {
    setImageFile(URL.createObjectURL(e.target.files[0]));
    setSelectFile(e.target.files[0]);
  };

  const fileUploadHandler = () => {};

  const filterStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const [activeView, setActiveView] = useState(0);

  const renderView = () => {
    if (activeView === 0) {
      return <FilterTab />;
    }

    return (
      <div>
        <h3>Caption</h3>
        <textarea
          value={textTitle}
          onChange={(e) => setTextTitle(e.target.value)}
          style={{ width: '407px', height: '306px' }}
          cols="30"
          rows="20"
        ></textarea>
      </div>
    );
  };

  const onViewChange = (newView) => {
    setActiveView(newView);
  };

  const onViewPost = () => {
    setUploadImages((item) => [
      {
        id: v4(),
        image: imageFile,
        caption: textTitle,
        class: filterClass,
      },
      ...item,
    ]);

    const formData = new FormData();
    formData.append('file', selectFile);

    axios
      .post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        axios.post('http://localhost:4000/post', {
          userId: '1234',
          description: textTitle,
          attachments: res.data,
        });
      });

    setFilterClass('');
    setImageFile(null);
    setTextTitle('');
    handleClose();
  };

  return (
    <FilterContextProvider value={{ filterClass, setFilterClass, imageFile }}>
      <div>
        <Button onClick={handleOpen}>Create</Button>
        <div>
          {!open &&
            postData.map((item, index) => (
              <section key={index}>
                <div className="header">
                  <div className="user">Suyog Nagawade</div>
                  <div className="param">
                    <svg
                      aria-label="Plus d’options"
                      className="_8-yf5 "
                      fill="#262626"
                      height="16"
                      role="img"
                      viewBox="0 0 48 48"
                      width="16"
                    >
                      <circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle>
                      <circle
                        clipRule="evenodd"
                        cx="24"
                        cy="24"
                        fillRule="evenodd"
                        r="4.5"
                      ></circle>
                      <circle
                        clipRule="evenodd"
                        cx="40"
                        cy="24"
                        fillRule="evenodd"
                        r="4.5"
                      ></circle>
                    </svg>
                  </div>
                </div>
                <div className="img-container">
                  <img
                    src={item.attachments[0].name}
                    className={item.class}
                    style={{ height: '410px', width: '260px' }}
                    alt="Publication Photo"
                  />
                </div>
                <div className="toolbar">
                  <a className="like">
                    <svg height="24" role="img" viewBox="0 0 48 48" width="24">
                      <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                    </svg>
                  </a>
                  <a className="comment">
                    <svg fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24">
                      <path
                        clipRule="evenodd"
                        d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <a className="transfer">
                    <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                      <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                    </svg>
                  </a>
                  <a className="signet">
                    <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                      <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
                    </svg>
                  </a>
                </div>
                <div className="description">
                  <strong>Suyog</strong>
                  {item.description}
                </div>
              </section>
            ))}
        </div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <button
              style={{ position: 'absolute', right: '0px', margin: '7px' }}
              onClick={handleClose}
            >
              Close
            </button>
            {imageFile ? (
              <Box sx={style2}>
                <div>
                  <button disabled={activeView === 0} onClick={() => onViewChange(activeView - 1)}>
                    Back
                  </button>
                  <button disabled={activeView === 1} onClick={() => onViewChange(activeView + 1)}>
                    Next
                  </button>
                  <button disabled={activeView === 0} onClick={() => onViewPost()}>
                    Share
                  </button>
                </div>
                <div style={{ display: 'flex' }}>
                  <div>
                    <img
                      src={imageFile}
                      className={filterClass}
                      style={{ height: '410px', width: '260px', fontSize: '8px' }}
                      alt=""
                    />
                  </div>
                  <div style={filterStyle}>{renderView()}</div>
                </div>
              </Box>
            ) : (
              <Box sx={style}>
                <h2>Create new post</h2>
                <Button onClick={fileUploadHandler} variant="contained" component="label">
                  Select from computer
                  <input
                    hidden
                    accept="image/*"
                    onChange={handleInputChange}
                    multiple
                    type="file"
                  />
                </Button>
              </Box>
            )}
          </Box>
        </Modal>
      </div>
    </FilterContextProvider>
  );
};

export default BasicModal;
