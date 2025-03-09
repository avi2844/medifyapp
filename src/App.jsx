import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import NavBar from './Components/NavBar/NavBar'
import HeroSection from './Components/HeroSection/HeroSection'
import SearchSection from './Components/SearchSection/SearchSection'
import Home from './Components/Home/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MedicalCenterPage from './Components/MedicalCenterPage/MedicalCenterPage'
import { SnackbarProvider } from 'notistack'

const theme = createTheme({
  typography:{
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary:{
      main: "#2AA7FF",
      green: "#00A500",
      secondary: "#1B3C74"
    }
  },
  components:{
    MuiButton:{
      styleOverrides:{
        root:{
          borderRadius: '8px',
          textTransform: "none"
        },
        contained:{
          color: "#fff"
        }
      }
    },
    MuiContainer:{
      styleOverrides:{
        root:{
          width: '90%',
        }
      }
    }
  }
})

export const NewContext = createContext();
function App() {

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <>
      <ThemeProvider theme={theme}>
        <NewContext.Provider value = {[selectedCity, setSelectedCity, selectedState, setSelectedState]}>
        <SnackbarProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/medical-centers' element={<MedicalCenterPage />} />
        </Routes>
        </BrowserRouter>
        </SnackbarProvider>
        </NewContext.Provider>
      </ThemeProvider>
    </>
  )
}

export default App
