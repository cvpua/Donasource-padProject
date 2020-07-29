import React, {Component} from 'react';
import PostForm from './PostForm';
import './PostButton.css';


class PostButton extends Component {

    showPostForm = () => {
        const formModal = document.getElementById("postModal");
        formModal.style.display = 'block';
        
        const postButtonContainer = document.getElementById('post-button-container');
        postButtonContainer.style.display = 'none';
    }


    render(){

        return(
            <div>
                <div id="post-button-container" onClick={this.showPostForm}>
                <span id="post-button">&#43;</span>
                </div>
                <PostForm/>
            </div>
        )
    }

}

export default PostButton;