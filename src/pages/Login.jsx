import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { link } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = async () => {
    try {
      const payload = {
        email,
        password,
      };

      const res = await axios.post(
        `${link}/user/login`,
        payload
      );
      const data = await res.data;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("verified", res.data.isVerified);

      setIsAuth(res.data.isVerified);
      navigate("/dashboard");

      toast({
        title: `${data.msg}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      console.log(data);
    } catch (e) {
      console.log(e);
      toast({
        title: `${e.message}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Log in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Box></Box>
                <Link to={"/reset"} color={"blue.400"}>
                  Forgot password?
                </Link>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  New user?{" "}
                  <Link color={"blue.400"} to={"/signup"}>
                    Sign up
                  </Link>
                </Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => handleClick()}
              >
                Log in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
