import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks';
import { Button } from 'antd';
import { PlayCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

import './FeaturedContent.css';
import Sidebar from '../Sidebar/Sidebar';

const FeaturedContent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const featured = useAppSelector((state) => state.movies.featured);
  const isVideoPlaying = useAppSelector((state) => state.ui.isVideoPlaying);
  const currentVideoUrl = useAppSelector((state) => state.ui.currentVideoUrl);

  useEffect(() => {
    if (isVideoPlaying && currentVideoUrl && videoRef.current) {
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.src = currentVideoUrl;
          videoRef.current.play().catch(console.error);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVideoPlaying, currentVideoUrl]);

  const formatDuration = (duration: string): string => {
    const minutes = Math.floor(parseInt(duration) / 60);
    return `${minutes}m`;
  };

  if (!featured) {
    return null;
  }

  return (
    <div className="featured-content">
         <Sidebar />
      {/* Background Image/Video */}
      <div className="featured-content__background">
        {isVideoPlaying && currentVideoUrl ? (
          <video
            ref={videoRef}
            className="featured-content__video"
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={`../../../public/assets/${featured.CoverImage}`}
            alt={featured.Title}
            className="featured-content__image"
          />
        )}
        <div className="featured-content__overlay" />
      </div>

      {/* Content */}
      <div className="featured-content__info">
        <div className="featured-content__header">
          <img
            src={`../../../public/assets//${featured.TitleImage}`}
            alt={featured.Title}
            className="featured-content__title-image"
          />
        </div>

        <div className="featured-content__metadata">
          <span className="featured-content__category">{featured.Category}</span>
          <span className="featured-content__year">{featured.ReleaseYear}</span>
          <span className="featured-content__rating">{featured.MpaRating}</span>
          <span className="featured-content__duration">{formatDuration(featured.Duration)}</span>
        </div>

        <p className="featured-content__description">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolore facere maiores quo, atque quaerat id iste hic delectus, rerum voluptatum harum commodi sint cupiditate asperiores minus nihil nam quasi.
        </p>

        <div className="featured-content__actions">
          <Button
            type="primary"
            size="large"
            icon={<PlayCircleOutlined />}
            className="featured-content__play-btn"
          >
            Play
          </Button>
          <Button
            size="large"
            icon={<InfoCircleOutlined />}
            className="featured-content__info-btn"
          >
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent; 