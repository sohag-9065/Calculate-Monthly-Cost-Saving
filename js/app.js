
// get element by id 
function element(elementId){
    return document.getElementById(elementId);
}

// get input field value from funtion
function getInputValue(inputFieldId){
    // get input value 
    const inputValue = element(inputFieldId).value;
    // check isNaN 
    if(isNaN(inputValue)){
        document.getElementById('error-message').innerText =" Please Check " + inputFieldId + ". It's NaN."; 
        return -1;
    }
    else if(inputValue < 1){   // check It's positive or negative
        document.getElementById('error-message').innerText = " Please Check " + inputFieldId + ". It's negative value.";
        return -1;
    }

    return parseFloat(inputValue);
}

// get sum values 
function addNumbers(number){
    let result = 0;
    for(const num of arguments){
        result += num;
    }
    return result;
}

// set input value 
function setInputValue(inputFieldId, value){
    element(inputFieldId).value = value;
}
// set innerText 
function setInnerText(setFieldId,setValue){
    document.getElementById(setFieldId).innerText = setValue;
}
// get innerText 
function getInnerText(getFieldId){
    return document.getElementById(getFieldId).innerText;
}
// calculate saving 
function savingCalculate(blance , saving){
    return (blance * saving) / 100 ;
}

// event generate by calculate-btn
document.getElementById('calculate-btn').addEventListener('click' , function(){
    // get input value  from income , food , rent , clothes
    const incomeBlance = getInputValue('inputIncome');
    const foodCost = getInputValue('inputFood');
    const rentCost = getInputValue('inputRent');
    const clothesCost = getInputValue('inputClothes');
    // document.getElementById('error-message').innerText = "Please Check ";
    // add total cost 
    const totalCost = addNumbers(foodCost , rentCost , clothesCost);
    // calculate blance 
    const blance = incomeBlance - totalCost;
    // error message div element 
    const failError = element('blance-influence-message');
    // get save button element 
    const saveButton = document.getElementById('save-button');

    // check total cost , negative value & NaN 
    if((totalCost > incomeBlance) || (incomeBlance == -1 || foodCost == -1 || rentCost == -1 || clothesCost == -1  )){
        // error show 
        failError.style.display = 'block';
        // set total-expense & blance inner text 0
        setInnerText('total-expense', 0);
        setInnerText('blance', 0);
        // save button disabled 
        saveButton.disabled = true;
    }
    else{
        // set innertext for total-expense & blance 
        setInnerText('total-expense',totalCost);
        setInnerText('blance', blance);
        // error hide 
        failError.style.display = 'none';
        document.getElementById('error-message').innerText = "Influence blance. please check your expenses.";
        // save button enablle 
        saveButton.disabled = false;
    }
})


// event generate by save-button
document.getElementById('save-button').addEventListener('click' , function(){
    const incomeBlance = getInputValue('inputIncome');
    const saveInput = getInputValue('save');
    const totalEnpense = parseFloat(getInnerText('total-expense'));
    const blance = parseFloat(getInnerText('blance'));
    // calculate saving 
    const saving = savingCalculate(incomeBlance , saveInput);
    // calculate remainingBalance 
    const remainingBalance = incomeBlance - totalEnpense - saving;

    // error message div element 
    const failError = element('blance-influence-message');

    if(saving > blance){
        document.getElementById('error-message').innerText = "Your Remaing blace less than saving amount.";
        // error show 
        failError.style.display = 'block';

        setInnerText('saving-amount', ' ');
        setInnerText('remaining-balance', ' ');
    }
    else{
        setInnerText('saving-amount', saving);
        setInnerText('remaining-balance', remainingBalance);

    }    
})
