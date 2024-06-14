// Search for games based on search query
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

    const headers = req.headers;

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

//Get video game info by gameID
export const gameByID = async (req, res) => {
  try {
    const url = "https://api.igdb.com/v4/games";
    const gameID = req.params.id; // Game ID from request params

    const headers = req.headers;

    const response = await fetch(url, {
      method: "POST",
      headers: headers, // Headers are added by addHeaders middleware
      body: `fields genres; where id = ${gameID};`, // Get videos based on gameID
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.log("Error in videoByID:", error.message);
    res.status(500).json({ message: error.message });
  }
};

//Get genres of video game by genreID
export const genresByID = async (req, res) => {
  try {
    const url = "https://api.igdb.com/v4/genres";

    const genreIDs = req.params.id
      .split(",")
      .map((id) => parseInt(id.trim(), 10)); // Parse Genre IDs from request params
    const headers = req.headers;

    // Fetch genres based on genreID
    const fetchGenresByID = async (id) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: headers, // Headers are added by addHeaders middleware
          body: `fields name; where id = ${id};`, // Get genres based on genreID
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("Error in fetchGenresByID:", error.message);
        return { message: error.message };
      }
    };

    const genreData = await Promise.all(genreIDs.map(fetchGenresByID)); // Fetch genres for each genreID

    // Combine the results from multiple API calls and extract the names
    const combinedGenreData = genreData.flat().map((genre) => genre.name);

    res.status(200).json(combinedGenreData);
  } catch (error) {
    console.log("Error in genresByID:", error.message);
    res.status(500).json({ message: error.message });
  }
};
