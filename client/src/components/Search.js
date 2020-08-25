import React, { Component } from 'react'

const INITIAL_STATE = {
    search: '',
    category: '',
};


class Search extends Component {
    state = INITIAL_STATE;

    
    updateSearch = (event) => {
        const { target } = event;
        this.setState({ search: target.value });
    }
    
    handleFormSubmit = (event) => { 
        const { category } = this.state;
        const { setFilteredPost, posts } = this.props;
        event.preventDefault();
        
        this.setState(INITIAL_STATE);
        let filteredPost = posts.filter(
            (post) => {
                if (category === "title") {
                    return post.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                } else if (category === "author") {
                    return post.author.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                } else if (category === "tags"){
                    let indicator = post.tags.map((item) => {
                        if (item.toLowerCase() === this.state.search.toLowerCase()){
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
            setFilteredPost(filteredPost)
            // filteredPost.map((post) => {
            //     console.log(post)
            //    
            // })
        }
        
    changeCategory = (event) => {
        const { target } = event;
        this.setState({
            category: target.value
        });
    }

    handleFormReset = () => {
        this.setState(() => this.initialState)
    }

    render() {
        const { search, category } = this.state;
                
        return (
            <div>
                <form onSubmit ={this.handleFormSubmit} onReset = {this.handleFormReset}>
                    <input
                        onChange={this.updateSearch}
                        name="search"
                        value={search}
                        type="text"
                        placeholder="Search Bar"
                        />
                    <br />
                    <div onChange={this.changeCategory}>
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
}

export default Search

