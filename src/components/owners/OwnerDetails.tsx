import React from 'react'

interface props {
        owner: {
            owner: {
                id: number,
                first_name: string,
                last_name: string,
                email: string,
                phone: string,
            }
        }
}

export default function OwnerDetails(props: any) {
    const { email, first_name, last_name, phone}: props["owner"]["owner"] = props.owner.owner
    return (
        <div>
            <h1>{last_name} {first_name}</h1>
	        <h2>{email} {phone}</h2>
        </div>
    )
}
