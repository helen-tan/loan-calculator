// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Delay calling the calculateResults function - to show loading gif
    // Hide Results
    document.getElementById('results').style.display = 'none';
    
    // Show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Results 
function calculateResults(){
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

        // Show Results
        document.getElementById('results').style.display = 'block';
        // Hide Loader gif
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
        // we can put a div and hide it and show it when needed
        // or we can built the alert from javascript using createElement fromt the document object (better)
    }
}

// Show error
function showError(errorMsg){
    // Hide Results
    document.getElementById('results').style.display = 'none';
    // Hide Loader gif
    document.getElementById('loading').style.display = 'none';


    // Create a div
    const errorDiv = document.createElement('div');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create Text Node and append to div
    errorDiv.appendChild(document.createTextNode(errorMsg));

    //Get elements
    const card = document.querySelector('.card');  // parent element
    const heading = document.querySelector('.heading');

    // Insert error above heading
    card.insertBefore(errorDiv, heading);  // insertBefore is called on a parent

    // Clear error message after 3 seconds
    setTimeout(clearError, 3000);

}
// Clear Error
function clearError(){
    document.querySelector('.alert').remove();
}
