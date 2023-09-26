import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const Home = () => {
  const [state, setState] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const toast = useToast();

  const handleSubmit = async () => {
    setState(!state);

    const currentDateTime = new Date();
    setEnd(currentDateTime.getHours());

    if (!state) {
      setStart(currentDateTime.getHours());
    } else {
      setEnd(currentDateTime.getHours());
      const totalTime = Math.abs(end - start);

      const payload = { totalTime, start, end };

      try {
        const res = await axios.post(
          `https://friendly-pig-toga.cyclic.cloud/user/worktime`,
          payload,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
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

  return (
    <div>
      <Button onClick={() => handleSubmit()}>
        {state ? "Stop Time" : "Start Time"}
      </Button>
    </div>
  );
};

export default Home;
