import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendEmailVerification,
} from "firebase/auth";

import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  onValue,
  remove
} from "firebase/database";

import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";

import { getFunctions, httpsCallable } from "firebase/functions"


const firebaseConfig = {
  apiKey: "AIzaSyAW1BWonDNfc-aRwaVIqwQ86gCaAjK94SA",
  authDomain: "dissertacao-bitalino.firebaseapp.com",
  databaseURL: "https://dissertacao-bitalino-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "dissertacao-bitalino",
  storageBucket: "dissertacao-bitalino.appspot.com",
  messagingSenderId: "863583415061",
  appId: "1:863583415061:web:8d19a8e819110b9b85971c",
  measurementId: "G-9QTNPYXBEW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);


const logInWithEmailAndPassword = async (email, password) => {
  const loginErrorPassword = document.getElementById("login-error-password");
  const loginErrorEmail = document.getElementById("login-error-email");

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    if (
      err.code === "auth/user-not-found" ||
      err.code === "auth/invalid-email"
    ) {
      //user not found or invalid email errors
      loginErrorPassword.style.display = "block";
      loginErrorEmail.style.display = "block";
      loginErrorPassword.innerHTML = "Password e/ou e-mail inválidos";
      //loginErrorEmail.innerHTML = 'E-mail inválido'

      if (err.code === "auth/user-not-found") {
        loginErrorEmail.innerHTML = "Utilizador não encontrado";
      }
    } else if (err.code === "auth/wrong-password") {
      //wrong password error
      loginErrorPassword.style.display = "block";
      loginErrorPassword.innerHTML = "Password e/ou e-mail inválidos";
    } else if (err.code === "auth/internal-error") {
      //internal error error: happens when password field is left blank
      loginErrorPassword.style.display = "block";
      loginErrorPassword.innerHTML = "Password e/ou e-mail inválidos";
    } else {
      //outros erros
      console.log(err.message);
    }
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  const registerErrorEmail = document.getElementById("login-error-email");
  const registerErrorPassword = document.getElementById("login-error-password");

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const db = getDatabase();
    const user = res.user;
    sendEmailVerification(user);
    await set(ref(db, "users/" + user.uid), {
      uid: user.uid,
      name: name,
      email: user.email,
      authProvider: "local",
      createdAt: Date.now(),
      role: "leader",
      activation: getRndInteger(111111, 999999),
      licensekey: "desativada",
      address: "",
      phone: "",
      NIF: "",
      emailverification : "false",
    });

    window.location.href = '/SignupEmail';
  } catch (err) {
    console.error(err);
    if (err.code === "auth/invalid-email") {
      //invalid email error
      registerErrorEmail.style.display = "block";
      registerErrorEmail.innerHTML = "E-mail inválido";
    } else if (err.code === "auth/wrong-password") {
      //wrong password error
      registerErrorPassword.style.display = "block";
      registerErrorEmail.style.display = "none";
      registerErrorPassword.innerHTML = "Password inválida";
    } else if (err.code === "auth/internal-error") {
      //internal error error: seemingly happens when password field is left blank
      registerErrorPassword.style.display = "block";
      registerErrorPassword.innerHTML = "Password e/ou e-mail inválidos";
      registerErrorEmail.style.display = "none";
    } else if (err.code === "auth/weak-password") {
      //weak password error
      registerErrorPassword.style.display = "block";
      registerErrorPassword.innerHTML =
        "Password demasiado fraca, são necessários no mínimo 6 caráteres";
    } else if (err.code === "auth/missing-email") {
      //mising e-mail error
      registerErrorEmail.style.display = "block";
      registerErrorEmail.innerHTML = "E-mail inválido";
    } else if (err.code === "auth/email-already-in-use") {
      //mising e-mail error
      registerErrorEmail.style.display = "block";
      registerErrorEmail.innerHTML = "E-mail em utilização";
    } else {
      //other errors
      registerErrorPassword.display = "none";
      registerErrorEmail.display = "none";
      console.log(err.message);
    }
  }
};

const registerUserWithEmailAndPassword = async (uid, name, email, password) => {
  const registerErrorEmail = document.getElementById("login-error-email");
  const registerErrorPassword = document.getElementById("login-error-password");

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
    const auth2 = getAuth(app);
    const currentemail = window.prompt("Enter your email:");
    const currentpassword = window.prompt("Enter your password:");
    await signInWithEmailAndPassword(auth2, currentemail, currentpassword)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log("User signed in successfully:", user);
      })
      .catch((error) => {
        // Sign in failed
        console.error("Error signing in:", error);
      });

    const db = getDatabase();
    const user = res.user;
    await set(ref(db, "users/" + user.uid), {
      uid: user.uid,
      leaderid: uid,
      name: name,
      email: user.email,
      authProvider: "local",
      createdAt: Date.now(),
      role: "standard",
      activation: getRndInteger(111111, 999999),
      licensekey: "ativada",
      address:"",
      phone:"",
      NIF:"",
      emailverification: "true"   
    });
    
    await set(ref(db, "users/" + uid + "/createdusers/" + user.uid ),{
      user_uid: user.uid,
      user_name: name,
      user_email: user.email,
    });

  } catch (err) {
    console.error(err);
    if (err.code === "auth/invalid-email") {
      //invalid email error
      registerErrorEmail.style.display = "block";
      registerErrorEmail.innerHTML = "E-mail inválido";
    } else if (err.code === "auth/wrong-password") {
      //wrong password error
      registerErrorPassword.style.display = "block";
      registerErrorEmail.style.display = "none";
      registerErrorPassword.innerHTML = "Password inválida";
    } else if (err.code === "auth/internal-error") {
      //internal error error: seemingly happens when password field is left blank
      registerErrorPassword.style.display = "block";
      registerErrorPassword.innerHTML = "Password e/ou e-mail inválidos";
      registerErrorEmail.style.display = "none";
    } else if (err.code === "auth/weak-password") {
      //weak password error
      registerErrorPassword.style.display = "block";
      registerErrorPassword.innerHTML =
        "Password demasiado fraca, são necessários no mínimo 6 caráteres";
    } else if (err.code === "auth/missing-email") {
      //mising e-mail error
      registerErrorEmail.style.display = "block";
      registerErrorEmail.innerHTML = "E-mail inválido";
    } else if (err.code === "auth/email-already-in-use") {
      //mising e-mail error
      registerErrorEmail.style.display = "block";
      registerErrorEmail.innerHTML = "E-mail em utilização";
    } else {
      //other errors
      registerErrorPassword.display = "none";
      registerErrorEmail.display = "none";
      console.log(err.message);
    }
  }
};

const sendPasswordReset = async (email) => {
  const resetErrorEmail = document.getElementById("login-error-email");

  try {
    await sendPasswordResetEmail(auth, email);
    resetErrorEmail.style.opacity = 1;
    resetErrorEmail.style.color = "green";
    resetErrorEmail.innerHTML =
      "E-mail de recuperação de palavra-passe enviado";
    //alert("Password reset email sent"); //email sent
  } catch (err) {
    console.error(err);
    resetErrorEmail.style.color = "#bd0505";
    if (
      err.code === "auth/invalid-email" ||
      err.code === "auth/missing-email"
    ) {
      //invalid or missing email errors
      resetErrorEmail.style.opacity = 1;
      resetErrorEmail.innerHTML = "E-mail inválido";
    } else if (err.code === "auth/user-not-found") {
      //user not found
      resetErrorEmail.style.opacity = 1;
      resetErrorEmail.innerHTML = "Utilizador não encontrado";
    } else {
      //other errors
      resetErrorEmail.style.opacity = 0;
      alert(err.message); //Popup básico de erro
    }
  }
};

const logout = () => {
  signOut(auth);
};

async function getallUsers(uid) {
  var datab = ""; //initialize datab
  var userrole = "";
  var dataown = "";

  const dbRef = ref(getDatabase());
  await get(child(dbRef, `users/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        datab = snapshot.val(); //all user data
        console.log(datab);
        userrole = snapshot.child(uid + "/role").val(); //check role of this user
        dataown = snapshot.child(uid).val();
        //console.log(userrole);
        //console.log(dataown);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  if (userrole === "admin") {
    //if this user is an admin, return all data
    return datab;
  }

  if (userrole === "standard") {
    return dataown; //if this user is a standard user, return his data only
  }

  if (userrole === "leader") {
    return false; //if this user is a leader, return his and his sub-users data
  }
}

const checkOTP = async (uid, input) => {
  const db = getDatabase();
  const OTPError = document.getElementById("otp-error");
  var useractivation = 0;

  const dbRef = ref(getDatabase());
  await get(child(dbRef, "users/" + uid + "/activation"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        useractivation = snapshot.val();
        console.log(snapshot.val());
        console.log(input);
        if (parseInt(input) === useractivation) {
          try {
            update(ref(db, "users/" + uid), {
              licensekey: "ativada",
            });
          } catch (err) {
            alert("ERROR");
            console.error(err);
          }
          //auth.licensekey = "ativada"
          window.location.href = '/dashboard';
        } else {
          OTPError.style.opacity = 1;
          OTPError.innerHTML = "A chave de ativação está incorreta";
          OTPError.style.color = "#FF9B91";
        }
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  //alert(useractivation);
};

const checklicense = async () => {
  const user = auth.currentUser;

  if (user) {
    const uid = user.uid;
    // use uid here

    const dbRef = ref(getDatabase());
    return get(child(dbRef, "users/" + uid + "/licensekey"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const licensekey = snapshot.val();
          console.log(snapshot.val());
          if (licensekey === "desativada") {
            //redirect to OTP would be nice
            return true;
          } else {
            return false;
          }
        } else {
          console.log("No data available");
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const NavName = async (uid) => {
  const db = getDatabase();

  const nameofuser = ref(db, "users/" + uid + "/name");
  onValue(
    nameofuser,
    (snapshot) => {
      document.getElementById("rightusername").innerHTML = snapshot.val(); //name right side
    },
    { onlyOnce: true }
  );
};

function CheckRole({ onIncrement, uid }) {
  var userrole = "";
  const dbRef = ref(getDatabase());
  get(child(dbRef, "users/" + uid + "/role")).then((snapshot) => {
    if (snapshot.exists()) {
      userrole = snapshot.val(); //check role of this user
      if (userrole === "admin") {
        return false;
      } else {
        return true;
      }
    }
  });
  //<button onClick={onIncrement}>Increment</button>
}

var getUserRole = async (uid) => {
  var userrole = "";
  const dbRef = ref(getDatabase());
  await get(child(dbRef, "users/" + uid + "/role")).then((snapshot) => {
    if (snapshot.exists()) {
      userrole = snapshot.val();
      if (userrole === "admin") {
        console.log(userrole);
        return "admin";
      }
      if (snapshot.val() === "standard") {
        return "standard";
      }
    }
  });
};

function getCurrentUserID(callback) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      callback(user.uid);
    } else {
      console.log("Não há");
      callback(null);
    }
  });
}

function AccountValues(callback) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const dbRef = ref(getDatabase());
      const userRef = child(dbRef, "users/" + user.uid);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const user = snapshot.val();
          callback(user);
        }
      });
    }
  });
}

function PatientValues(uid,callback) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const dbRef = ref(getDatabase());
      const userRef = child(dbRef, "users/" + uid);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const user = snapshot.val();
          callback(user);
        }
      });
    }
  });
}

function getCurrentUserRole(callback) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "users/" + user.uid + "/role")).then((snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.val());
        }
      });
    }
  });
}

function getCurrentUserName(callback) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, "users/" + user.uid + "/name")).then((snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot.val());
        }
      });
    }
  });
}

const registerDetails = async (uid, address, phone, NIF) => {
  try {
    const db = getDatabase();
    await update(ref(db, "users/" + uid), {
      address: address,
      phone: phone,
      NIF: NIF,
    });
  } catch (err) {
    console.error(err);
  }
};

function getDadosHistoricosEnergiaCelula(callback, userID, NomeEmpresa, NomeCelula) {
  const collectionRef = collection(firestore, 'DadosHistoricos');
  const q = query(collectionRef);
  console.log(NomeEmpresa)
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => {
      const data2 = doc.data().data2;
      const energiaW = data2 && data2[userID].data[NomeEmpresa][NomeCelula].CelulaData.ConsumoEnergia ? data2[userID].data[NomeEmpresa][NomeCelula].CelulaData.ConsumoEnergia  : null;
      const timestamp = new Date(+doc.id ).toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' });
      return {
        name: timestamp,
        Watts: energiaW,
      };
    });

    callback(data);
  });

  return unsubscribe;
}


function callCloudFunction(callback, userID, NomeEmpresa, NomeCelula) {
  const functions = getFunctions();
  const getDadosHistoricos = httpsCallable(functions, 'getDadosHistoricos');

  getDadosHistoricos({userID: userID, NomeEmpresa: NomeEmpresa, NomeCelula:NomeCelula }).then((result) => {
    callback(result.data);
  }).catch((error) => {
    console.error('Error calling Cloud Function:', error);
  });
}

function getCreatedUsers(uid) {
  return new Promise((resolve) => {
    const db = getDatabase();
    const leaderRef = ref(db, "users/" + uid + "/createdusers");
    onValue(leaderRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const users = Object.values(data);
        resolve(users);
      } else {
        resolve([]);
      }
    });
  });
}

const deleteUser = async (uid) => {
  const db = getDatabase();
  const snapshot = await get(ref(db, `users/${uid}`));
  const leaderid = snapshot.val().leaderid;

  // Delete user from Authentication

  // Delete user from Realtime Database
  await remove(ref(db, `users/${uid}`));
  await remove(ref(db, `users/${leaderid}/createdusers/${uid}`));
};

/* const deleteUser = async (uid) => {
  // Delete user from Authentication
  const functions = getFunctions();
  const deleteUserByUid = httpsCallable(functions, 'deleteUserByUid');
  deleteUserByUid({uid}).then(async (result) => {
      console.log('User successfully deleted');

      // Delete user from Realtime Database
      const db = getDatabase();
      const snapshot = await get(ref(db, `users/${uid}`));
      const leaderid = snapshot.val().leaderid;
      await remove(ref(db, `users/${uid}`));
      await remove(ref(db, `users/${leaderid}/createdusers/${uid}`));
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
    });
}; */

const updateRegistry = async (uid, name, address, phone, NIF) => {
  try {
    const db = getDatabase();
    //alert(NIF)
    await update(ref(db, "users/" + uid), {
      name: name,
      address: address,
      phone: phone,
      NIF: NIF,
    });
    return 1;
  } catch (err) {
    console.error(err);
    return 2;

  }
};

const verifyemail = async (uid) => {
  const db = getDatabase();
  await update(ref(db, "users/" + uid), 
            {
              emailverification: "true",
            });

      window.location.href = '/Signup2';
};

const checkemail = async () => {
  const user = auth.currentUser;

  if (user) {
    const uid = user.uid;
    // use uid here
    const dbRef = ref(getDatabase());
    return get(child(dbRef, "users/" + uid + "/emailverification"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const emailverification = snapshot.val();
          console.log(snapshot.val());
          if (emailverification === "false") {
            return false;
          } else {
            return true;
          }
        } else {
          console.log("No data available");
          return true;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const registerNewExercise = async (name, description, targetarea) => {
  const user = auth.currentUser;
  const db = getDatabase();

  try {
    await set(ref(db, "users/" + user.uid + "/exercises/" + name), {
      name: name,
      description: description,
      targetarea: targetarea,  
    });

  } catch (err) {
    console.error(err);
  }
};

const updateExercise = async (name, description, targetarea) => {
  const user = auth.currentUser;
  const db = getDatabase();

  try {
    await set(ref(db, "users/" + user.uid + "/exercises/" + name), {
      name: name,
      description: description,
      targetarea: targetarea,  
    });

  } catch (err) {
    console.error(err);
  }
};

function getExercises() {
  const user = auth.currentUser;

  return new Promise((resolve) => {
    const db = getDatabase();
    const leaderRef = ref(db, "users/" + user.uid + "/exercises");
    onValue(leaderRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const exercises = Object.values(data);
        resolve(exercises);
      } else {
        resolve([]);
      }
    });
  });
}

function ExerciseValues(uid,name,callback) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      const dbRef = ref(getDatabase());
      const userRef = child(dbRef, "users/" + uid + "/exercises/"+name);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const user = snapshot.val();
          callback(user);
        }
      });
    }
  });
}

const registerNewWorkoutPlan = async (name, Exercises) => {
  const user = auth.currentUser;
  const db = getDatabase();

  console.log(Exercises);

  try {
    await set(ref(db, "users/" + user.uid + "/workout plans/" + name), {
      name: name,
      Exercises:Exercises
    });
    

  } catch (err) {
    console.error(err);
  }
};

export {
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getallUsers,
  checkOTP,
  checklicense,
  NavName,
  CheckRole,
  getUserRole,
  getCurrentUserID,
  AccountValues,
  PatientValues,
  getCurrentUserRole,
  getCurrentUserName,
  registerDetails,
  getDadosHistoricosEnergiaCelula,
  callCloudFunction,
  getCreatedUsers,
  deleteUser,
  updateRegistry,
  verifyemail,
  checkemail,
  registerNewExercise,
  getExercises,
  updateExercise,
  ExerciseValues,
  registerNewWorkoutPlan
};
