import { REGX_FORMET_AMOUNT } from "./constants";

export const formatAmount = (amount) => {
  if (amount) {
    return `₹ ${Number(amount)?.toFixed(2)?.toString()?.replace(REGX_FORMET_AMOUNT, "")}`;
  }
};

export const filterProduct = (list, details) => {
  const {
    categories = [],
    color = [],
    size = "",
    price = 0,
    gender = [],
  } = details;

  const hasNoFilters =
    categories.length === 0 &&
    color.length === 0 &&
    !size &&
    price === 0 &&
    gender.length === 0;

  if (hasNoFilters) {
    return list;
  }

  const filtered = list.filter((item) => {
    const matchesCategory =
      categories.length === 0 || categories.includes(item.category);

    const matchesColor =
      color.length === 0 ||
      color.some((selectedColor) =>
        item.availableColors?.includes(selectedColor),
      );

    const matchesSize =
      size?.length === 0 || item?.availableSize?.includes(size);

    const matchesPrice = price === 0 || Number(item.price) <= Number(price);

    const matchesGender = gender.length === 0 || gender.includes(item.gender);

    return (
      matchesCategory &&
      matchesColor &&
      matchesSize &&
      matchesPrice &&
      matchesGender
    );
  });

  return filtered;
};
