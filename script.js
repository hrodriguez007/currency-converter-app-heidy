const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

//event listeners for the select currency dropdown
[fromCur, toCur].forEach((select, i) => {
    for(let curCode in country_list){
        const selected = (i === 0 && curCode === "USD") || (i === 1 && curCode === "GBP") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
    }
    select.addEventListener("change", () => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagsapi.com/${country_list[code]}/shiny/64.png`;
    });
});

//get exchange rate from generated api
async function getExchangeRate() {
    const amountVal = amount.value || 1;
    exRateTxt.innerText = "Getting the exchange rate";
    try{
        const response = await fetch(`https://v6.exchangerate-api.com/v6/e503a9dd939cf4942be9896d/latest/${fromCur.value}`);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[toCur.value];
        const totalExRate = (amountVal * exchangeRate).toFixed(2);
        exRateTxt.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`;
    } catch (error){
        exRateTxt.innerText = "Error occurred. Please try again.";
    }
}

//event listeners for the switch icon and the get current exchange rate button
window.addEventListener("load", getExchangeRate);
getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

exIcon.addEventListener("click", () => {
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
    [fromCur, toCur].forEach((select) => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagsapi.com/${country_list[code]}/shiny/64.png`;
    })
    getExchangeRate();
});