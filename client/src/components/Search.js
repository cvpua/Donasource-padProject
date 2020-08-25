import React, { Component } from 'react'

const INITIAL_STATE = {
    search: '',
    category: '',
};

const sample = [
    {
        id: 1,
        title: "I need alcohol pls guys",
        author: "Marco Mirandilla",
        tags: ['Educational', 'Food'],
    },
    {
        id: 2,
        title: "Penge barya kyah",
        author: "Jep Lar",
        tags: ['Drinks', 'Food'],
    },
    {
        id: 3,
        title: "For online classes",
        author: "CV Pua",
        tags: ['Food','Shelter'],
    },
]

class Search extends Component {
    state = INITIAL_STATE;

    updateSearch = (event) => {
        const { target } = event;
        this.setState({ search: target.value });
    }
    
    handleFormSubmit = (event) => { 
        const { category } = this.state;
        event.preventDefault();
        
        this.setState(INITIAL_STATE);
        let filteredPost = sample.filter(
            (post) => {
                console.log(category)
                if (category === "title") {
                    return post.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                } else if (category === "author") {
                    return post.author.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
                } else if (category === "tags"){
                    post.tags.filter((item) => {
                        if (item.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) {
                            console.log(post)
                        }
                    })
                }
            }
        );
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
                        <input type="radio" id="title" name="categories" value="title" checked={this.state.category === 'title'} />
                        <label for="title" />Title <br />
                        <input type="radio" id="author" name="categories" value="author" checked={this.state.category === 'author'}/>
                        <label for="author" />Author<br />
                        <input type="radio" id="tags" name="categories" value="tags" checked={this.state.category === 'tags'}/>
                        <label for="tags" />Tags <br />
                    </div>
                    <button style={{ backgroundColor: "lightblue" }}> Search </button>
                </form>
            </div>
        )
    }
}

export default Search

