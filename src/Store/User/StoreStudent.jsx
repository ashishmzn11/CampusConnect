import { createContext, useEffect, useState } from "react";


export const StudentContext = createContext();
export function StudentProvider({ children }) {
  const [error,seterror]=useState(null);
// *************initialize state from localStorage if present
// **********************************************************
  const [totalstudent, settotalstudent] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentstudent,setcurrentstudent]=useState(() => {
    const saved = localStorage.getItem("currentStudent");
    return saved ? JSON.parse(saved) : null;
  });

// ***************save to localStorage whenever these change
// *********************************************************
useEffect(() => {
    localStorage.setItem("students", JSON.stringify(totalstudent));
  }, [totalstudent]);

  useEffect(() => {
    localStorage.setItem("currentStudent", JSON.stringify(currentstudent));
  }, [currentstudent]);


   const HandleStudentSignIn=({email,pass})=>{
    const findStudent=totalstudent.find((student)=>student.email===email && student.pass===pass)
    if(findStudent){
      setcurrentstudent(findStudent);
      seterror(null)
      return true
    }
    else {
      seterror("Invalid email or password.");
      return false; 
    }

   }
  
 const HandleStudentSignUp = ({ name, email, pass, course }) => {
    // check if this email already exists
    const alreadyExistStudent = totalstudent.some(
      (student) => student.email === email
    );

    if (alreadyExistStudent) {
      // show error or return false
      seterror("An account with this email already exists.");
      return false; // you can also throw an error here
    }

    // if not exists, add the student
    const newStudent = { name, email, pass, course };
    settotalstudent([...totalstudent, newStudent]);
    seterror(null); // clear any old error
    return true;
  };
  const HandleStudentLogout = () => {
    setcurrentstudent(null);
    localStorage.removeItem("currentStudent");
  };
  return (
    <StudentContext.Provider value={{ HandleStudentSignUp ,error,HandleStudentSignIn,currentstudent,HandleStudentLogout}}>
      {children}
    </StudentContext.Provider>
  );
}
