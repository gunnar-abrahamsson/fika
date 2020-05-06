import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function EditCafe() {
    const history = useHistory();
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
    const [cafe, setCafe] = useState<false | AxiosResult["data"]["data"]>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCafe = async () => {
            try {
                const result: AxiosResult = await Axios(`http://localhost:3001/api/cafees/${cafeId}`);
                setCafe(result.data.data);

            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
        getCafe();
    }, [cafeId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cafeWithNewValue: any = {
            ...cafe, 
            [e.target.id]: e.target.value
        }

        setCafe(cafeWithNewValue)
    }

    const updateCafe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await Axios.put(`http://localhost:3001/api/cafees/${cafeId}`, cafe);
        history.push(`/cafees/${cafeId}`)
    }
    
    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            await Axios.delete(`http://localhost:3001/api/cafees/${cafeId}`)
            history.push(`/cafees/`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {!loading
            ? 
                cafe 
                ? 
                <div>
                    <div className="mt-4 d-flex justify-content-between">
                        <Link to={`/cafees/${cafeId}`} className="btn btn-secondary" title="Its a feature">Tillbaka till caféet</Link>
                        <form onSubmit={handleDelete}>
                            <button type="submit" className="btn btn-danger"id="deleteCafee"> Radera {cafe.name}</button>
                        </form>
                    </div>
                    <h1>Redigera café</h1>
                    <form onSubmit={updateCafe}>
                        <div className="form-group">
                            <label htmlFor="name">Namn</label>
                            <input type="text" className="form-control" onChange={handleChange} id="name" name="name" value={cafe.name} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Adress</label>
                            <input type="text" className="form-control" onChange={handleChange} id="adress" name="adress" value={cafe.adress} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Ort</label>
                            <input type="text" className="form-control" onChange={handleChange} id="city" name="city" value={cafe.city} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="owner_id">Lägg till ägare</label>
                            <select className="form-control" id="owner_id" name="owner_id">
                                <option value="">Okänd ägare</option>
                                {cafe.owner
                                ? <option defaultValue={cafe.owner.id}>{cafe.owner.first_name} {cafe.owner.last_name}</option>
                                : <option defaultValue="">Okänd ägare</option> 
                                }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Spara</button>
                    </form>
                </div>
                : 
                    <div>
                        <p>Ledsen, det där caféet kunde inte hittas. Försöker du haxxa oss? <span role="img" aria-label="Arg smiley">🤬</span></p>
                        <a href="/cafees" className="btn btn-secondary">Tillbaka till alla caféer</a>
                    </div>                            

            :   <div className="spinner-border text-info" role="status">
                    <span className="sr-only">Loading...</span>
                    <Link to="/cafees" className="btn btn-secondary" title="Its a feature">Tillbaka till alla caféer</Link>
                </div>}
        </div>
    )
}

export default EditCafe;