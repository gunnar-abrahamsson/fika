import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import Axios from 'axios';

function Cafees() {
    const [cafees, setCafees] = useState<JSX.Element[]>([]);
    const [isLoaded, setLoaded] = useState(false);

    useEffect(() => {
        const getCafees = async () => {
            interface AxiosResult{
                data: {
                    data: {name: string, id: number, city:string}[];
                }
            }
            const result: AxiosResult = await Axios('http://localhost:3001/api/cafees');

            //make li from cafe data
            const cafeLi: JSX.Element[] = result.data.data.map((cafee, index) => {
                return (
                    <li key={index}><Link to={`/cafees/${cafee.id}`}>{cafee.name} - {cafee.city}</Link></li>
                )
            })
            setCafees(cafeLi);
            setLoaded(true);
        }
        getCafees();
    }, [])

    const content = isLoaded 
        ?  
            <div>
                {cafees.length 
                    ?
                        <ul>
                            {cafees}
                        </ul>
                    : 
                    <p>Ledsen, det finns inga caféer för tillfället. Varför inte skapa den första?</p>
                }
            </div>
        :   <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>
    return(
        <div>
            <h1>Alla caféer</h1>
            {content}
            <div className="mt-4">
                <Link to="/cafees/create" className="btn btn-primary">Skapa nytt café</Link>
            </div>
        </div>
    )
}

export default Cafees;