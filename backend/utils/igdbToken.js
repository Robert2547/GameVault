// This function is used to generate the IGDB Auth token which is required to make requests to the IGDB API.
export const generateIGDBToken = async () => {
  try {
    const client_id = process.env.IGDB_CLIENT_ID;
    const client_secret = process.env.IGDB_CLIENT_SECRET;

    const url = `https://id.twitch.tv/oauth2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) { 
      console.log("Error in generating IGDB token");
      throw new Error("Error in generating IGDB token");
    }

    const data = await response.json(); // Convert response to JSON
    return data; 
  } catch (error) {
    console.log("Error in generateIGDBToken:", error.message);
    throw new Error("Error in generating IGDB token");
  }
};
