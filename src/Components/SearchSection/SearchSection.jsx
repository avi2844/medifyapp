import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
  Autocomplete,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconCard from "../IconCard/IconCard";
import styles from "./SearchSection.module.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import { NewContext } from "../../App";

function SearchSection() {
  const theme = useTheme();

  const [selectedCity, setSelectedCity, selectedState, setSelectedState] = useContext(NewContext);

  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  

  async function getStates() {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://meddata-backend.onrender.com/states"
      );
      setStates(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Check the backend server", error);
      setLoading(false);
    }
  }

  async function getCities(stateName) {
    if (!stateName) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://meddata-backend.onrender.com/cities/${stateName}`
      );
      setCities(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Check the backend server", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      setSelectedCity(null);
      getCities(selectedState);
    }
    else{
      setSelectedCity(null);
      setCities([]);
    }
  }, [selectedState]);

  function handleClick(){
    if(selectedState && selectedCity){
      navigate("/medical-centers");
    }
    else{
      enqueueSnackbar('Please select City and State to Proceed.', {variant : 'warning', preventDuplicate: true});
      return;
    }
  }



  return (
    <Container
      maxWidth="xl"
      style={{ background: "#FFFFFF", borderRadius: "15px" }}
      className={styles.search}
    >
      <Stack
        direction={"row"}
        display={"flex"}
        justifyContent={"space-between"}
        fontFamily={theme.typography.fontFamily}
        p={6}
      >
        <Autocomplete
          options={states}
          loading={loading}
          sx={{ width: 300 }}
          value={selectedState}
          onChange={(event, newValue) => {
            setSelectedState(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              slotProps={{
                textField: {
                  InputProps: {
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                },
              }}
              placeholder="State"
            />
          )}
        />
        <Autocomplete
          options={cities}
          loading={loading}
          sx={{ width: 300 }}
          value={selectedCity}
          onChange={(event, newValue) => {
            setSelectedCity(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              slotProps={{
                textField: {
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                },
              }}
              placeholder="City"
            />
          )}
        />
        <Button variant="contained" size="large" startIcon={<SearchIcon />} onClick={handleClick}> 
          Search
        </Button>
      </Stack>
      <Box>
        <Typography>You May be looking for</Typography>
        <Box>
          <IconCard />
        </Box>
      </Box>
    </Container>
  );
}

export default SearchSection;
