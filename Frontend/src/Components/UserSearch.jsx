import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Avatar, Input } from '@material-tailwind/react';
import { BiSolidSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';

// Debounce function to limit the number of API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
const UserSearch = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const fetchUsers =(searchQuery) => {
      try {
        setLoading(true);
        axios.post(`/api/v1/users/search`, {query: searchQuery})
        .then(res=>{
          setUsers(res.data.data);
          setLoading(false);
        })
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    function handleSearchbar(){
      setUsers([])
    }
  
    // Debounced version of fetchUsers
    const debouncedFetchUsers = useCallback(debounce(fetchUsers, 300), []);
  
    useEffect(() => {
      if (query) {
        debouncedFetchUsers(query);
      } else {
        setUsers([]);
      }
    }, [query, debouncedFetchUsers]);
  
    return (
      <div>
        <div  className='flex bg-gray-5 items-center'>
          <BiSolidSearch className='text-3xl text-gray-3 mx-2'/>
          <input
            type="text"
            placeholder='Search user'
            className='w-[20rem] text-gray-6 p-2 rounded-sm outline-0'
            label="Search users"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        <div className={`absolute ${users.length>0?"block":"hidden"} bg-gray-6 text-gray-5 w-[23rem] z-10`}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className='divide-y divide-2 divide-gray-4 p-5 py-2'>
            {users&& users.map((user) => (
              <Link to={`/:${user.userName}`} onClick={handleSearchbar}><div className='flex gap-4 py-2 items-center'>
                <Avatar size='sm' src={user.avatar}/>
                <div>
                  <li key={user._id} className='text-sm font-bold tracking-wider'>{user.fullName}</li>
                  <li key={user._id} className='text-xs tracking-wider'>@{user.userName}</li>
                </div>
              </div></Link>
            ))}
          </ul>
        )}
      </div>
        </div>
        
    );
  };
  
  export default UserSearch;