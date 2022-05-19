import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import SearchIcon from './search.svg';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovie = async(title) => {
    const response = await fetch(`${process.env.REACT_APP_KEY}&s=${title}`);
    const data = await response.json();
    
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovie('Batman');
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>

      <div className='search'>
        <input 
          type='text'
          placeholder='Search your movie title'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon} 
          alt='search' 
          onClick={() => searchMovie(searchTerm)}
        />
      </div>
      
       {
         movies?.length > 0 ? (
          <div className='container'>
            {
              movies.map((movie, idx) => (
                <MovieCard key={idx} movie={movie} />
              ))
            }
          </div>
         ) : (
          <div className='empty'>
            <h2>Movie not found.</h2>
          </div>
         )
       }
 
    </div>
  );
}

export default App;
