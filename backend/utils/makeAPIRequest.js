const makeAPIRequest = async (endpoint, query, headers) => {
  try {
    const url = `https://api.igdb.com/v4/${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: query,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error in makeAPIRequest:", error.message);
    return { error: error.message };
  }
};

export default makeAPIRequest;
