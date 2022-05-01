export function formatMoney(amount) {

    var rta = `¢${amount.toString().slice(0, 2)},${amount.toString().slice(2, 5)}`;
    return rta;
}
