
import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import axios from 'axios';
axios.default.withCredentials=true;

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [user, setUser] = useState({
    email: "", password: ""
  })
  const handleInputs = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value})
  }
  const loginInClick = async (e) => {
      e.preventDefault();

      try {
        // console.log('h')
          const response = await axios.post('http://localhost:8000/signIn', user);
          if(response.data.status == 200) {
            console.log(response.data.user);
            setErrorInput(false);
            window.location.href = 'http://localhost:3000/horizon-ui-chakra#/'
          } else {
              setUser({
                email: "", password: ""
          })
            setErrorInput(true);
        }
      }   catch (error) {
            console.error('Error:', error);
      }
  }

  useEffect(() => {
    axios.get('http://localhost:8000/signIn').then((response) => {
      console.log(response);
    })
  }, [])

  const handleClick = () => setShow(!show);
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign In
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          {/*<Button*/}
          {/*  fontSize='sm'*/}
          {/*  me='0px'*/}
          {/*  mb='26px'*/}
          {/*  py='15px'*/}
          {/*  h='50px'*/}
          {/*  borderRadius='16px'*/}
          {/*  bg={googleBg}*/}
          {/*  color={googleText}*/}
          {/*  fontWeight='500'*/}
          {/*  _hover={googleHover}*/}
          {/*  _active={googleActive}*/}
          {/*  _focus={googleActive}>*/}
          {/*  <Icon as={FcGoogle} w='20px' h='20px' me='10px' />*/}
          {/*  Sign in with Google*/}
          {/*</Button>*/}
          <Flex align='center' mb='25px'>
            <HSeparator />
            <HSeparator />
          </Flex>
          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              name='email'
              value={user.email}
              onChange={handleInputs}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='email@thapar.edu'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                name='password'
                onChange={handleInputs}
                value={user.password}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                {/*<Checkbox*/}
                {/*  id='remember-login'*/}
                {/*  colorScheme='brandScheme'*/}
                {/*  me='10px'*/}
                {/*/>*/}
                {/*<FormLabel*/}
                {/*  htmlFor='remember-login'*/}
                {/*  mb='0'*/}
                {/*  fontWeight='normal'*/}
                {/*  color={textColor}*/}
                {/*  fontSize='sm'>*/}
                {/*  Keep me logged in*/}
                {/*</FormLabel>*/}
              </FormControl>
              <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              onClick={loginInClick}
              mb='24px'>
              Sign In
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Not registered yet?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Create an Account
                </Text>
              </NavLink>
            </Text>
            {errorInput ? (
            <Text
                color={'#C53030'}
                as='span'
                ms='5px'
                fontWeight='500'>
                Wrong password or email
            </Text> ) : <Text></Text> }
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
