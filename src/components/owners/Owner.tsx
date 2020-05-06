import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import OwnerDetails from './OwnerDetails'
import Axios from 'axios'
function Owner() {
    interface AxiosOwners{
        data: {
            data: false | {
                id: number,
                first_name: string,
                last_name: string,
                email: string,
                phone: string,
            }
        }
    }
    const { ownerId } = useParams();
    const [owner, setOwner] = useState<AxiosOwners["data"]["data"]>(false)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const getOwners = async () => {
            try {
                const result: AxiosOwners = await Axios.get(`http://localhost:3001/api/owners/${ownerId}`);
                setOwner(result.data.data)

            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        getOwners();
    }, [ownerId])
    return (

        <div>
            {!loading
                ?   owner 
                    ? <OwnerDetails owner={owner} />
                    : <div>Det finns ingen ägare med id: {ownerId}</div>
                :   <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>}
            <div className="mt-4">
	            <Link to="/owners/" className="btn btn-secondary">Tillbaka till alla ägare</Link>
            </div>
        </div>
    )
}

export default Owner;