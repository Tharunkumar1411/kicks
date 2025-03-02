import { REGX_FORMET_AMOUNT } from "./constants"

export const formatAmount = (amount) => {
    if(amount){
        return `₹ ${Number(amount)?.toFixed(2)?.toString()?.replace(REGX_FORMET_AMOUNT, '')}`
    }
}

export const filterProduct = (list, details) => {
    const { categories = [], color = [], size = [], price = Infinity, gender = '' } = details;
    const filtered = list.filter(item => {
        const matchesCategory = categories.includes(item.category);
        const matchesColor = color.some(val => item.availableColors.includes(val));
        const matchesSize = size.length ? size.includes(item.availableSize) : false;
        const matchesPrice = item.price <= price;
        const matchesGender = gender.includes(item.gender);

        return matchesCategory || matchesColor || matchesSize || matchesPrice || matchesGender;
    });

    return filtered;
};