import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


class BlogDetail extends Component {
   
    constructor(props){
        super(props);
        
         

        this.state = {
            currentId : this.props.theParams.slug,
            blogItem:{}
        }
    }

    getBlogItem(){
        axios.get(`https://manuelll.devcamp.space/portfolio/portfolio_blogs/
        ${this.state.currentId}`
        )
        .then(response => {
            console.log("getBlogItem error", response);
            this.setState({
                blogItem: response.data.portfolio_blog
            })
        })
        .catch(error => {
            console.log("getBlogItem error" , error)
        })
    }

    componentDidMount(){
        this.getBlogItem();
    }

    render() {
        
        const{
            title,
            content,
            feature_image_url,
            blog_status

        }=this.state.blogItem
        return (
            <div className='blog-container'>
                <div className='content-container'>
                    <h1>{title}</h1>

                    <div className='featured-image-wrapper'> 
                        <img alt='' src= "feature_image_url" />
                    </div>

                    <div className='content'>{content}</div>
                </div>
            </div>
        );
    }
}

export default BlogDetail;

