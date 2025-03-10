import React, { useState } from "react";
import { Box, Button, Typography, Tabs, Tab } from "@mui/material";

const weekDays = [
  "Today",
  "Tomorrow",
  "Wed, Mar 13",
  "Thu, Mar 14",
  "Fri, Mar 15",
  "Sat, Mar 16",
  "Sun, Mar 17",
];
const slotsData = {
  Morning: ["11:30 AM"],
  Afternoon: ["12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
  Evening: ["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"],
};

function BookingSelection({ hospitalName, Address, City, rating }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const handleDayChange = (event, newValue) => setSelectedDay(newValue);

  function handleSelection(slot) {
    setSelectedTime(slot);
    const data = [
      {
        "Hospital Name": hospitalName,
        City: City,
        "Hospital overall rating": rating,
        bookingDate: selectedDay,
        bookingTime: slot,
      },
    ];

    const currData = JSON.parse(localStorage.getItem("bookings")) || [];
    currData.push(...data);
    localStorage.setItem("bookings", JSON.stringify(currData));
  }

  return (
    <Box sx={{ width: "100%", textAlign: "center", p: 2 }}>
      <Tabs
        value={selectedDay}
        onChange={handleDayChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ maxWidth: "600px", overflowX: "auto" }}
      >
        {weekDays.map((day, index) => (
          <Tab
            key={index}
            label={<p>{day}</p>}
          />
        ))}
      </Tabs>
      <Typography variant="body2" color="green" mt={1}>
        {Math.floor(Math.random() * 20) + 5} Slots Available
      </Typography>

      {Object.entries(slotsData).map(([period, slots]) => (
        <Box key={period} mt={2}>
          <p variant="h6" sx={{ textTransform: "capitalize" }}>
            {period}
          </p>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "center",
              flexWrap: "wrap",
              mt: 1,
            }}
          >
            {slots.map((slot, i) => (
              <Button
                key={i}
                variant={selectedTime === slot ? "contained" : "outlined"}
                sx={{ borderRadius: "8px" }}
                onClick={() => handleSelection(slot)}
              >
                {slot}
              </Button>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default BookingSelection;
