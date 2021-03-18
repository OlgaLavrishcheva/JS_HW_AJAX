async function postsData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw Error(response.statusText);

    return response.json();
}

postsData(`http://jsonplaceholder.typicode.com/posts`, {
    title: 'My title text',
    descr: 'Description text',
    text: 'Text'
})
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
