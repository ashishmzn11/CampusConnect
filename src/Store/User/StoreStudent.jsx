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
  const totalStudentsCount = totalstudent.length;

// *****************student end**********************
// **************************************************




  // **********************************teacher********************
  // *************************************************************
    const [totalteacher, settotalteacher] = useState(() => {
    const saved = localStorage.getItem("teacher");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentteacher,setcurrentteacher]=useState(() => {
    const saved = localStorage.getItem("currentteacher");
    return saved ? JSON.parse(saved) : null;
  });

useEffect(() => {
    localStorage.setItem("teacher", JSON.stringify(totalteacher));
  }, [totalteacher]);

  useEffect(() => {
    localStorage.setItem("currentStudent", JSON.stringify(currentteacher));
  }, [currentteacher]);


   const HandleTeacherSignIn=({email,pass})=>{
    const findTeacher=totalteacher.find((teacher)=>teacher.email===email && teacher.pass===pass)
    if(findTeacher){
      setcurrentteacher(findTeacher);
      seterror(null)
      return true
    }
    else {
      seterror("Invalid email or password.");
      return false; 
    }

   }
  
 const HandleTeacherSignUp = ({ name, email, pass, course }) => {
    // check if this email already exists
    const alreadyExistStudent = totalteacher.some(
      (teacher) => teacher.email === email
    );

    if (alreadyExistteacher) {
      // show error or return false
      seterror("An account with this email already exists.");
      return false; // you can also throw an error here
    }

    // if not exists, add the student
    const newteacher = { name, email, pass, course };
    settotalteacher([...totalteacher, newteacher]);
    seterror(null); // clear any old error
    return true;
  };
  const HandleTeacherLogout = () => {
    setcurrentteacher(null);
    localStorage.removeItem("currentteacher");
  };
  const totalTeacherCount = totalteacher.length;

// ***********************teacher end*********************
// *******************************************************



// const [adminList, setAdminList] = useState(() => {
//     const storedAdmins = localStorage.getItem("adminList");
//     return storedAdmins
//       ? JSON.parse(storedAdmins)
//       : [{ name: "Ashish", email: "admin@gmail.com", pass: "003" }];
//   });

//   const [Error, setError] = useState("");

//   const HandleAdminSignIn = ({ email, pass }) => {
//     const admin = adminList.find((a) => a.email === email && a.pass === pass);
//     if (admin) {
//       setError("");
//       return true;
//     } else {
//       setError("Invalid email or password!");
//       return false;
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem("adminList", JSON.stringify(adminList));
//   }, [adminList]);

const HandleAdminSignIn = (email, password) => {
    if (email === "Admin@gmail.com" && password === "003") {
      localStorage.setItem("adminAuth", true);
      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: "Invalid Admin Credentials" };
    }
  };
  return (
    <StudentContext.Provider value={{ HandleStudentSignUp ,error,HandleStudentSignIn,currentstudent,HandleStudentLogout,HandleTeacherSignUp,HandleTeacherSignIn,currentteacher,HandleTeacherLogout,HandleAdminSignIn,totalTeacherCount,totalStudentsCount}}>
      {children}
    </StudentContext.Provider>
  );
}
