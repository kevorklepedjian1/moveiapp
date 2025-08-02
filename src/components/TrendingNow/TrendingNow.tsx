import React, { useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setSelectedMovie, updateFeaturedContent } from '../../store/slices/moviesSlice';
import { setVideoPlaying, setCurrentVideoUrl } from '../../store/slices/uiSlice';
import type { Movie } from '../../types';
import './TrendingNow.css';

const TrendingNow: React.FC = () => {
  const dispatch = useAppDispatch();
  const carouselRef = useRef<HTMLDivElement>(null);
  const trending = useAppSelector((state) => state.movies.trending);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMovieClick = (movie: Movie) => {
    dispatch(setSelectedMovie(movie));
    dispatch(updateFeaturedContent(movie));
    
    if (movie.VideoUrl) {
      dispatch(setCurrentVideoUrl(movie.VideoUrl));
      dispatch(setVideoPlaying(true));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const scrollLeftHandler = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRightHandler = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  if (!trending.length) {
    return null;
  }

  return (
    <div className="trending-now">
      <div className="trending-now__header">
        <h2 className="trending-now__title">Trending Now</h2>
        <div className="trending-now__controls">
          <button
            className="trending-now__control-btn trending-now__control-btn--left"
            onClick={scrollLeftHandler}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            className="trending-now__control-btn trending-now__control-btn--right"
            onClick={scrollRightHandler}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="trending-now__carousel"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {trending.map((movie) => (
          <div
            key={movie.Id}
            className="trending-now__item"
            onClick={() => handleMovieClick(movie)}
          >
            <div className="trending-now__image-container">
              <img
                src={`/src/assets/${movie.CoverImage}`}
                alt={movie.Title}
                className="trending-now__image"
                loading="lazy"
              />
              <div className="trending-now__overlay">
                <div className="trending-now__play-icon">▶</div>
              </div>
            </div>
            <div className="trending-now__info">
              <h3 className="trending-now__movie-title">{movie.Title}</h3>
              <div className="trending-now__metadata">
                <span className="trending-now__category">{movie.Category}</span>
                <span className="trending-now__year">{movie.ReleaseYear}</span>
                <span className="trending-now__rating">{movie.MpaRating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNow; 