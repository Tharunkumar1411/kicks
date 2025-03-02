import React, { useEffect, useCallback } from "react";
import styles from "./styles.module.scss";

const ColorSizePallate = ({ data, setSelectedItem, selectedItem, fromFilter }) => {
  useEffect(() => {
    if (!fromFilter && data) {
      setSelectedItem({
        ...selectedItem,
        color: data?.availableColors?.[0] || '',
        size: data?.availableSize?.[0] || ''
      });
    }
  }, [fromFilter, data, selectedItem, setSelectedItem]);

  const getLogic = useCallback((color, item) => {
    return (fromFilter && color.includes(item)) || color === item;
  }, [fromFilter]);

  // Handle color toggle
  const handleColorClick = (color) => {
    if (fromFilter) {
      // If `fromFilter` is true, toggle color from the array
      setSelectedItem({
        ...selectedItem,
        color: selectedItem.color.includes(color)
          ? selectedItem.color.filter(c => c !== color)
          : [...selectedItem.color, color] 
      });
    } else {
      setSelectedItem({
        ...selectedItem,
        color,
      });
    }
  };

  // Handle size toggle (only one size can be selected)
  const handleSizeClick = (size) => {
    setSelectedItem({
      ...selectedItem,
      size: selectedItem.size === size ? null : size, // Toggle size: null if selected, otherwise set it
    });
  };

  // Return early if data is not available
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.rootContainer}>
      {/* Color Section */}
      <div className={styles.colorContainer}>
        <p className={styles.pallateHeader}>COLOR</p>
        <div className={styles.pallateContainer}>
          {data?.availableColors?.map((item) => {
            const isSelected = getLogic(selectedItem.color, item);
            const colorStyle = isSelected
              ? { border: `2px solid ${item}`, padding: '5px', borderRadius: '25px', outline: 'none' }
              : { alignSelf: 'center', outline: 'none' };

            return (
              <div
                key={item}
                onClick={() => handleColorClick(item)}
                style={colorStyle}
              >
                <div className={styles.pallate} style={{ backgroundColor: item }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Size Section */}
      <div className={styles.sizeContainer}>
        <p className={styles.pallateHeader}>SIZE</p>
        <div className={styles.pallateContainer}>
          {data?.availableSize?.map((item) => {
            const isSelected = item === selectedItem.size;
            const sizeStyle = isSelected
              ? { backgroundColor: '#000', color: '#fff', borderRadius: '15px' }
              : { color: '#000', backgroundColor: '#fff', borderRadius: '16px', cursor: 'pointer' };

            return (
              <div key={item} onClick={() => handleSizeClick(item)} style={sizeStyle}>
                <div className={styles.sizePallate}>{item}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorSizePallate;
