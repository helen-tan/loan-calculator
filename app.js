// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Calculate Results (Event Handler)
function calculateResults(e){
    console.log('Calculating...');
    // UI vars (to point to the input)
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value); // parseFloat turns the num into a decimal
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest)/(x - 1);

    if(isFinite(monthly)){ // test if finite numbers are passed in
        monthlyPayment.value = monthly.toFixed(2); // toFixed to set the no. of decimals
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        showError('Please check your numbers');
        // we can put a div and hide it and show it when needed
        // or we can built the alert from javascript using createElement fromt the document object (better)
    }

    e.preventDefault();
}


