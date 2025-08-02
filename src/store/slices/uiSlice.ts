import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UIState } from '../../types';

const initialState: UIState = {
  isMenuOpen: false,
  isVideoPlaying: false,
  currentVideoUrl: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
    setVideoPlaying: (state, action: PayloadAction<boolean>) => {
      state.isVideoPlaying = action.payload;
    },
    setCurrentVideoUrl: (state, action: PayloadAction<string | null>) => {
      state.currentVideoUrl = action.payload;
    },
  },
});

export const { toggleMenu, setMenuOpen, setVideoPlaying, setCurrentVideoUrl } = uiSlice.actions;
export default uiSlice.reducer; 