async function patchData(url, data) {
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) throw Error(response.statusText);

    return response.json();
}

patchData(`https://jsonplaceholder.typicode.com/posts/1`, {
    title: 'My title text',
    descr: 'Description text',
    text: 'Text',
    userId: 110
})
    .then((res) => console.log(res))
    .catch((err) => console.log(err));