import React, { useState } from "react";
import ColorSizePallate from "../ColorSizePallate";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Slider,
} from "@mui/material";
import styles from "./styles.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CustomButton from "../CustomButton";
import useProductStore from "../../store/productList";
import { filterProduct } from "../../utils/helper";

const FilterComponent = ({ filter, setFilter, data }) => {
  const [dropDown, setDropDown] = useState({
    category: true,
    gender: true,
    price: true,
  });
  const [val, setVal] = React.useState(0);
  const filterProperty = useProductStore((state) => state.filterProperty);
  const originalProductList = useProductStore(
    (state) => state.originalProductList,
  );
  const setProductList = useProductStore((state) => state.setProductList);

  const handleChange = (_, newValue) => {
    setVal(newValue);
    setFilter({ ...filter, price: newValue });
  };

  function valuetext(value) {
    return `₹ ${value}`;
  }

  const handleFilter = (type, value, checked) => {
    switch (type) {
      case "color":
        setFilter({ ...filter, color: value });
        break;
      case "gender":
        // Toggle gender in array
        if (checked) {
          setFilter({ ...filter, gender: [...filter.gender, value] });
        } else {
          setFilter({
            ...filter,
            gender: filter.gender.filter((item) => item !== value),
          });
        }
        break;
      case "size":
        setFilter({ ...filter, size: value });
        break;
      case "category":
        // Toggle category in array
        if (checked) {
          setFilter({ ...filter, categories: [...filter.categories, value] });
        } else {
          setFilter({
            ...filter,
            categories: filter.categories.filter((item) => item !== value),
          });
        }
        break;
      default:
        break;
    }
  };

  const handleApply = () => {
    const filteredList = filterProduct(originalProductList, filter);
    setProductList(filteredList);
  };

  const handleReset = () => {
    // Reset all filters
    setFilter({
      color: [],
      size: "",
      categories: [],
      gender: [],
      price: 0,
    });
    setVal(0);
    // Show all products
    setProductList(originalProductList);
  };

  return (
    <div className={styles.rootContainer}>
      <ColorSizePallate
        data={filterProperty}
        selectedItem={filter}
        setSelectedItem={setFilter}
        fromFilter={true}
      />

      <div className={styles.categoryContainer}>
        <div className={styles.dropMenu}>
          <Typography className={styles.header}>CATEGORY</Typography>
          {dropDown?.category ? (
            <KeyboardArrowDownIcon
              fontSize="medium"
              onClick={() => setDropDown({ ...dropDown, category: false })}
            />
          ) : (
            <KeyboardArrowUpIcon
              fontSize="medium"
              onClick={() => setDropDown({ ...dropDown, category: true })}
            />
          )}
        </div>

        {dropDown.category && (
          <div className={styles.category}>
            {filterProperty?.availableCategories?.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item}
                checked={filter.categories.includes(item)}
                onChange={(e) =>
                  handleFilter("category", item, e.target.checked)
                }
                control={<Checkbox />}
                label={item}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <div className={styles.dropMenu}>
          <Typography className={styles.header}>GENDER</Typography>
          {dropDown?.gender ? (
            <KeyboardArrowDownIcon
              fontSize="medium"
              onClick={() => setDropDown({ ...dropDown, gender: false })}
            />
          ) : (
            <KeyboardArrowUpIcon
              fontSize="medium"
              onClick={() => setDropDown({ ...dropDown, gender: true })}
            />
          )}
        </div>

        {dropDown.gender && (
          <div className={styles.category}>
            {filterProperty?.gender?.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item}
                checked={filter.gender.includes(item)}
                onChange={(e) => handleFilter("gender", item, e.target.checked)}
                control={<Checkbox />}
                label={item}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <div className={styles.dropMenu}>
          <Typography className={styles.header}>PRICE</Typography>
          {dropDown?.price ? (
            <KeyboardArrowDownIcon
              fontSize="medium"
              onClick={() => setDropDown({ ...dropDown, price: false })}
            />
          ) : (
            <KeyboardArrowUpIcon
              fontSize="medium"
              onClick={() => setDropDown({ ...dropDown, price: true })}
            />
          )}
        </div>

        {dropDown.price && (
          <Box>
            <Slider
              marks={filterProperty.price}
              step={10}
              value={val}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              onChange={handleChange}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="body2"
                onClick={() => setVal(0)}
                sx={{ cursor: "pointer" }}
              >
                {valuetext(0)}
              </Typography>
              <Typography
                variant="body2"
                onClick={() => setVal(10000)}
                sx={{ cursor: "pointer" }}
              >
                {valuetext(10000)}
              </Typography>
            </Box>
          </Box>
        )}
      </div>

      <div className={styles.filterBtn}>
        <CustomButton
          onClick={handleReset}
          children="RESET"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            width: "100%",
            marginTop: "15px",
          }}
        />
        <CustomButton
          onClick={handleApply}
          children="APPLY"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            width: "100%",
            marginTop: "15px",
          }}
        />
      </div>
    </div>
  );
};

export default FilterComponent;
