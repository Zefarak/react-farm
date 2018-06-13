import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'
import cookie from 'react-cookies'
import FarmInline from "./FarmInline";
import FarmCreate from "./FarmCreate";

class Farms extends React.Component {

    constructor(props) {
        super(props);
        this.togglePostListClass = this.togglePostListClass.bind(this);
        this.handleNewFarm = this.handleNewFarm.bind(this);
    }

    state = {
            posts: [],
            postsListClass: "card"
        };

    loadFarms() {
        const endpoint = '/api/farms/';
        let thisComp = this;
        let lookupOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }

        };

        fetch(endpoint, lookupOptions).
        then(function (response) {
            return response.json()
        }).then(function(responseData){
            console.log(responseData);
            thisComp.setState({
                posts: responseData
            })
        }).catch(function(error){
            console.log("error", error)
        })
    }

    createFarm() {
        const endpoint = '/api/farms/';
        const csrfToken = cookie.load('csrftoken');
        let thisComp = this;
        let data = {
              'active': true,
              'user':"",
              'area':"",
              'crops':""
        };
        if (csrfToken !== undefined){
            let lookupOptions = {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CRSFToken': csrfToken
                },
                body: JSON.stringify(data),
                credentials: 'include'
            }
        }

        fetch(endpoint, lookupOptions).
        then(function (response) {
            return response.json()
        }).then(function(responseData){
            console.log(responseData);
            thisComp.setState({
                posts: responseData
            })
        }).catch(function(error){
            console.log("error", error)
        })
    }

    handleNewFarm(postItemData) {
        console.log(postItemData);
        let currentPosts = this.state.posts;
        currentPosts.push(postItemData);
        this.setState({
            posts:currentPosts
        })
    }

    componentDidMount() {
        this.setState({
            posts: [],
            postsListClass: "card"
        });
        this.loadFarms()
    }

    togglePostListClass(event){
        event.preventDefault();
        let currentListClass = this.state.postsListClass;
        if (currentListClass === "") {
           this.setState({
               postsListClass: "card",
           })
        } else {
            this.setState({
                postsListClass: ""
            })
        }

    }


    render() {
        const {posts} = this.state;
        const {postListClass} = this.state;
        const csrfToken = cookie.load('csrftoken');
        return (
            <div>
                <h1>Hello Farm</h1>
                {(csrfToken !== undefined && csrfToken !== null) ?
                    <FarmCreate newFarmItemCreated={this.handleNewPost} />
                    : ""
                }
                <br /><br />
                <button onClick={this.togglePostListClass}>Toggle Class</button>
                {posts.length > 0 ? posts.map((postItem, index)=>{
                    return(
                        <FarmInline post={postItem} elClass="{postListClass}" />
                    )
                    }):<p>No posts Found</p>}
                <FarmInline title="'Test Title"/>
            </div>
        )
    }
}

export default Farms;