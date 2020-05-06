import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

const CreateCafe = () => {
    const history = useHistory();

    const [cafe, setCafe] = useState({
        name: '',
        adress: '',
        city: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cafeWithNewValue = {
            ...cafe,
            [e.target.id]: e.target.value,
        }

        setCafe(cafeWithNewValue)
    }

    const createCafe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        interface axiosResponse {
            data: {
                id: number,
                name: string,
                city: string,
                adress: string,
                owner_id: null | number
            }
        }

        try{
            const response: axiosResponse = await Axios.post('http://localhost:3001/api/cafees/', cafe);
            console.log(response);
            history.push(`/cafees/${response.data.id}`);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Hello create</h1>

            <form onSubmit={createCafe}>
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

                        <button type="submit" className="btn btn-primary">Skapa cafe</button>
                    </form>

            <Link to="/cafees/" className="btn btn-secondary">Tillbaka till caféerna</Link>
        </div>
    )
}

export default CreateCafe;