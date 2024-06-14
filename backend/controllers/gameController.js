import makeAPIRequest from "../utils/makeAPIRequest.js";

// Search for games based on search query
// Return game data up to limit of 10 results
export const searchGames = async (req, res) => {
  try {
    const headers = req.headers;
    const searchQuery = req.body.searchQuery; // Search query from request body
    const query = `fields *; search "${searchQuery}"; limit 10;`; // Query to search for games based on searchQuery and limit to 10 results

    const data = await makeAPIRequest("search", query, headers); // Make API request to search for games

    res.status(200).json(data);
  } catch (error) {
    console.log("Error in searchGames:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get covert at by gameID
// Return URL of the cover art
export const artWorkByID = async (req, res) => {
  try {
    const gameID = req.params.id; // Game ID from request params
    const headers = req.headers;
    const query = `fields url; where game = ${gameID};`; // Query to get cover art based on gameID

    const data = await makeAPIRequest("covers", query, headers); // Make API request to get cover art

    res.status(200).json(data);
  } catch (error) {
    console.log("Error in artWorkByID:", error.message);
    res.status(500).json({ message: error.message });
  }
};

//Get video game info by gameID
//Return ALL game data
export const gameByID = async (req, res) => {
  try {
    const gameID = req.params.id; // Game ID from request params
    const headers = req.headers;
    const query = `fields *; where id = ${gameID};`; // Query to get game data based on gameID

    const data = await makeAPIRequest("games", query, headers); // Make API request to get game data

    res.status(200).json(data);
  } catch (error) {
    console.log("Error in videoByID:", error.message);
    res.status(500).json({ message: error.message });
  }
};

//Get genres of video game by genreID
//Return array of genre names
export const genresByID = async (req, res) => {
  try {
    const genreIDs = req.params.id
      .split(",")
      .map((id) => parseInt(id.trim(), 10)); // Parse Genre IDs from request params
    const headers = req.headers;

    // Fetch genres based on genreID
    const fetchGenresByID = async (id) => {
      try {
        const query = `fields name; where id = ${id};`;
        const data = await makeAPIRequest("genres", query, headers);
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
