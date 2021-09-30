import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Navbar</Link>
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                      <Link to="/" className="nav-link active">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/add_pet" className="nav-link">Add Pet</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/about" className="nav-link">About</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="" className="nav-link disabled" tabIndex="-1" aria-disabled="true">Disabled</Link>
                    </li>
                </ul>
            </nav>
        
        )
    }
}
