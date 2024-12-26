import React, { useState } from 'react';
import NotFound from '../pages/NotFound';

const SearchBar = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const matchedItems = items.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(matchedItems);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for an item..."
        style={{
          padding: '10px',
          width: '300px',
          borderRadius: '5px',
          marginTop:'30px',
          border: '1px solid #ccc',
        }}
      />

      {filteredItems.length > 0 ? (
        <div className="Uniblox-bodyItems">
          {filteredItems.map((filteredItem, index) => (
            <div className="Uniblox-bodyItems-item" key={index}>
              <img
                src={filteredItem.image}
                className="Uniblox-bodyItems-item-img"
                alt={filteredItem.name}
                style={{ width: '200px', height: '200px' }}
              />
              <p className="Uniblox-bodyItems-item-name">{filteredItem.name}</p>
              <p className="Uniblox-bodyItems-item-price">${filteredItem.price}</p>
              <button className="Uniblox-bodyItems-item-addItem">Add to cart</button>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SearchBar;
