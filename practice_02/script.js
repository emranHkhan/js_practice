const cardRow = document.getElementById('card-row')
const searchIconContainer = document.querySelector('.search-icon-container');
const modalBtn = document.querySelector('.modal-btn');


document.getElementById('meal-search-form').addEventListener('submit', function (event) {
    submitForm(event);
});

document.querySelector('.search-icon').addEventListener('click', function (event) {
    submitForm(event);
});

const fetchMeal = (params = '') => {
    toggleSpinner(true)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${params}`)
        .then(res => res.json())
        .then(data => {
            toggleSpinner(false)
            renderCards(data.meals)
        })
        .catch(err => renderErrorMessage())
}

function createCard(data) {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
        <div class="card mb-3 shadow-lg">
            <img src="${data.strMealThumb ?? './assets/player.png'}" class="card-img-top" alt="${data.strMeal}">

            <div class="card-body">
                <h5 class="card-title text-secondary">Name: ${data.strMeal}</h5>
                <h6 class="card-subtitle text-muted">Category: ${data.strCategory}</h6>
            </div>
            <div class="card-body">
                <p class="card-text">Orgin: ${data.strArea}</p>
                <p class="card-text">${(data.strInstructions + '').split(' ').slice(0, 10).join(' ') + '...'}</p>
                <div data-playerId="${data.idPlayer}" class="d-inline-block">
                <button type="button" class="btn btn-info rounded-0" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showMealDetails('${data.strMeal}', '${data.strCategory}', '${data.strArea}', '${data.strInstructions}')">
                    See Details
                </button>
            </div>
        </div>
    `;
    return card;
}

function showMealDetails(name, category, area, instructions) {
    document.querySelector('.modal-title').innerText = name
    document.querySelector('.category').innerText = category
    document.querySelector('.area').innerText = area
    document.querySelector('.instructions').innerText = instructions
}


function submitForm(event) {
    event.preventDefault();
    const mealName = document.getElementById('inputDefault').value;
    fetchMeal(mealName);
}

function toggleSpinner(isFetching = false) {
    if (isFetching) {
        document.getElementById('card-row').innerHTML = `<div class="w-100 d-flex justify-content-center">
        <div class="spinner-border text-primary mt-5" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>
        </div>`
    } else {
        document.getElementById('card-row').innerHTML = ''
    }
}


function renderErrorMessage() {
    cardRow.innerHTML = ''

    cardRow.innerHTML = `
    <div class='d-flex flex-column align-items-center justify-content-center my-5'>
        <h3 class="text-center">No Player Found!</h3>
        <a href='/' class='btn btn-dark text-light w-25 mt-5'>Go Back</a>
    </div>
    `
}

function renderCards(data) {
    cardRow.innerHTML = ''
    data.forEach(item => {
        const card = createCard(item);
        cardRow.appendChild(card);
    });
}


fetchMeal()