export function checkGenreName(name) {
  return fetch(`http://localhost:3001/genres/genrename_available/${name}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(
            error.message || "Failed to check genre name availability"
          );
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error checking genre name availability:", error);
      throw error;
    });
}
