import React,{Component} from 'react';
import './PostForm.css';


const INITIAL_STATE = {
    req_title : "",
    req_description : "",
    req_quantity : "",
    req_duration_date :  "",
    req_duration_time :  "",      
    req_location : "",
    req_image: ""
}


class PostForm extends Component{

    state = {
        isRequest : false,
        isDonate : false
    }


    handleInputChange = (event) => {
        const { target } = event;
        this.setState({[target.name]: target.value });
      };

    handleFormSubmit = (event) => {
        event.preventDefault();
    // not yet done    
       const {req_title,req_description,req_quantity,req_duration_date,req_duration_time,req_location,req_image} = this.state;

       console.log(req_title)
       console.log(req_description)
       console.log(req_quantity)
       console.log(req_duration_date)
       console.log(req_duration_time)
       console.log(req_location)
       console.log(req_image)

       this.setState(INITIAL_STATE)

      };  

    showPostButton = () => {
        
        const formModal = document.getElementById("postModal");
        formModal.style.display = 'none';
        
        const postButtonContainer = document.getElementById('post-button-container');
        postButtonContainer.style.display = 'block';

        if(this.state.isRequest){
            this.setState({isRequest:false})
            document.getElementById('request').checked = false;
            document.getElementById('request-span').style.backgroundColor = 'white';
        }

        if(this.state.isDonate){
            this.setState({isDonate:false})
            document.getElementById('donate').checked = false;
            document.getElementById('donate-span').style.backgroundColor = 'white';
        }
    }

    postTypeIdentifier = (event) => {
    
        const requestSpan = document.getElementById("request-span");
        const donateSpan = document.getElementById("donate-span");

        if(event.target.value === 'request' && !this.state.isRequest){

            this.setState({isRequest : true})
            this.setState({isDonate : false})
            requestSpan.style.backgroundColor = 'darkgray';
            donateSpan.style.backgroundColor = 'white';
        }

        else if(event.target.value === 'donate' && !this.state.isDonate){
            this.setState({isRequest : false})
            this.setState({isDonate : true})
            requestSpan.style.backgroundColor = 'white';
            donateSpan.style.backgroundColor = 'darkgray';
        }
    }

    render(){
        return(
            <div>
                <div id="postModal">
                    <div id="postContainer">
                    <div id="form-buttons">
                    <span id="closeBtn" onClick={this.showPostButton}>&#8592;</span>
                    <span id="postBtn"><button  type="submit" form="form-A">Add</button></span>
                    </div>
                    
                        <div id="postForm">
                            <form id="form-A" onSubmit={this.handleFormSubmit}>
                            
                                <div className="formType">
                                <input type="radio" id="request" name= "post" value="request" onClick={this.postTypeIdentifier}/>
                                <label htmlFor="request"><span id="request-span">Request</span></label>
                                <input type="radio" id="donate"  name= "post" value="donate"  onClick={this.postTypeIdentifier}/>
                                <label htmlFor="donate"><span id="donate-span">Donate</span></label>
                                </div>    
                                
                             {this.state.isRequest && <div id="requestForm">
                                    <div className="formInput">
                                    <label htmlFor="title">Title: </label>
                                    <input 
                                        id = "title" 
                                        placeholder="Item to request..."
                                        name = "req_title"
                                        onChange={this.handleInputChange}    
                                        />
                                    
                                    </div>

                                    <div className="formInput">
                                    <label htmlFor="description">Description: </label>
                                    <textarea 
                                        id = "description" 
                                        placeholder="Reason why you need it, include if it is in piece or pack..."
                                        name ="req_description"  
                                        onChange={this.handleInputChange}   
                                        />
                                    </div>

                                    <div className="formInput">
                                    <label htmlFor="quantity">Quantity: </label>
                                    <input 
                                        id = "quantity" 
                                        type="number" 
                                        placeholder="0"
                                        name = "req_quantity"   
                                        onChange={this.handleInputChange}  
                                        />
                                    </div>
                                    
                                    <div className="formInput">
                                    <label htmlFor="duration">Duration: </label>
                                    <input 
                                        id = "duration" 
                                        type="date"
                                        name="req_duration_date"
                                        onChange={this.handleInputChange} 
                                        /> <br/>
                                    <input 
                                        id = "time" 
                                        type="time" 
                                        name="req_duration_time"
                                        onChange={this.handleInputChange}     
                                        />
                                    </div>
                                    
                                    <div className="formInput">
                                    <label htmlFor="location">Location: </label>
                                    <input 
                                        id = "location"
                                        placeholder="Ph"
                                        name="req_location"
                                        onChange={this.handleInputChange}  
                                        />
                                    </div>

                                    <div className="formInput">
                                    <label htmlFor="image">Attach image: </label>
                                    <input 
                                        id = "image" 
                                        type="file" 
                                        multiple
                                        name="req_image"
                                        onChange={this.handleInputChange}     
                                        />
                                    </div>
                                </div>}
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostForm;