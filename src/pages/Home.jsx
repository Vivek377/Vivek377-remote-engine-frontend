import { Box, Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { link } from "../config";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [state, setState] = useState(false);
  const [startHour, setStartHour] = useState(null);
  const [startMin, setStartMin] = useState(null);
  const [endHour, setEndHour] = useState(null);
  const [endMin, setEndMin] = useState(null);
  const { setIsAuth, isAuth } = useContext(AuthContext);
  const toast = useToast();

  const handleSubmit = async () => {
    setState(!state);

    const currentDateTime = new Date();
    setEndHour(currentDateTime.getHours());
    setEndMin(currentDateTime.getMinutes());

    if (!state) {
      setStartHour(currentDateTime.getHours());
      setStartMin(currentDateTime.getMinutes());
    } else {
      setEndHour(currentDateTime.getHours());
      setEndMin(currentDateTime.getMinutes());

      const totalTimeHr = Math.abs(endHour - startHour);
      const totalTimeMin = Math.abs(endMin - startMin);

      const totalTime = `${totalTimeHr}:${totalTimeMin}`;
      const start = `${startHour}:${startMin}`;
      const end = `${endHour}:${endMin}`;

      const payload = { totalTime, start, end };

      try {
        const res = await axios.post(`${link}/user/worktime`, payload, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const data = await res.data;
        toast({
          title: "Email sent.",
          description: "We've sent email containing your work-hours.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        console.log(data);
      } catch (e) {
        toast({
          title: `${e.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.clear();
  };

  console.log(isAuth);

  if(!isAuth) return <Navigate to={"/verify"} />

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Button onClick={() => handleSubmit()}>
          {state ? "Stop Time" : "Start Time"}
        </Button>

        <Button onClick={() => handleLogout()}>Logout</Button>
      </Box>
    </div>
  );
};

export default Home;
