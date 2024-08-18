export const formatPrice = (price: string) => {
    const priceNumber = parseFloat(price);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceNumber);
};