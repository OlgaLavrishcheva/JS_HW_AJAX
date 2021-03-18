async function putData(url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw Error(response.statusText);

    return response.json();
}

putData(`http://jsonplaceholder.typicode.com/posts/1`, {
    title: 'My title text',
    descr: 'Description text',
    text: 'Text'
})
    .then((res) => console.log(res))
    .catch((err) => console.log(err));