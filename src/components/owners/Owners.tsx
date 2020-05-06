import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'
function Owners() {
    interface AxiosOwners{
        data: {
            data: {
                id: number,
                first_name: string,
                last_name: string,
                email: string,
                phone: string,
            }[]
        }
    }
    const [owners, setOwners] = useState<AxiosOwners["data"]["data"]>([])
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const getOwners = async () => {
            try {
                const result: AxiosOwners = await Axios.get('http://localhost:3001/api/owners');
                setOwners(result.data.data)

            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        getOwners();
    }, [])
    return (
        !loading
            ?   <ul>
                    {owners.map((owner, index) => {
                        return ( 
                            <li key={index}>
                                <Link to={`/owners/${owner.id}`}>{owner.first_name} {owner.last_name}</Link>
                            </li>
                        );
                    })}
                </ul>
            :   <div className="spinner-border text-info" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
    )
}

export default Owners;