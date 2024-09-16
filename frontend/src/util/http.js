import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function NewUser({ name, email, password }) {

  
  try {
    const response = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include'  // Ensure cookies are included in requests
    });
     

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error || 'Unknown error');
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
 

export async function fetchUsers(data, dispatch) {
  
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'  // Ensure cookies are included in requests
      });
  
      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || 'Unknown error');
      }
       
      
      const responseData = await response.json();
      
      // Store user_id in local storage
      if (responseData.user_id) {
       
        // localStorage.setItem('user_id', responseData.user_id);
        dispatch(setUserId(responseData.user_id));
      }
      
      // Return the relevant data (excluding user_id if needed)
      return responseData;
  
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
}

  export async function logoutUser() {
    const response = await fetch('http://127.0.0.1:5000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensure cookies are sent with the request
    });
   
  
    if (!response.ok) {
      throw new Error('Logout failed');
    }
  }