import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import './App.css';
import HomePage from './Components/HomePage';


function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HomePage/>
      </LocalizationProvider>
    </>
  );
}

export default App;
