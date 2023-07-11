// import error from 'next/error';
// import input from 'postcss/lib/input';
import React, { useState } from 'react';
import styles from "./SignupForm.module.css"
import { useRouter } from 'next/router';

const SignupForm = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

 

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    
     const data = {
        fname,
        lname,
        email,
        password,
       
      };
    try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        // console.log({response});

        if (response.ok) {
           console.log('successfully registered');
         } else {
           console.log('user is already registered please trylogin');
         }
      } catch (error) {
        console.error('error in register', error);
       }
    // console.log(fname, lname, email, password);
  };

  return (
    <div className={styles.body}>
      <h1> Sign Up Form</h1>
    <form onSubmit={handleSubmit} className={styles.container}>
   
      <div>
        <label htmlFor="fname">First Name:</label>
        <input
        placeholder='enter your first name'
          type="text"
          id="fname"
          value={fname}
          onChange={(e) => setFname(e.target.value)} />
     </div> 
     <br></br>
     <br></br>
      <div>
        <label htmlFor="lname">Last Name:</label>
        <input
        placeholder='enter your last name'
          type="text"
          id="lname"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <br></br>
      <br></br>
      <div>
        <label htmlFor="email">Email:</label>
        <input
        placeholder='enter email as per your choice'
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <br></br>
      <br></br>
      <div>
        <label htmlFor="password">Password:</label>
        <input
        placeholder='what password you want to set'
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br></br>
      <br></br>
      
      <button type="submit" className={styles.btn}>Sign Up</button>
      <br /> <br />

      <button type="button" className={styles.btn} onClick={() => router.push('/signin')}>Already have account</button>


    </form>
    </div>
    
  );
};

export default SignupForm;