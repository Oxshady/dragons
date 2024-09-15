import React from 'react'
import Details from '../component/moves/Details';

function MovieDetailPage() {
  return (
     <Details />
  )
}

export default MovieDetailPage


export async function loader({ request, params }) {
    const id = params.movieId;
    console.log("id",id)
    console.log("params", request)
  
    const response = await fetch('http://127.0.0.1:5000/api/details/'+ id, {
      credentials: 'include'
    });
      
  
    if (!response.ok) {
      throw json(
        { message: 'Could not fetch details for selected event.' },
        {
          status: 500,
        }
      );
    } else {
        const data = await response.json();
        console.log("data",data)
      return data;
    }
  }