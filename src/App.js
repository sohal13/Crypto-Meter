import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/components/Header';
import Home from './pages/Home'
import Coinpage from './pages/Coinpage'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  theme: {
    background: "black",
    color: "white",
    minHeight: "100vh",
  }
}))

function App() {

  const classes = useStyles();

  return (
    <div className={classes.theme}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coins/:id' element={<Coinpage />} />
      </Routes>
    </div>

  );
}

export default App;
