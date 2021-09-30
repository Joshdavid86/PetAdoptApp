import React, { Component } from 'react';
import axios from 'axios';

export default class ListPets extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          pets: [],
          isLoaded: false,
        }
          
    }

          


    componentDidMount = () => {
      this.getPets();
  };    
      
    
 getPets = async () => {  
    const res = await axios.get('http://localhost:5000/pets');
    const data = res.data;
    this.setState({ isLoaded: true, pets: data });
    console.log('Data has been received!');
    console.log(data)
    return data
    
}



render() {
console.log('State: ', this.state);

const { isLoaded,   } = this.state;

if (!isLoaded) {
  return <div>Loading...</div>;
}

else {
  
  return (
    <div>
   
    </div>
    );
}

  }
}
