import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
    return (
        <div className="container">
            <div className="content text-center my-4">
                <h1 className="mb-5">Fika-sugen?</h1>

                <p className="display-3">
                    <span role="img" aria-label="Kaffe">☕️</span>
                    <span role="img" aria-label="Te">🍵</span>
                    <span role="img" aria-label="Kringla">🥨</span>
                    <span role="img" aria-label="Cupcake">🧁</span>
                    <span role="img" aria-label="Munk">🍩</span>
                    <span role="img" aria-label="Kaka">🍪</span>
                    <span role="img" aria-label="P smiley">😋</span>
                </p>

                <p className="display-2">
                    <Link to="/cafees/">Kolla in alla caféer</Link>
                </p>
            </div>
        </div>
    )
}

export default Main;