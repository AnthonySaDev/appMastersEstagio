import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Favorite() {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  }

  return (
    <div className="con-like">
      <input 
        title="like" 
        type="checkbox" 
        className="like outline-none border-none" 
        checked={isChecked}
        onChange={handleCheckboxChange}
        style={{display: 'none'}}
      />
      <div className="checkmark cursor-pointer" onClick={handleCheckboxChange}>
        {isChecked ? 
          <FaHeart size={34} color="red"/> :
          <FaRegHeart size={34} color="red"/>
        }
      </div>
    </div>
  )
}

export default Favorite;
