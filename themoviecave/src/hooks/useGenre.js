const useGenre = (selectedGenres) => {
    if(selectedGenres.length < 1) return "";

    const genreIds = selectedGenres.map((x) => x.id);
    return genreIds.reduce((acc, curr) => acc + "," + curr);

}

export default useGenre