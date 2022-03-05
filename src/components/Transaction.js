import { Link } from "react-router-dom";
import CurrencyInput from "./CurrencyInput";
import AllUsersInput from "./AllUsers";
import React,{ useState, useEffect } from "react";
import axios from "axios";

const Editor = () => {

    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(2);
    const [currency1, setCurrency1] = useState("USD");
    const [currency2, setCurrency2] = useState("EUR");
    const [users, setUsers] = useState([]);
    const [rates, setRates] = useState([]);
    const[userValue, setUserValue] =  useState("Israel");
    // const [user, setUser]

    const config = {
        headers: {
            'auth-token' : localStorage.getItem('token'),
        }
    };

    const configTransactions = {
      headers: {
          "auth-token" : localStorage.getItem('token')
      }
  };

    useEffect(() => {

        axios
          .get(
            "https://api.fastforex.io//fetch-all?from=USD&api_key=5f6ab60ba9-d44a729976-r86raz"
          )
          .then((response) => {
            setRates(
              {
                "USD" : response.data.results.USD,
                "EUR" : response.data.results.EUR,
                "NGN" : response.data.results.NGN
              }
            )
          });
      }, []);

      useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        const getUser = async () => {
      
            const response = await axios.get(`http://localhost:8000/api/users`, config, {
                signal: controller.signal
            });

            console.log(response.data)
            isMounted && setUsers(response.data)
            console.log(response.data)
        }

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
        
      }, []);
      
    
      useEffect(() => {
        if(!!rates) {
          handleAmount1Change(amount1);
        }
      }, [rates]);
    
      function format(number) {
        return number.toFixed(4);
      }
    
      function handleAmount1Change(amount1) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setAmount1(amount1);
      }
    
      function handleCurrency1Change(currency1) {
        // setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setCurrency1(currency1);
      }
    
      function handleAmount2Change(amount2) {
        // setAmount2(format(amount2 * rates[currency1] / rates[currency2]));
        setAmount2(amount2);
      }
    
      function handleCurrency2Change(currency2) {
        setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
        setCurrency2(currency2);
      }

      // function handleUserChange() {
      //   console.log(userValue);
      // }

      const accessToken = localStorage.getItem('token');

      axios.interceptors.request.use(
        config => {
          config.headers["auth-token"] = accessToken;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      )

        const SendingMoney = async (res) => {
          await axios.post(`http://localhost:8000/api/transaction`, {
            Receiver : userValue,
            SendingAmount : amount1,
            ConvertedAmount : amount2,
            SendingCurrency : currency1,
            ReceivingCurrency : currency2
          }).catch(function (error) {
            // if (error.response.status == 400) {
            //   alert(error.response.data.message);
            //   console.log(error.response.status);
            //   console.log(error.response.headers);
            // }
          });
          // console.log("Data to be sent -------->>>>>>>>",response);
          // console.log("Configaration Route ------->>>>>>>", config);
        }
    
      return (
        <section>
    
          <h1>Currency Converter</h1>

          <br />

          <h4>From</h4>
    
          <CurrencyInput
            onAmountChange={handleAmount1Change}
            onCurrencyChange = {handleCurrency1Change}
            currencies={Object.keys(rates)}
            amount={amount1}
            currency={currency1}
          />

          <br/>

          <h4>To</h4>

    
          <CurrencyInput
            onAmountChange = {handleAmount2Change}
            onCurrencyChange = {handleCurrency2Change}
            currencies={Object.keys(rates)}
            amount={amount2}
            currency={currency2}
          />

          <h4>Choose a User to send money to</h4>
          <AllUsersInput
              users = {users}
              onUserChange = {(value) => setUserValue(value)} 
          />
         
         {/*  <article>
              <h2>Users List</h2>
                {users?.length
                    ? (
                        <ul>
                            {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                        </ul>
                    ) : <p>No users to display</p>
                }
              </article> */}

            <div className="flexGrow">
            <Link to="/linkpage">
               <button onClick={SendingMoney}>
                  Send
               </button>
            </Link>
            </div>
    
        </section>
      );

    // return (
    //     <section>
    //         <h1>Editors Page</h1>
    //         <br />
    //         <p>You must have been assigned an Editor role.</p>
    //         <div className="flexGrow">
    //             <Link to="/">Home</Link>
    //         </div>
    //     </section>
    // )
}

export default Editor