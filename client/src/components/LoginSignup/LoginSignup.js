import React,{useState} from "react";
import  "./LoginSignup.css";
import Inputlog from "./Inputlog.js";
import Inputsign from "./Inputsign.js";
import { Box, Flex, Text, Button} from '@chakra-ui/core'
import LoginFormContainer from '../LoginFormContainer.js'
import SignupFormContainer from '../SignupFormContainer.js'

const LoginSignup = ({login,signup}) => {
    const [isLoggingIn, setIsLoggingIn] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleIsSubmitting = (value) => {
        setIsSubmitting(value)
    }

    const toggle = () => {
        setIsLoggingIn(!isLoggingIn)
    }

    return (
        <Flex bg="primary.600" h={isLoggingIn ? "100vh" : "full"} flexDirection={{base: "column-reverse", lg: "row"}}  justify={{base: 'center', lg: 'space-evenly'}} align={{base: 'center', lg: 'center'}} p="2">
            {
                isLoggingIn 
                ?
                    <React.Fragment>
                        {/* LOG IN */}
                        {/* Login Form Container */}
                        <Box bg="white" shadow="md" rounded="lg" py="12" px="10">
                            <Text fontSize="3xl" fontWeight="bold" mb="4">Login</Text>
                            <LoginFormContainer handleIsSubmitting={handleIsSubmitting} login={login} />
                            <Flex justify="flex-end" mt="8">
                                <Button mr="2" onClick={toggle} >Sign up</Button>    
                                <Button type="submit" variantColor="cyan" form="loginform" isLoading={isSubmitting} >Log in</Button>
                            </Flex>
                        </Box>
                        {/* Headline */}
                        <Box w={{base: 'xs', lg: 'lg'}} >
                            <Text fontSize="5xl" textAlign={{base: 'center', lg: 'left'}} fontWeight="extrabold" color="secondary.100">Donasource</Text>
                            <Text d={{base: 'none', lg: 'block'}} fontSize="lg" color="white">Donasource is a web application that connects people who need help and those people who can help by posting their needs or what they are willing to donate.</Text>
                        </Box>
                    </React.Fragment>
                :
                    <React.Fragment>
                        {/* SIGN UP */}
                        {/* Signup Form Container */}
                        <Box bg="white" shadow="md" rounded="lg" py="12" px="10" maxh="100vh" >
                            <Text fontSize="3xl" fontWeight="bold" mb="4">Sign up</Text>
                            <SignupFormContainer handleIsSubmitting={handleIsSubmitting} />
                            <Flex justify="flex-end" mt="8">
                                <Button mr="2" onClick={toggle} >Log in</Button>    
                                <Button type="submit" variantColor="cyan" form="signupform" isLoading={isSubmitting} >Sign up</Button>
                            </Flex>
                        </Box>
                        {/* Headline */}
                        <Box w={{base: 'xs', lg: 'lg'}} >
                            <Text d={{base: 'block', lg: 'none'}} fontSize="5xl" textAlign="center" fontWeight="extrabold" color="secondary.100">Join Us!</Text>
                            <Text d={{base: 'none', lg: 'block'}} fontSize="5xl" fontWeight="extrabold" color="secondary.100">Join Us and be part of a community that helps one another.</Text>
                        </Box>
                    </React.Fragment>
            }
        </Flex>
    )
}

export default LoginSignup;
