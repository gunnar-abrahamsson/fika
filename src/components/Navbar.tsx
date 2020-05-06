import React from 'react';
import { NavLink, Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Fikasugen?</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" exact to="/">Home</NavLink>
                    <NavLink className="nav-item nav-link" to="/cafees">Cafees</NavLink>
                    <NavLink className="nav-item nav-link" to="/owners">Owners</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;