// Создан и отправлен GET-запрос к серверу

// 1) через XMLHttpRequest():

// const getData = (url) => new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();

//     xhr.open('GET', url)

//     xhr.send();

//     xhr.onload = () => {
//         if (xhr.status === 200) {
//             const json = JSON.parse(xhr.response)

//             resolve(json.Search);
//         } else {
//             reject(json.statusText);
//         }
//     }

//     xhr.onerror = (err) => reject(err);

// });

// const search = 'Iron man'
// getData(`http://www.omdbapi.com/?apikey=9bbb0cb8&s=${search}`)
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));



// 2) через метод fetch:

// --- вариант 1
// const getData = (url) => fetch(url).then((response) => response.json());
// getData(`http://jsonplaceholder.typicode.com/posts`).then((res) => console.log(res));


// --- вариант 2

// async function getData (url) {
//     const response = await fetch(url);

//     if (!response.ok) throw Error(response.statusText);

//     return response.json();
// }
// getData(`http://jsonplaceholder.typicode.com/posts`)
// .then((res) => console.log(res))
// .catch((err) => console.log(err));


// 3) XMLHttpRequest() перепишем через fetch

// const getData = (url) => fetch(url).then((response) => response.json())
// .then((json) => json.Search);

// const search = 'Iron man'
// getData(`http://www.omdbapi.com/?apikey=9bbb0cb8&s=${search}`)
//     .then((movies) => movies.forEach((movie) => console.log(movie)))
//     .catch((err) => console.log(err));



// создание запроса через Promise:
// const getData = (url) => fetch(url).then((response) => response.json())
// .then((json) => json.Search);

// const search1 = 'Iron man';
// const search2 = 'Batman';
// const search3 = 'Superman';

// const ironman = getData(`http://www.omdbapi.com/?apikey=9bbb0cb8&s=${search1}`);
// const batman = getData(`http://www.omdbapi.com/?apikey=9bbb0cb8&s=${search2}`);
// const superman = getData(`http://www.omdbapi.com/?apikey=9bbb0cb8&s=${search3}`);

// Promise.all([ironman, batman, superman])
// .then((res) => res.forEach((movies) => movies.forEach((movie => addMovieToList(movie)))));



let searchLast = ' ';

const getData = (url) => fetch(url)
    .then((response) => response.json())
    .then((json) => {
        if (!json || !json.Search) throw Error('Сервер вернул неправильный объект');

        return json.Search;
    });

inputSearch.addEventListener('keyup', (e) => {
    delay(() => {
        const searchString = e.target.value;
        if (searchLast && searchString.length > 3 && searchString !== searchLast) {
            if (!triggerMode) clearMoviesMarkup();

            getData(`https://www.omdbapi.com/?apikey=9bbb0cb8&s=${searchString}`)
            .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
            .catch((err) => console.log(err));
        }
        searchLast = searchString;
    }, 1000);
    // console.log(e);
});