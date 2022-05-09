export function formatMoney(amount) {
    const amountString = amount.toString();
    const length = amountString.length - 1;
    let newAmount = '';
    let counter = 0;

    for (let index = length; index >= 0; index--) {
        if((counter)%3 == 0 && counter > 0){
            newAmount += ',';
        }
        newAmount += amountString[index];
        counter++;
    }
    newAmount += '¢';
    return newAmount.split('').reverse().join('');
}
