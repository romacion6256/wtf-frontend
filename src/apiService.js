export const fetchMovies = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/functions`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};
