let movieList = null;
let inputSearch = null;
let triggerMode = false;

const createStyle = () => {
    const headStyle = document.createElement('style');
    headStyle.innerHTML = `
    * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        background-color: rgb(23, 44, 44);
        font-family: Arial, Helvetica, sans-serif;
    }
    .container {
        padding: 20px;
        max-width: 1280px;
        margin: 0 auto;
    }
    .movies {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
    }
    .movie {
        display: flex;
        align-content: center;
        justify-content: center;
    }
    .movie__image {
        width: 100%;
        object-fit: cover;
    }
    
    .search {
        margin-bottom: 30px;
    }
    .search__label-input {
        display: block;
        margin-bottom: 7px;
    }
    .search__input {
        display: block;
        width: 400px;
        padding: 10px 15px;
        border-radius: 4px;
        border: 1px solid lightgrey;
        margin-bottom: 10px;
    }
    .search__label-checkbox {
        display: block;
        font-size: 12px;
        margin-top: -17px;
        margin-left: 25px;
        padding-bottom: 20px;
    
    }`;
    document.head.appendChild(headStyle);
}

const createHeader = (container) => {
    const header = document.createElement('h1');
    header.innerText = 'Приложение для поиска фильмов';
    container.appendChild(header);
}

const setAttributes = (el, attrs) => {
    for (let key in attrs) el.setAttribute(key, attrs[key]);
}

const triggerModeHandler = () => triggerMode = !triggerMode;

const createsearchBox = (container) => {
    const searchBox = document.createElement('div');
    const input = document.createElement('input');
    const labelForInput = document.createElement('label');
    const checkbox = document.createElement('input');
    const labelForCheckbox = document.createElement('label');

    setAttributes(input, {
        class: 'search__input',
        id: 'search',
        type: 'text',
        placeholder: 'Начните вводить текст...'
    });

    setAttributes(labelForInput, {
        class: 'search__label-input',
        for: 'search'
    })
    labelForInput.innerText = 'Поиск фильмов';

    setAttributes(checkbox, {
        class: 'search__checkbox',
        id: 'checkbox',
        type: 'checkbox'
    });
    checkbox.addEventListener('click', triggerModeHandler)

    setAttributes(labelForCheckbox, {
        class: 'search__label-checkbox',
        for: 'checkbox'
    })
    labelForCheckbox.innerText = 'Добавлять фильмы к существующему списку';


    searchBox.append(labelForInput, input, checkbox, labelForCheckbox);
    container.append(searchBox);
}

const createMarkup = () => {
    const container = document.createElement('div');
    const movies = document.createElement('div');
    
    createHeader(container);
    createsearchBox(container);

    container.classList.add('container');
    movies.classList.add('movies');

    container.appendChild(movies);
    document.body.prepend(container);

    movieList = document.querySelector('.movies');
    inputSearch = document.querySelector('#search');
}

const addMovieToList = (movie) => {
    const item = document.createElement('div');
    const img = document.createElement('img');
    
    img.classList.add('movie__image');
    img.src = /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';
    item.classList.add('movie');
    
    item.appendChild(img);
    movieList.appendChild(item);
}

const clearMoviesMarkup = () => movieList && (movieList.innerHTML = '');

const delay = (() => {
    let timer = 0;

    return (cb, ms) => {
        clearTimeout(timer);
        timer = setInterval(cb, ms);
    };
})();

createStyle();
createMarkup();