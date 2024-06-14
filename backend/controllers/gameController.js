
export const searchGames = async (req, res) => {
  try {
    res.status(200).json({ message: "searchGames route" });
  } catch (error) {
    console.log("Error in searchGames:", error.message);
    res.status(500).json({ message: error.message });
  }
};
