import './styles.css';
import './flags.css';
const myKey = 'fca_live_sPMo346MlhyygW3MsqXQ6ZcE1s7YZ2DrHpIZWURQ';
let exchangeData;
// import { createChart } from 'lightweight-charts'; 
const elements = {
    'fromCurrSelect': document.querySelector('#fromCurrSelect'),
    'toCurrSelect': document.querySelector('#toCurrSelect'),
    'exchangeSelects': document.querySelectorAll('.exchangeSelect'),
    'amountInput': document.querySelector('#amountInput'),
    'inputs': document.querySelectorAll('input[type="number"]'),
    'resultBlock': document.querySelector('#result'),
    'flagFrom': document.querySelector('#flagFrom'),
    'flagTo': document.querySelector('#flagTo'),
    'flagForList': document.querySelector('#flagForList'),
    'switchButton': document.querySelector('#switchButton'),
    'listSelect': document.querySelector('#listSelect'),
    'currencyListHolder': document.querySelector('#currencyListHolder'),
    'listPage': document.querySelector('#listPage'),
    'fromCurrForListName': document.querySelector('#fromCurrForListName'),
    'exchangePage': document.querySelector('#exchangePage'),
    'listPage': document.querySelector('#listPage'),
    'swithPagesButtons': document.querySelectorAll('.changePage'),
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
elements.swithPagesButtons.forEach((el) => {
    el.addEventListener('click', (e) => {
        switch (e.currentTarget.name) {
            case 'currencyList':
                el.classList.add('activeListChanger')
                document.querySelector('a[name="currencyList"]').classList.add('activeListChanger')
                document.querySelector('a[name="currencyExchange"]').classList.remove('activeListChanger')
                switchPages(elements.exchangePage, elements.listPage)
                break;
            case 'currencyExchange':
                document.querySelector('a[name="currencyList"]').classList.remove('activeListChanger')
                document.querySelector('a[name="currencyExchange"]').classList.add('activeListChanger')
                switchPages(elements.listPage, elements.exchangePage);
                break;
        }

    })
})
const exchange = (fromCurr, toCurr, amount) => {
    const result = amount * ((Number(exchangeData[toCurr]) / (Number(exchangeData[fromCurr]))));
    const prettyResult = formatOutput(result);
    return prettyResult;
}
elements.amountInput.addEventListener('input', (e) => {
    convertCurrency();
})
elements.inputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        const valueLength = e.target.value.length;
        if (valueLength > 10) {
            e.target.style.fontSize = '15px';
            elements.resultBlock.style.fontSize = '15px'
        } else if (valueLength > 7) {
            e.target.style.fontSize = '18px';
            elements.resultBlock.style.fontSize = '18px'
        }
        else {
            e.target.style.fontSize = '25px';
            elements.resultBlock.style.fontSize = '25px'
        }
        return;
    })
})
elements.exchangeSelects.forEach((el) => {
    el.addEventListener('change', (e) => {
        convertCurrency();
    })
})
elements.listSelect.addEventListener('change', (e) => {
    showCurrencyList();
})
const formatOutput = (value) => {
    return Number((value).toFixed(4)).toString().replace('.', ',');
}
const convertCurrency = () => {
    const inputAmount = Number(elements.amountInput.value);
    const fromCurr = elements.fromCurrSelect.value;
    const toCurr = elements.toCurrSelect.value;
    elements.flagFrom.classList = `currency-flag currency-flag-${fromCurr.toLowerCase()}`
    elements.flagTo.classList = `currency-flag currency-flag-${toCurr.toLowerCase()}`
    elements.resultBlock.value = exchange(fromCurr, toCurr, inputAmount)
}
const showCurrencyList = () => {
    const fromCurrForList = elements.listSelect.value;
    elements.fromCurrForListName.innerText = currencies[fromCurrForList];
    const currencyList = document.createElement('ul');
    currencyList.setAttribute('id', 'currencyList');
    elements.flagForList.classList = `currency-flag currency-flag-${fromCurrForList.toLowerCase()}`

    Object.entries(exchangeData)
        .filter(([currency, value]) => currency !== fromCurrForList)
        .forEach(([currency, value]) => {
            const currencyItem = document.createElement('div');
            currencyItem.classList.add('currencyItem');
            const currencyCode = document.createElement('span');
            currencyCode.classList.add('currencyCode');
            currencyCode.textContent = currency;
            const currencyName = document.createElement('span');
            currencyName.classList.add('currencyName');

            currencyName.textContent = currencies[currency];

            const currencyRate = document.createElement('span');
            currencyRate.classList.add('currencyRate');
            currencyRate.textContent = exchange(fromCurrForList, currency, 1);

            currencyItem.appendChild(currencyCode);
            currencyItem.appendChild(currencyName);
            currencyItem.appendChild(currencyRate);
            currencyList.appendChild(currencyItem);
        });

    elements.currencyListHolder.replaceChild(currencyList, elements.currencyListHolder.childNodes[0])
}
const fillSelects = () => {
    document.querySelectorAll('select')
    .forEach((select, index) => {
        Object.entries(currencies)
        .forEach(([cur, name]) => {
            const option = document.createElement('option');
            if (index !== 0) {
                if (cur == 'RUB') {
                    option.setAttribute('selected', 'true')
                }
            }
            option.setAttribute('value', cur);
            option.setAttribute('text', `${cur} - ${name}`);
            option.setAttribute('title', name);
            option.classList.add('selectOption')
            option.innerHTML = cur
            option.dataset.name = name;
            select.appendChild(option)
        })
    })
}
elements.switchButton.addEventListener('click', (e) => {
    const tempFromCurrValue = elements.fromCurrSelect.value;
    elements.fromCurrSelect.value = elements.toCurrSelect.value;
    elements.toCurrSelect.value = tempFromCurrValue;
    convertCurrency();
})
const getExchangeRates = async () => {
    const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${myKey}`, {});
    const jsonResponse = await response.json();
    exchangeData = await jsonResponse.data;
}
window.addEventListener('load', async () => {
    await getExchangeRates()
    elements.amountInput.setAttribute('value', 1);
    fillSelects();
    convertCurrency();
    showCurrencyList();
})
