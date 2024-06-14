export const searchGames = async (req, res) => {
  try {

    const url = "https://api.igdb.com/v4/search";
    const searchQuery = req.body.searchQuery;

    const headers = req.headers;

    const reponse = await fetch(url, {
      method: "POST",
      headers: headers, // Headers are added by addHeaders middleware
      body: `fields *; search "${searchQuery}"; limit 10;`,
    });

    const data = await reponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.log("Error in searchGames:", error.message);
    res.status(500).json({ message: error.message });
  }
};
