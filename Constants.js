const ip = "192.168.1.3";
export const APIsURL = `http://${ip}:5000`;
export const ImagesURL = `http://${ip}/img_react`;
export function formatPrice(number) {
    // return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    if (typeof number !== 'number') {
        throw new Error('Invalid number input');
    }

    // Round the number to 2 decimal places
    const roundedNumber = Number(number.toFixed(2));

    // Format the rounded number as currency
    return roundedNumber.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

}