import { useContext } from 'react';
import { filterValues } from './Utils';
import '../post/instagram.css';
import { filterContext } from './Post';


const FilterTab = () => {
  const { filterClass, setFilterClass } = useContext(filterContext);

  const handleChange = (e) => {
    setFilterClass(e.target.value);
    console.log('@SN ', e.target.value);
  };
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'scroll',
    height: '360px',
    gap: '2px',
  };
  return (
    <>
      <h3>Filters</h3>
      <div className="container" style={style} value={filterClass}>
        {filterValues.map((item, index) => {
          return (
            <div key={index}>
              <button
                style={{ width: '136px', fontSize: 'smaller' }}
                onClick={handleChange}
                value={item.class}
              >
                <img src={item.img} alt="" />
                {item.name}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FilterTab;
