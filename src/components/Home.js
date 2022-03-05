import { useNavigate, Link, useLocation } from "react-router-dom";
import { useContext, Component, useRef, useState, useEffect  } from "react";
import AuthContext from "../context/AuthProvide";
import React from 'react';
import axios from 'axios';

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const userRef = useRef();
    const [users, setUsers] = useState('');
    const [usd, setUsd] = useState('');
    const [eur, setEur] = useState('');
    const [ngn, setNgn] = useState('');
    // const axiosPrivate = useAxiosPrivate();
    const location = useLocation();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        localStorage.clear();
        navigate('/login');
    }

    const config = {
        headers: {
            'auth-token' : localStorage.getItem('token'),
        }
    };

    useEffect(() => {
            let isMounted = true;
            const controller = new AbortController();

        const getUser = async () => {
            const response = await axios.get(`http://localhost:8000/api/profile`, config, {
                                signal: controller.signal
                            });

            console.log(response.data)
            isMounted && setUsers(response.data.username)
            isMounted && setUsd(response.data.USD)
            isMounted && setEur(response.data.EUR)
            isMounted && setNgn(response.data.NGN)
            


        }

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     const getUsers = async () => {
    //         try {
    //             const response = await axios.get('https://simba-challenge-backend.herokuapp.com/api/profile', config, {
    //                 signal: controller.signal
    //             });
    //             console.log(response.data);
    //             isMounted && setUsers(response.data);
    //         } catch (err) {
    //             console.error(err);
    //             navigate('/login', { state: { from: location }, replace: true });
    //         }
    //     }

    //     getUsers();

    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     }
    // }, [])

    // return (
    //     <article>
    //         <h2>Users List</h2>
    //         {users?.length
    //             ? (
    //                 <ul>
    //                     {users.map((user, i) => <li key={i}>{user?.username}</li>)}
    //                 </ul>
    //             ) : <p>No users to display</p>
    //         }
    //     </article>
    // );

    return (
        <section>
            <h1>Home</h1>
            <br />
            <h4>
            Welcome, {users} :)
            </h4> 

            <br />
            
            <table>
            <thead>
            <th>USD</th>
            <th>EUR</th>
            <th>NGN</th>
            </thead>
            <tbody>
            <tr>
            <td>{usd}</td>
            <td>{eur}</td>
            <td>{ngn}</td>
            </tr>
            </tbody>
            </table>
            <br />
            <Link to="/transactions">Make a transaction</Link>
            <Link to="/linkpage">Check your history</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home