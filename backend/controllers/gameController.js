// Search games based on searchQuery will return JSON of id, alternative_name, game (int), name, published_at
export const searchGames = async (req, res) => {
  try {
    const url = "https://api.igdb.com/v4/search";
    const searchQuery = req.body.searchQuery; // Search query from request body

    const headers = req.headers;

    const reponse = await fetch(url, {
      method: "POST",
      headers: headers, // Headers are added by addHeaders middleware
      body: `fields *; search "${searchQuery}"; limit 10;`, // Search for games based on searchQuery and limit to 10 results
    });

    const data = await reponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.log("Error in searchGames:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get covert at by game ID will return JSON of url
export const artWorkByID = async (req, res) => {
  try {
    const url = "https://api.igdb.com/v4/covers";
    const gameID = req.params.id; // Game ID from request params
    console.log("Game ID:", gameID);

    const headers = req.headers;
    console.log("Headers:", headers);

    const reponse = await fetch(url, {
      method: "POST",
      headers: headers, // Headers are added by addHeaders middleware
      body: `fields url; where game = ${gameID};`, // Get artworks based on gameID and limit to 10 results
    });

    const data = await reponse.json();

    res.status(200).json(data);
  } catch (error) {
    console.log("Error in artWorkByID:", error.message);
    res.status(500).json({ message: error.message });
  }
};
