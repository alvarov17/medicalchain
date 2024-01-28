  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, connectAuthEmulator, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
  /*
  import { 
    hideLoginError, 
    showLoginState, 
    showLoginForm, 
    showApp, 
    showLoginError, 
    btnLogin,
    btnSignup,
    btnLogout
  } from './ui'
  */
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const firebaseConfig = {
    apiKey: "AIzaSyDLuMLg29WIj1ikk7qp_1GzBYW6XVl5YCg",
    authDomain: "irvinehackproject.firebaseapp.com",
    databaseURL: "https://irvinehackproject-default-rtdb.firebaseio.com",
    projectId: "irvinehackproject",
    storageBucket: "irvinehackproject.appspot.com",
    messagingSenderId: "824047788753",
    appId: "1:824047788753:web:f2ac8e701bd0d4ab411bf0",
    measurementId: "G-N8S5DJRWJ1"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase();
auth.languageCode = "en"
const provider = new GoogleAuthProvider();


const test = document.getElementById("form1");
  test.addEventListener("submit", function(e) {
    e.preventDefault()
  });

const register = document.getElementById("register-btn");
  register.addEventListener("click", function() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('something')
      set(ref(database, 'users/' + user.uid), {
        email: email,
        password: password
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  });

  const login = document.getElementById("login-btn");
  login.addEventListener("click", function() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        email: email,
        password: password
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  });

document.addEventListener("DOMContentLoaded", function() {
  const googleLogin = document.getElementById("google-login-btn");
  googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;
      const user = result.user;
      
      set(ref(database, 'users/' + user.uid), {
        email: email,
        password: password
      });
      
      window.location.href = "http://127.0.0.1:5000/home";
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  
    });
});

