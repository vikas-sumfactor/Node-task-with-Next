
import styles from "../styles/login.module.css"
 const Login = () => {
  return (
    <div className={styles.container}>
    <div className={styles.containerWrapper} >
        
   First Name : <input  placeholder="enter your first name"/>

   Last Name :  <input  placeholder="enter your last name"/>

   Email : <input  placeholder="enter your email address"/>

   
   Password :  <input  placeholder="set your password"/>

    Confirm Password :  <input  placeholder="confirm your password"/>

    <button>Sign Up</button>

    </div>
    </div>
  );
}


export default Login;