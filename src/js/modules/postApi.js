const postApi = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const responseLog = await response.json();
  if (!response.ok) {
    alert("There was a problem with your request. Please try again later.");
    return false;
  }
  return responseLog;
};
