import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function NewUser({ first_name, last_name, phoneNumber, address,email, password }) {

  
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ first_name, last_name,phoneNumber, address, email, password }),
      credentials: 'include'  // Ensure cookies are included in requests
    });
     

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error || 'Unknown error');
    }
    
    const data = await response.json();
    console.log("signup data",data);
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function fetchUsers(data, dispatch) {
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/login', {
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
      console.log('login responese', responseData)
      
      // Store user_id in local storage
      if (responseData.user_id) {
       
        localStorage.setItem('user_id', responseData.user_id);
        // dispatch(setUserId(responseData.user_id));
      }
      
      // Return the relevant data (excluding user_id if needed)
      return responseData;
  
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
}

  export async function logoutUser() {
    const response = await fetch('http://127.0.0.1:5000/api/v1/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensure cookies are sent with the request
    });
    
    console.log('logout response',response)
    if (!response.ok) {
      throw new Error('Logout failed');
    }
  }