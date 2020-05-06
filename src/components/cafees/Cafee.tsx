import React, { useEffect, useState} from 'react';
import { Link, useParams} from 'react-router-dom';
import Axios from 'axios'

function Cafee() {
    interface AxiosResult {
        data: {
            data: {
                name: string, 
                id: number, 
                city: string,  
                adress: string,
                owner: false | {
                    first_name: string,
                    last_name: string,
                    email: string,
                    phone: string,
                    id: number
                }
                categories: {
                    id: number,
                    name: string
                }[]
            }
        }
    }
    const { cafeId } = useParams();
    const [cafe, setCafe] = useState<AxiosResult["data"]["data"][]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCafe = async () => {

            try{
                const result: AxiosResult = await Axios(`http://localhost:3001/api/cafees/${cafeId}`);
                setCafe([result.data.data]);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }
        getCafe();
    }, [cafeId])
    return (
        <div>
            {/* Render cafee depending on if its loading or not */}
            {!loading 
            ?   
                cafe.length 
                ?   
                    cafe.map((cafe: AxiosResult["data"]["data"], index) => {
                        return (
                            <div key={index}>
                                <div className="mb-3">
                                    <Link to={`/cafees/${cafeId}/edit`} className="btn btn-primary">Redigera café</Link>
                                </div>
                                <h1>{cafe.name}</h1>
                                <h2>{cafe.adress}, {cafe.city}</h2>

                                {cafe.categories.length 
                                ?   
                                    cafe.categories.map((category, index) => {
                                        return <Link key={index} to={`/categories/${category.id}`} className="badge badge-pill badge-light mx-1">{category.name}</Link>
                                    })
                                : ''
                                }
                                {cafe.owner
                                ?   <div>
                                        <h1 className="mt-3">Ägare</h1>
                                        <h2>{cafe.owner.first_name} {cafe.owner.last_name}</h2>     
                                    </div>
                                : ''}
                            </div>
                        )
                    })
                :   
                    <p>Ledsen, det där caféet kunde inte hittas.</p>
            :   
                <div className="spinner-border text-info" role="status">
                    <span className="sr-only">Loading...</span>
                </div>}

            {/* Static */}
            <div className="mt-4 d-flex justify-content-between">
                <Link to="/cafees/" className="btn btn-secondary">Tillbaka till caféerna</Link>
                {cafe.length
                ? cafe.map((cafe, index) => {
                    return cafe.owner 
                    ? <Link key={index} to={`/owners/${cafe.owner.id}`} className="btn btn-secondary">Till ägaren</Link>
                    : ''
                }) 
                : ''}
            </div> 
        </div>
    );
}

export default Cafee