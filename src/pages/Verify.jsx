import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Verify = () => {
  return (
    <div>
      <Heading>Please Verify your email.</Heading>
      <Text>An email has been sent to your email ID</Text>
      <Link to={"/login"}>
        <Text textDecoration={"underline"}>Back to Login</Text>
      </Link>
    </div>
  );
};

export default Verify;
