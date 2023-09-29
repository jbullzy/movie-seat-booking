
//'const' assigns variables that should not be reassigned after their initial assignment. 
// 'document' is a global object that represents the current web page in the JS environment. 
//'querySelector' is a method call on the 'document' object that selects an HTML element based on a CSS selector
//the result is assigned to the variable using the 'const' keyword.
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
//this allows us to modify the 'count' element in the p tag at the bottom of the webpage. 
const count = document.getElementById('count');
//same as above but for the 'total' element
const total = document.getElementById('total');
//same as both above but for the 'movie' element in the 'movie-container' div
const movieSelect = document.getElementById('movie'); 

//initialize the populateUI function
populateUI();

//sets variable 'ticketPrice' to the 'value' from movieSelect. The + operator converts to a number.
let ticketPrice = +movieSelect.value;

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//get data from localstorage and populate the ui
function populateUI() {
    //creates the 'selectedSeats' const variable. this is taken from the updatedSelectedCount() function. 
    //the JSON.parse converts the string to an integer. 
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    //if selectedSeats isn't empty and the length is greater than zero, start the next if statement.
    if(selectedSeats !== null && selectedSeats.length > 0) {
        //forEach is a method in JS that goes through and applies a function to an array of items. 
        //=> is the callback function for the forEach method. 
        seats.forEach((seat, index) => {
            //checks if the current 'index' value is present in the selectedSeats array. 
            if(selectedSeats.indexOf(index) > -1) {
                //adds the class 'selected' to the seat that was selected. 
                seat.classList.add('selected');
            }
        })
    } 

    //creates the const variable selectedMovieIndex from the localStorage out of the web browser
    //it retrieves the value associated with the key 'selectedMovieIndex'. 
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    //if selectedMovieIndex is not empty, initiate a movieSelect event that assigns the selectedIndex from local storage. 
    if(selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//update total and count
function updatedSelectedCount() {
    //creates const variable 'selectedSeats' that selects from the html document.
    //querySelectorAll is a method of document that returns a nodelist with the targeted html ids. 
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    
    //creates the const variable seatsIndex that is filled with an array of the selected . 
    //...selectedSeats takes and array-like variable selectedSeats and turns it into a variable. 
    //.map() method is called on the array of selected seats. for each seat, it does the following:
    const seatsIndex = [...selectedSeats].map(function(seat){
        //[...seats] converts 'seats' array-like object into a real array
        //.indexOf(seat) calls on the array of seats to find the index of the current seat selected
        return [...seats].indexOf(seat);
    })

    //localStorage - web storage mechanism in JS. 
    //setItem - stores data in 'localStorage' under the key 'selectedSeats'
    //JSON.stringify converts seatsIndex to a string. Necessary because localStorage can only store strings.
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    //creates const variable selectedSeatsCount which is the length method called on selectedseats
    const selectedSeatsCount = selectedSeats.length;

    //calling the .innerText method on count and total to set them to the amount and price of tickets.
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//movie select event
//addEventListener attaches an event listener to the 'change' event of the movieSelect element. 
//the callback function is executed whenever the user selects a different option in the dropdown. 
//'e' is the event object representing the eveent triggered by the 'change' event. 
movieSelect.addEventListener('change', e => {
    //e.target.value retrieves the value of the currently selected dropdown option from movieSelect
    ticketPrice = +e.target.value;
    //setMovieData function with index of the selected option and selected value. 
    setMovieData(e.target.selectedIndex, e.target.value);
    //calls updatedSelectedCount to update the total and the count
    updatedSelectedCount();
})

//seat select event
//addEventListener to const 'container' every time it's clicked.
//(e) is the event object representing the event triggered by the 'click' event.
container.addEventListener('click', (e) => {
    //if the targeted object contains seat and doesn't contain occupied
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        //toggles the 'selected' class of the clicked seat. If it's already selected, it will deselect it.
        e.target.classList.toggle('selected'); 
        //logs the clicked seat to the console
        console.log(e.target);
    }
    //calls updatedSelectedCount to update total and count. 
    updatedSelectedCount();
} );

//initializes the selected movie from local storage when the page is brought up
updatedSelectedCount();