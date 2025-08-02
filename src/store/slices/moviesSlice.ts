import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { MovieState, Movie, AppData } from '../../types';
import movieData from '../../data.json';



const sortMoviesByLastClicked = (movies: Movie[]): Movie[] => {
  const lastClickedId = sessionStorage.getItem('lastClickedMovieId');
  if (!lastClickedId) return movies;

  const sortedMovies = [...movies];
  const clickedIndex = sortedMovies.findIndex(movie => movie.Id === lastClickedId);
  
  if (clickedIndex !== -1) {
    const clickedMovie = sortedMovies.splice(clickedIndex, 1)[0];
    sortedMovies.unshift(clickedMovie);
  }

  return sortedMovies;
};


export const fetchMovieData = createAsyncThunk(
  'movies/fetchMovieData',
  async (): Promise<AppData> => {

    await new Promise(resolve => setTimeout(resolve, 500));
    return movieData as AppData;
  }
);

const initialState: MovieState = {
  featured: null,
  trending: [],
  selectedMovie: null,
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<Movie>) => {
      state.selectedMovie = action.payload;

      sessionStorage.setItem('lastClickedMovieId', action.payload.Id);
    },
    updateFeaturedContent: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      state.featured = {
        Id: movie.Id,
        Title: movie.Title,
        CoverImage: movie.CoverImage,
        TitleImage: movie.TitleImage,
        Date: movie.Date,
        ReleaseYear: movie.ReleaseYear,
        MpaRating: movie.MpaRating,
        Category: movie.Category,
        Duration: movie.Duration,
        Description: movie.Description,
      };
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featured = action.payload.Featured;
        const sortedMovies = sortMoviesByLastClicked(action.payload.TendingNow);
        state.trending = sortedMovies.slice(0, 50);
      })
      .addCase(fetchMovieData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch movie data';
      });
  },
});

export const { setSelectedMovie, updateFeaturedContent, clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer; 