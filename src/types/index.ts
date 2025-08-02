export interface Movie {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: string;
  MpaRating: string;
  Category: string;
  Duration: string;
  VideoUrl?: string;
  Description: string;
}

export interface FeaturedContent {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: string;
  MpaRating: string;
  Category: string;
  Duration: string;
  Description: string;
}

export interface AppData {
  Featured: FeaturedContent;
  TendingNow: Movie[];
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
}

export interface RootState {
  movies: MovieState;
  ui: UIState;
}

export interface MovieState {
  featured: FeaturedContent | null;
  trending: Movie[];
  selectedMovie: Movie | null;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  isMenuOpen: boolean;
  isVideoPlaying: boolean;
  currentVideoUrl: string | null;
} 