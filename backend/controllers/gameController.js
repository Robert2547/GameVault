
export const searchGames = async (req, res) => {
  try {
    
    
  } catch (error) {
    console.log("Error in searchGames:", error.message);
    res.status(500).json({ message: error.message });
  }
};
