import './styles.css';
const myKey = 'fca_live_sPMo346MlhyygW3MsqXQ6ZcE1s7YZ2DrHpIZWURQ';
let exchangeData;
// import { createChart } from 'lightweight-charts'; 
const elements = {
    'fromCurrSelect': document.querySelector('#fromCurrSelect'),
    'toCurrSelect': document.querySelector('#toCurrSelect'),
    'listSelect': document.querySelector('#listSelect'),
    'resultBlock': document.querySelector('#result'),
    'amountInput': document.querySelector('#amountInput'),
    'currencyListHolder': document.querySelector('#currency-list-holder'),
    'switchButton': document.querySelector('#switchButton'),
    'swithPagesButtons' : document.querySelectorAll('.changePage'),
    'exchangeSelects': document.querySelectorAll('.exchangeSelect'),
    'listPage': document.querySelector('#listPage'),
    'exchangePage': document.querySelector('#exchangePage')
}
const currencies = {
    USD: 'Доллар США',
    EUR: 'Евро',
    RUB: 'Российский рубль',
    JPY: 'Японская иена',
    BGN: 'Болгарский лев',
    CZK: 'Чешская крона',
    DKK: 'Датская крона',
    GBP: 'Фунт стерлингов',
    HUF: 'Венгерский форинт',
    PLN: 'Польский злотый',
    RON: 'Румынский лей',
    SEK: 'Шведская крона',
    CHF: 'Швейцарский франк',
    ISK: 'Исландская крона',
    NOK: 'Норвежская крона',
    HRK: 'Хорватская куна',
    TRY: 'Турецкая лира',
    AUD: 'Австралийский доллар',
    BRL: 'Бразильский реал',
    CAD: 'Канадский доллар',
    CNY: 'Китайский юань',
    HKD: 'Гонконгский доллар',
    IDR: 'Индонезийская рупия',
    ILS: 'Новый израильский шекель',
    INR: 'Индийская рупия',
    KRW: 'Южнокорейская вона',
    MXN: 'Мексиканский песо',
    MYR: 'Малайзийский ринггит',
    NZD: 'Новозеландский доллар',
    PHP: 'Филиппинский песо',
    SGD: 'Сингапурский доллар',
    THB: 'Тайский бат',
    ZAR: 'Южноафриканский рэнд',
  };


const switchPages = (hideEl, showeEl) => {
    hideEl.classList.add('hide')
    showeEl.classList.remove('hide')

}
elements.swithPagesButtons.forEach((el)=>{
    el.addEventListener('click', (e)=>{
        switch(e.currentTarget.name){
            case 'currencyList':
                switchPages(elements.exchangePage, elements.listPage)
                break;
            case 'currencyExchange':
                switchPages(elements.listPage, elements.exchangePage);
                break;
        }
    
    })
})

elements.amountInput.addEventListener('input', (e)=>{
    convertCurrency();
})

elements.exchangeSelects.forEach((el)=>{
    el.addEventListener('change', (e)=>{
        console.log('ddd')
        convertCurrency();
    })
})
elements.listSelect.addEventListener('change', (e)=>{
    showCurrencyList();
})
const formatOutput = (value) =>{
    return Number((value).toFixed(4)).toString().replace('.', ',');
}
const convertCurrency = () => {
    console.log()
    const inputAmount = Number(elements.amountInput.value);
    const fromCurrValue = elements.fromCurrSelect.value;
    const toCurrValue = elements.toCurrSelect.value;
    const resultAmount = inputAmount * ((Number(exchangeData[toCurrValue]) / ( Number(exchangeData[fromCurrValue]))))
    console.log(resultAmount)

    elements.resultBlock.value = formatOutput(resultAmount)
}
const showCurrencyList = () => {
    const fromCurrForListValue = elements.listSelect.value;
    const currencyList = document.createElement('ul');
    currencyList.setAttribute('id', 'currency-list')

    Object.entries(exchangeData).forEach(([currency, value]) => {
        const currencyItem = document.createElement('div');
        currencyItem.classList.add('currency-item');
        
        const currencyCode = document.createElement('span');
        currencyCode.classList.add('currency-code');
        currencyCode.textContent = currency;
        
        const currencyName = document.createElement('span');
        currencyName.classList.add('currency-name');

        currencyName.textContent = currencies[currency];
        
        const currencyRate = document.createElement('span');
        currencyRate.classList.add('currency-rate');
        const exchangedCurrency = +exchangeData[fromCurrForListValue] / value
        currencyRate.textContent = formatOutput(exchangedCurrency);
        
        currencyItem.appendChild(currencyCode);
        currencyItem.appendChild(currencyName);
        currencyItem.appendChild(currencyRate);
        currencyList.appendChild(currencyItem);
    });
    elements.currencyListHolder.replaceChildren(currencyList, elements.currencyListHolder.childNodes[0])
}
const fillSelects = () => {
    document.querySelectorAll('select').forEach((select, index)=>{
        Object.entries(currencies).forEach(([cur, name])=>{
            const option = document.createElement('option');
            if(index !== 0){
                if (cur == 'RUB'){
                    option.setAttribute('selected', 'true')
                }
            }
            option.setAttribute('value', cur);
            option.setAttribute('title', name);
            option.textContent = cur;
            select.appendChild(option)
        })
    })
}
elements.switchButton.addEventListener('click', (e)=>{
    const tempFromCurrValue = elements.fromCurrSelect.value;
    elements.fromCurrSelect.value = elements.toCurrSelect.value;
    elements.toCurrSelect.value = tempFromCurrValue;
    convertCurrency();
})
const getExchangeRates = async () => {
    const response =  await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${myKey}`, {});
    const jsonResponse = await response.json();
    exchangeData = await jsonResponse.data;
}
window.addEventListener('load', async()=>{
    await getExchangeRates()
    elements.amountInput.setAttribute('value', 1);
    fillSelects();

    convertCurrency();
    showCurrencyList();
})
