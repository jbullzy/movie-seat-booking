
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

populateUI();

//sets variable 'ticketPrice' to 
let ticketPrice = +movieSelect.value;

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//get data from localstorage and populate the ui
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    } 

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

//update total and count
function updatedSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updatedSelectedCount();
})

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected'); 
        console.log(e.target);
    }

    updatedSelectedCount();
} );

//initializes the selected movie from local storage when the page is brought up
updatedSelectedCount();