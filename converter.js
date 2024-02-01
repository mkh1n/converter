const myKey = 'fca_live_sPMo346MlhyygW3MsqXQ6ZcE1s7YZ2DrHpIZWURQ';
let exchangeData;
const fromCur = document.querySelector('#fromCurr');
const toCurr = document.querySelector('#toCurr');

const resultBlock = document.querySelector('#result') 

document.querySelector('#amountInput').addEventListener('input', (e)=>{
    convertCurrency()
})
document.querySelectorAll('select').forEach((select)=>{
    select.addEventListener('change', (e)=>{
        convertCurrency()
    })
})
const convertCurrency = () => {
    const inputAmount = +document.querySelector('#amountInput').value;
    const resultAmount = inputAmount * ((+exchangeData[toCurr.value]) / ( +exchangeData[fromCur.value])).toFixed(2)
    resultBlock.value = (Math.round(resultAmount * 100)/100).toFixed(1);

}
document.querySelector('#switchButton').addEventListener('click', (e)=>{
    const tempFromCurrValue = fromCur.value
    fromCur.value = toCurr.value
    toCurr.value = tempFromCurrValue
    convertCurrency()
})

window.addEventListener('load', async()=>{
    const response =  await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${myKey}`, {});
    const jsonResponse = await response.json();
    exchangeData = await jsonResponse.data;
    console.log(exchangeData)
    document.querySelector('#amountInput').setAttribute('value', 1);
    convertCurrency()
})
