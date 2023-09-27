// Tax-desh
// ------------------------------------------------------------------------
// 3000 USD -> free
// 6000 USD -> 5%
// 10,000 USD -> 15%
// 20,000 USD -> 25%
// above that -> 30%
// minimum tax -> 50 USD
// if someone earns <= 3000 USD no minimum tax
const btn = document.querySelector("#calcBtn");
const resetBtn = document.querySelector("#resetBtn");
const input = document.querySelector("#form-input");
const output = document.querySelector(".output");

btn.addEventListener("click",()=>{
    const inputValue = Number(input.value);
    if(inputValue <= 0 || isNaN(inputValue)){
        return output.innerHTML = `<div class="alert alert-danger" role="alert">
        Please Enter a Number greater than Zero
      </div>`;
    }
    
    const tax = taxCalculator(inputValue);
    output.innerHTML = `<p class="border text-center py-3 fs-2 shadow-md shadow">Your tax is $${tax}</p>`
})

resetBtn.addEventListener("click",()=>{
    return output.innerHTML = "&nbsp;";
})

function taxCalc(income, taxParentage) {
  tax = (income * taxParentage / 100);
  return tax;
}

function taxCalculator(num) {
  let tax = 0;
  const taxRateByIncome = [
    { income: 3000, taxParentage: 0 },
    { income: 6000, taxParentage: 5 },
    { income: 10000, taxParentage: 15 },
    { income: 20000, taxParentage: 25 },
  ];
  let maxPertng = 30;
  let amount = num - taxRateByIncome[0].income;//4000

  for(let i = 0; i < taxRateByIncome.length - 1; i++){
    if(amount <= 0) break;
    let curSlab = taxRateByIncome[i + 1].income - taxRateByIncome[i].income;
    let pertg = taxRateByIncome[i + 1].taxParentage;
    if(amount > curSlab){
        curSlab = curSlab;
    }
    else{
        curSlab = amount;
    }
    tax += taxCalc(curSlab,pertg);
    amount -= curSlab;
    if(i == taxRateByIncome.length - 2 && amount > 0){
        console.log(amount);
        tax += taxCalc(amount,maxPertng);
    }
  }
  return tax < 50 ? tax == 0 ? 0 : 50 : tax;
}



// ------------------------------------------------------------------------
// travel allowance -> 500 USD without tax; above that -> add with income
// medical allowance -> 300 USD without tax; above that -> add with income
// housing allowance -> 1000 USD without tax; above that -> add with income
// ------------------------------------------------------------------------
// investment rebate -> 5% of investment will be returned
// ------------------------------------------------------------------------
//
//
// **** breakdown = simplification ****
// MVP - Minimum Viable Product

// input box for yearly income
// at each step -> look at how much money is left and calculate that accordingly
// after all steps -> check whether minimum is attained
