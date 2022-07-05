document.querySelectorAll('.counted-textarea').forEach((textarea) => {
    textarea.addEventListener('input', (event) => {
        /**
         * Notice that this event handler asume that you define the following :
         * 1. data-min and data-max attributes exist in your textarea
         * 2. data-min < data-max (otherwise the submit button will never enabled)
         */
        let textarea = event.target;
        let submit = textarea.form.querySelector('button[type="submit"]');
        let minLength = textarea.dataset.min;
        let maxLength = textarea.dataset.max;

        let length = textarea.value.length;
        let counter = textarea.parentNode.querySelector('.text-counter');
    
        /**
         * This disable the button, and the following checks will enable it only if
         * the data match the requirements
         */
        submit.disabled = true;
        
        if(length == 0) {
            counter.textContent = 'Enter at least 10 characters';
            counter.style.color = '#424242';
        } else if(length < minLength) {
            let toGo = minLength - length; // e.g. 5 more to go..
            counter.textContent = `${toGo} more to go..`;
            counter.style.color = '#424242';
        } else if(length > maxLength) {
            let tooLongBy = length - maxLength;
            counter.textContent = `Too long by ${tooLongBy} character${ (tooLongBy > 1) ? 's' : '' }`;
            counter.style.color = '#DE4F54';
        } else {
            let left = maxLength - length;
            counter.textContent = `${left} character${left > 1 ? 's' : ''} left`;
            
            /**
             * color set to counter is explained in the following line
             * maxLength = 600
             * 
             *                    gray                   orange                supernova
             * minLength  ==============================================================  maxLength
             *             (400 < left < 600)      (200 < left < 400)         (left < 200)    
             */
            let oneThird = maxLength / 3;
            let twoThirds = oneThird * 2;
    
            if(left < oneThird) { // supernova
                counter.style.color = '#DA680B';
            } else if(left < twoThirds && left > oneThird) { // orange
                counter.style.color = '#B77846';
            } else {
                counter.style.color = '#424242';
            }

            submit.disabled = false;
        }
    });
});

document.querySelector('#submit-report').addEventListener('click', function(event) {
    /**
     * Prevent default; maybe yu want to send request through AJAX without refreshing the page. Here
     * we just simulate the AJAX behavior using setTimeout and refresh the page after 4 seconds if everything
     * went well.
     */
    event.preventDefault();

    let message = document.querySelector('#message');
    let button = event.currentTarget;
    console.log(button)
    let buttonSpinner = button.querySelector('.spinner');

    message.disabled = button.disabled = true;
    buttonSpinner.classList.remove('none');
    buttonSpinner.classList.add('infinite-rotate');
    
    setTimeout(() => {
        /**
         * Maybe your application send the data to the server through a usual HTTP request
         * or you can do so via AJAX to kepp the page and show a green message if the data
         * sent successfully.
         * 
         * Note: if something wrong happened in an asynchronous request, you should add the following:
         * 
         * message.disabled = button.disabled = false;
         * buttonSpinner.classList.add('none');
         * buttonSpinner.classList.remove('infinite-rotate');
         */
        location.reload();
    }, 4000);
})