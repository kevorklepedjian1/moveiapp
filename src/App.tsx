import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from './store';
import { fetchMovieData } from './store/slices/moviesSlice';
import { useAppSelector } from './hooks';
import FeaturedContent from './components/FeaturedContent/FeaturedContent';
import TrendingNow from './components/TrendingNow/TrendingNow';
import Loading from './components/Loading/Loading';
import './App.css';

const AppContent: React.FC = () => {
  const isLoading = useAppSelector((state) => state.movies.isLoading);
  const error = useAppSelector((state) => state.movies.error);

  useEffect(() => {
    store.dispatch(fetchMovieData());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="app__error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="app">
   
      <main className="app__main">
        <FeaturedContent />
        <TrendingNow />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#0071eb',
            colorBgContainer: '#141414',
            colorText: '#ffffff',
            colorTextSecondary: '#a3a3a3',
            borderRadius: 4,
          },
        }}
      >
        <AppContent />
      </ConfigProvider>
    </Provider>
  );
};

export default App;
