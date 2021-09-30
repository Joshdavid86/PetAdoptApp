import React from 'react';
import {  BrowserRouter as Router, Route, } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ListPets from "./components/list-pets.component";
import NewPet from "./components/new-pet.component";
//import EditPet from "./components/edit-pet.component";
//import DeletePet from "./components/delete-pet.component";
import About from "./components/about.component";


function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <div className="container">
      <Route path="/" exact component={ListPets} />
      <Route path="/add_pet" exact component={NewPet} />
      <Route path="/about" exact component={About} />
      </div>
    </Router>

  );
}
      

export default App;

      
//<Route path="/update_pet" exact component={EditPet} />
//<Route path="/delete_pet" exact component={DeletePet} />

