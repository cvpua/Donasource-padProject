import React, { Component } from 'react'

const INITIAL_STATE = {
    search: ''
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
        tags: ['Educational', 'Food'],
    },
    {
        id: 3,
        title: "For online classes",
        author: "CV Pua",
        tags: ['Food'],
    },
]

class Search extends Component {
    state = INITIAL_STATE;

    updateSearch = (event) => {
        const { target } = event;
        this.setState({ search: target.value });
    }

    handleFormSubmit = (event) => { 
        event.preventDefault();
        this.setState(INITIAL_STATE);
    }
    render() {
        let filteredPost = sample.filter(
                (title) => {
                return title.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        const { search } = this.state;
        return (
            <div>
                <form onSubmit ={this.handleFormSubmit}>
                    <input
                        onChange={this.updateSearch}
                        name="search"
                        value={search}
                        type="text"
                        placeholder="Search Bar"
                        />
                </form>
                {filteredPost.map((title)=> {
                    console.log(title)
                })}
            </div>
        )
    }
}

export default Search