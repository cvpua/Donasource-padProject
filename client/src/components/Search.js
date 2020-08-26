import React,{ useContext, useState } from 'react'
import { PostContext } from './PostProvider.js'

const Search = () => {
    const [posts, setPosts] = useContext(PostContext)

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('title')

    const handleFormSubmit = (event) => {
        event.preventDefault();

        let filteredPost = posts.filter(
            (post) => {
                if (category === "title") {
                    return post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                } else if (category === "author") {
                    return post.author.toLowerCase().indexOf(search.toLowerCase()) !== -1;
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
        setPosts(filteredPost)
    }

    const handleFormReset = () => {
        setSearch('')
        setCategory('')
    }

    return (
         <div>
            <form onSubmit ={handleFormSubmit} onReset = {handleFormReset}>
                <input
                    onChange={e => setSearch(e.target.value)}
                    name="search"
                    value={search}
                    type="text"
                    placeholder="Search Bar"
                    />
                <br />
                <div onChange={e => setCategory(e.target.value)} >
                    <input type="radio" id="title" name="categories" value="title" checked={category === 'title'} />
                    <label for="title" />Title <br />
                    <input type="radio" id="author" name="categories" value="author" checked={category === 'author'}/>
                    <label for="author" />Author<br />
                    <input type="radio" id="tags" name="categories" value="tags" checked={category === 'tags'}/>
                    <label for="tags" />Tags <br />
                </div>
                <button style={{ backgroundColor: "lightblue" }}> Search </button>
            </form>
        </div>
    )
}

export default Search

