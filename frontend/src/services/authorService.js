export async function createNewAuthor(author) {
  return fetch("http://localhost:3001/authors", {
    method: "POST",
    body: JSON.stringify(author),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw response;
  });
}
