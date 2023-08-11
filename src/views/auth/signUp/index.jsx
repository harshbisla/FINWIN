
import React, {useState} from "react";
import mongoose from "mongoose";
import { NavLink, Redirect } from "react-router-dom";
// Chakra imports
// import signUpClick from "../../../utils/auth/authUtils";
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
    InputLeftAddon,
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
// const User = require('../../../models/users');

function SignUp() {
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
        name: "", phoneNumber: "", email: "", password: ""
    })
    const handleClick = () => setShow(!show);
    const handleInputs = (e) => {
        let name, value;
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value})
    }
    const signUpClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/signUp', user);
            if(response.data.status == 200) {
                console.log(response.data.status);
                setErrorInput(false);
                window.location.href = 'http://localhost:3000/horizon-ui-chakra#/auth/sign-in'
            } else {
                setUser({
                    name: "", phoneNumber: "", email: "", password: ""
                })
                setErrorInput(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

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
                        Sign Up
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        Enter your email and password to sign up!
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
                    {/*    fontSize='sm'*/}
                    {/*    me='0px'*/}
                    {/*    mb='26px'*/}
                    {/*    py='15px'*/}
                    {/*    h='50px'*/}
                    {/*    borderRadius='16px'*/}
                    {/*    bg={googleBg}*/}
                    {/*    color={googleText}*/}
                    {/*    fontWeight='500'*/}
                    {/*    _hover={googleHover}*/}
                    {/*    _active={googleActive}*/}
                    {/*    _focus={googleActive}>*/}
                    {/*    <Icon as={FcGoogle} w='20px' h='20px' me='10px' />*/}
                    {/*    Sign in with Google*/}
                    {/*</Button>*/}
                    <Flex align='center' mb='25px'>
                        <HSeparator />
                        {/*<Text color='gray.400' mx='14px'>*/}
                        {/*    or*/}
                        {/*</Text>*/}
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
                            Name<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            name='name'
                            value={user.name}
                            onChange={handleInputs}
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{ base: "0px", md: "0px" }}
                            type='name'
                            placeholder='FirstName LastName'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                        />
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            Phone Number<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup>
                            <InputLeftAddon children="+91" h="48px"/>
                            <Input
                                name='phoneNumber'
                                value={user.phoneNumber}
                                onChange={handleInputs}
                                isRequired={true}
                                variant='auth'
                                fontSize='sm'
                                ms={{ base: "0px", md: "0px" }}
                                type='tel'
                                placeholder='99999 99999'
                                mb='24px'
                                fontWeight='500'
                                size='lg'
                            />
                        </InputGroup>
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
                            name='email'
                            value={user.email}
                            onChange={handleInputs}
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{ base: "0px", md: "0px" }}
                            type='email'
                            placeholder='mail@thapar.edu'
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
                                name='password'
                                value={user.password}
                                onChange={handleInputs}
                                isRequired={true}
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
                        <Button
                            fontSize='sm'
                            variant='brand'
                            fontWeight='500'
                            w='100%'
                            h='50'
                            mb='24px'
                            type='submit'
                            onClick={signUpClick}>
                            Sign Up

                        </Button>
                    </FormControl>
                    <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='start'
                        maxW='100%'
                        mt='0px'>
                        <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                            Already registered?
                            <NavLink to='/auth/sign-in'>
                                <Text
                                    color={textColorBrand}
                                    as='span'
                                    ms='5px'
                                    fontWeight='500'>
                                    Log In
                                </Text>
                            </NavLink>
                        </Text>
                        {errorInput ? (
                        <Text color={'#C53030'} fontWeight='400' fontSize='14px'>
                            Wrong data type of Input
                        </Text> ) : <Text></Text>}
                    </Flex>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default SignUp;