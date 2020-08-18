import React from 'react'
import { Field } from 'formik'
import { Button, Input, InputGroup, InputRightElement, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/core'

const MyPassword = (props) => {
	const { label, name , ...rest } = props
	const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

	return (
		<Field name={name}>
			{
				({field, form}) => {
					return <FormControl isInvalid={form.errors[name] && form.touched[name]} mb="2">
						{
							label && <FormLabel htmlFor={name}>{label}</FormLabel>
						}
						<InputGroup size="md">
				      <Input
				        pr="4.5rem"
				        type={show ? "text" : "password"}
				        placeholder="Enter password"
				        id={name} {...rest} {...field}
				      />
				      <InputRightElement width="4.5rem">
				        <Button h="1.75rem" size="sm" onClick={handleClick}>
				          {show ? "Hide" : "Show"}
				        </Button>
				      </InputRightElement>
				    </InputGroup>
				    <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
					</FormControl>
				}
			}
		</Field>
	)
}

export default MyPassword