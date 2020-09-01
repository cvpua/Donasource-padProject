import React,{ useContext, useState } from 'react'
import { PostContext } from './PostProvider.js'
import { Input, Button, InputGroup, InputLeftElement, Icon , Box, RadioButtonGroup, Text} from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'

const Search = () => {
    const store = useContext(PostContext)

    const {post, filteredPost} = store

    const [posts] = post
    const [filteredPosts, setFilteredPosts] = filteredPost

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('title')

    const history = useHistory()

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (search === "") {
            return(null)
        }

        let filteredPost = posts.filter(
            (post) => {
                const author = post.name.firstName + " " + post.name.lastName
                if (category === "title") {
                    return post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                } else if (category === "author") {
                    return author.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                } else if (category === "tags"){
                    let indicator = post.tags.map((item) => {
                        if (item.toLowerCase() === search.toLowerCase()){
                            return true;
                        }
                    })
                    if (indicator.includes(true) == true) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        );
        setFilteredPosts(filteredPost)
        history.push('/search')
    }

    const handleFormReset = () => {
        setSearch('')
        setCategory('')
    }

    const CustomRadio = React.forwardRef((props, ref) => {
      const { isChecked, isDisabled, value, ...rest } = props;
      return (
        <Button
          ref={ref}
          size="sm"
          variant="ghost"
          variantColor={isChecked ? "cyan" : "gray"}
          aria-checked={isChecked}
          role="radio"
          isDisabled={isDisabled}
          {...rest}
        />
      );
    });

    return (
         <Box p="4" pos="sticky" top="0" h="100vh">
            <form onSubmit ={handleFormSubmit} onReset = {handleFormReset}>
                <InputGroup>
                    <InputLeftElement children={<Icon name="search" color="primary.600" />} />
                    <Input 
                        placeholder="Search Donasource"
                        onChange={e => setSearch(e.target.value)}
                        name="search"
                        value={search}
                        type="text"
                        size="md"
                        focusBorderColor="primary.600"
                    />
                </InputGroup>
                <RadioButtonGroup d="flex" mt="2" defautlValue="title" onChange={val => setCategory(val)} value={category} >
                    <CustomRadio m="0" value="title" >Title</CustomRadio>
                    <CustomRadio m="0"  value="author" >Author</CustomRadio>
                    <CustomRadio m="0" value="tags">Tags</CustomRadio>
                </RadioButtonGroup>
                <Button variantColor="cyan" type="submit" >Search</Button>
            </form>
        </Box>
    )
}

export default Search

