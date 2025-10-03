import { createContext, useState } from "react";


export const StudentContext = createContext();

export function StudentProvider({ children }) {



  const [totalstudent, settotalstudent] = useState([]);

  
  const HandleStudentSignUp=({name,email,pass,course})=>{
    const newStudent={name,email,pass,course}
    settotalstudent([...totalstudent,newStudent])
  }

  return (
    <StudentContext.Provider value={{ HandleStudentSignUp }}>
      {children}
    </StudentContext.Provider>
  );
}
