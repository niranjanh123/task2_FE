import React, { Component } from "react";
import axios from "axios";
import './check.css'
export class check extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount = () => {
    this.dataRetrieve();
  };

  dataRetrieve = () => {
    axios
      .get("http://localhost:9000/sign-up/display")
      .then((response) => {
        const data = response.data;
        const posts = data.response.map((user) => {
          const newUser = {
            name: user.name,
            email: user.email,
          };
          return newUser;
        });
        this.setState({ posts });
        console.log("data Has Been recieved");
        console.log(posts);
      })
      .catch((err) => console.log("Error " + err));
  };

  displayPosts = (posts) => {
    if (!posts.length) return null;
    return posts.map((post, index) => (
      <div key={index} className='check_container'>
        <table className='content_table'>
        <tbody>
            <tr>
                <td>{post.name}</td>
                <td>{post.email}</td>
            </tr>
            </tbody>
        </table>
      </div>
    ));
  };
  render() {
    return (
        <div className='check'>
            <h1>List Of Users</h1>
            <div className='check_main'>
            <table className='main_table'>
            <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr> 
                    </tbody>  
            </table>    
                {this.displayPosts(this.state.posts)}
            </div>
            
        </div> );
  }
}

export default check;
