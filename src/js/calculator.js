document.addEventListener('DOMContentLoaded', () => {

const formInputRadio = document.querySelectorAll('.form-input-radio');
const repaymentRadio = document.getElementById('repayment');
const interestRadio = document.getElementById('interest');
const calculateBtn = document.getElementById('calculate-btn');
const display = document.querySelector('.display');

// Function to update the background color
function updateRadioBackground() {
    // Clear background color for all containers
    formInputRadio.forEach((container) => {
      container.style.backgroundColor = ''; // Remove background color
      container.style.border = ''; //
    });
  
    // Apply background to the checked radio's container
    if (repaymentRadio.checked) {
      repaymentRadio.closest('.form-input-radio').style.background = 'rgba(216, 219, 47, 0.15)';
      repaymentRadio.closest('.form-input-radio').style.border = '1px solid #D8DB2F';
    } else if (interestRadio.checked) {
      interestRadio.closest('.form-input-radio').style.background = 'rgba(216, 219, 47, 0.15)';
     interestRadio.closest('.form-input-radio').style.border = '1px solid #D8DB2F';
    }
  }
  
  // Add change event listeners to each radio button
  repaymentRadio.addEventListener('change', updateRadioBackground);
  interestRadio.addEventListener('change', updateRadioBackground);

  function calculateMortgageRepayment() {
    // Get input values and convert to numbers
    const mortgageAmount = parseFloat(document.getElementById('mortgage-amount').value);
    const mortgageTerm = parseFloat(document.getElementById('mortgage-term').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);

    // Calculate monthly interest rate and total number of payments
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = mortgageTerm * 12;

    // Calculate monthly payment using the mortgage formula
    const monthlyPayment = mortgageAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - mortgageAmount;
    const totalMonthlyInterest = totalInterest / numberOfPayments;

    // Check which radio button is selected and call the appropriate display function
    if (repaymentRadio.checked) {
        displayRepayment(monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
                         totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
                         totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
                         totalMonthlyInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    } else if (interestRadio.checked) {
        displayInterest(totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 
                        totalMonthlyInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
}


 calculateBtn.addEventListener('click', calculateMortgageRepayment);
 
 function displayRepayment(monthlyPayment, totalPayment, totalInterest, totalMonthlyInterest) {
     display.innerHTML = '';

     const resultsHeading = document.createElement('div');
    resultsHeading.classList.add('results-heading');
    display.appendChild(resultsHeading);

    const resultsTitle = document.createElement('h2');
    resultsTitle.textContent = 'Your results';
    resultsTitle.classList.add('text-preset-2-desktop');
    resultsHeading.appendChild(resultsTitle);

    const resultsPara = document.createElement('p');
    resultsPara.textContent = 'Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.';
    resultsPara.classList.add('text-preset-4-desktop');
    resultsHeading.appendChild(resultsPara);

    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('results-container');
    display.appendChild(resultsContainer);

    const monthlyResults = document.createElement('div');
    monthlyResults.classList.add('monthly-results');
    resultsContainer.appendChild(monthlyResults);

    const monthlyResultsTitle = document.createElement('h4');
    monthlyResultsTitle.textContent = 'Your monthly repayments';
    monthlyResultsTitle.classList.add('text-preset-4-desktop');
    monthlyResults.appendChild(monthlyResultsTitle);

    const monthlyResultsAmount = document.createElement('h1');
    monthlyResultsAmount.textContent = `$${monthlyPayment}`;
    monthlyResultsAmount.classList.add('text-preset-1-desktop');
    monthlyResults.appendChild(monthlyResultsAmount);

    const totalResults = document.createElement('div');
    totalResults.classList.add('total-results');
    resultsContainer.appendChild(totalResults);

    const totalResultsTitle = document.createElement('h4');
    totalResultsTitle.textContent = "Total you'll repay over the term";
    totalResultsTitle.classList.add('text-preset-4-desktop');
    totalResults.appendChild(totalResultsTitle);

    const totalResultsAmount = document.createElement('h2');
    totalResultsAmount.textContent = `$${totalPayment}`;
    totalResultsAmount.classList.add('text-preset-2-desktop');
    totalResults.appendChild(totalResultsAmount);
 }


 function displayInterest(totalInterest, totalMonthlyInterest) {
    display.innerHTML = '';

    const resultsHeading = document.createElement('div');
    resultsHeading.classList.add('results-heading');
    display.appendChild(resultsHeading);

    const resultsTitle = document.createElement('h2');
    resultsTitle.textContent = 'Your results';
    resultsTitle.classList.add('text-preset-2-desktop');
    resultsHeading.appendChild(resultsTitle);

    const resultsPara = document.createElement('p');
    resultsPara.textContent = 'Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.';
    resultsPara.classList.add('text-preset-4-desktop');
    resultsHeading.appendChild(resultsPara);

    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('results-container');
    display.appendChild(resultsContainer);

    const monthlyInterest = document.createElement('div');
    monthlyInterest.classList.add('monthly-interest');
    resultsContainer.appendChild(monthlyInterest);

    const monthlyInterestTitle = document.createElement('h4');
    monthlyInterestTitle.textContent = 'Your monthly interest repayments';
    monthlyInterestTitle.classList.add('text-preset-4-desktop');
    monthlyInterest.appendChild(monthlyInterestTitle);

    const monthlyInterestAmount = document.createElement('h1');
    monthlyInterestAmount.textContent = `$${totalMonthlyInterest}`;
    monthlyInterestAmount.classList.add('text-preset-1-desktop');
    monthlyInterest.appendChild(monthlyInterestAmount);

    const totalInterestResults = document.createElement('div');
    totalInterestResults.classList.add('total-interest');
    resultsContainer.appendChild(totalInterestResults);

    const totalInterestResultsTitle = document.createElement('h4');
    totalInterestResultsTitle.textContent = "Total interest you'll repay over the term";
    totalInterestResultsTitle.classList.add('text-preset-4-desktop');
    totalInterestResults.appendChild(totalInterestResultsTitle);

    const totalInterestResultsAmount = document.createElement('h2');
    totalInterestResultsAmount.textContent = `$${totalInterest}`;
    totalInterestResultsAmount.classList.add('text-preset-2-desktop');
    totalInterestResults.appendChild(totalInterestResultsAmount);

 }

});




