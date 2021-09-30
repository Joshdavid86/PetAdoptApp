import React, { Component } from 'react';
import axios from 'axios';

export default class NewPet extends Component {
    constructor(props) {
        super(props);

        this.onChangeSpecies = this.onChangeSpecies.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            species: '',
            name: '',
            age: '',
            petImage: ''
        }
    }

    onChangeSpecies(e) {
        this.setState({
            species: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }

    onChangeImage(e) {
        this.setState({
            petImage: e.target.value
        
        });
    }

    onSubmit(e) {
        e.preventDefault();
        

        const pet = {
            species: this.state.species,
            name: this.state.name,
            age: this.state.age,
            petImage: this.state.petImage
        }
        
        console.log(pet);

        axios.post('http://localhost:5000/add_pet', pet ) 
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
        //window.location = "/";
    }
    

    render() {
        return (
            <div>
                <h3>Add a Pet for Adoption</h3>
                <form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label>Species:</label>
                        <input
                        type="text"
                        className="form-control"
                        value={this.state.species}
                        onChange={this.onChangeSpecies}
                        />
                     
                    </div>
                    <div className="form-group">
                      <label>Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Age:</label>
                        <input
                        type="text"
                        className="form-control"
                        value={this.state.age}
                        onChange={this.onChangeAge}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input
                        type="file"
                        className="form-control-file"
                        value={this.state.petImage}
                        onChange={this.onChangeImage}
                        />
                    </div>
                        
                    <input type="submit" value="Add New Pet" className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}
        
                        

                        
    
                        
                        
                        
                        
                    
                
