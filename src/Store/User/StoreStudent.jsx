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
  
 const HandleStudentSignUp = ({ name, email, pass, course, year, batch}) => {
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
    // const newStudent = { name, email, pass, course,year,batch };
    // settotalstudent([...totalstudent, newStudent]);
    // seterror(null); // clear any old error
    // return true;


    const newStudent = { name, email, pass, course, year, batch };
    const updatedStudents = [...totalstudent, newStudent];
    settotalstudent(updatedStudents); // updates state
    localStorage.setItem("students", JSON.stringify(updatedStudents)); // updates storage
    seterror(null);
    return true;
  };
  const HandleStudentLogout = () => {
    setcurrentstudent(null);
    localStorage.removeItem("currentStudent");
  };
  const totalStudentsCount = totalstudent.length;
  
// remove
  const handleRemoveStudent = (email) => {
  const filteredStudents = totalstudent.filter(student => student.email !== email);
  settotalstudent(filteredStudents);
  localStorage.setItem("students", JSON.stringify(filteredStudents)); // update localStorage
};
// edit
const handleEditStudent = (index, updatedStudent) => {
    const updatedList = [...totalstudent];
    updatedList[index] = updatedStudent;
    settotalstudent(updatedList);
  };

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
    localStorage.setItem("currentteacher", JSON.stringify(currentteacher));
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
  
 const HandleTeacherSignUp = ({ email, name, pass,department,designation ,qualification}) => {
    // check if this email already exists
    const alreadyExistteacher = totalteacher.some(
      (teacher) => teacher.email === email
    );

    if (alreadyExistteacher) {
      // show error or return false
      seterror("An account with this email already exists.");
      return false; // you can also throw an error here
    }

    // if not exists, add the student
    const newteacher = { email, name, pass,department,designation ,qualification};
    const updatedteacher= [...totalteacher, newteacher];
    settotalteacher( updatedteacher);
    localStorage.setItem("teacher", JSON.stringify(updatedteacher));
    seterror(null); // clear any old error
    return true;
  };
  const HandleTeacherLogout = () => {
    setcurrentteacher(null);
    localStorage.removeItem("currentteacher");
  };
  const totalTeacherCount = totalteacher.length;

  // remove
const handleRemoveteacher = (email) => {
  const filteredteacher = totalteacher.filter(teacher => teacher.email !== email);
  settotalteacher(filteredteacher); 
  localStorage.setItem("teacher", JSON.stringify(filteredteacher));
};
// edit
const handleEditteacher = (index, updatedteacher) => {
  const updatedList = [...totalteacher]; 
  updatedList[index] = updatedteacher;
  settotalteacher(updatedList); 
  localStorage.setItem("teacher", JSON.stringify(updatedList));
};
// ***********************teacher end*********************
// *******************************************************

// ***********************Admin*********************
// *******************************************************
const HandleAdminSignIn = (email, password) => {
    if (email === "Admin@gmail.com" && password === "003") {
      localStorage.setItem("adminAuth", true);
      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: "Invalid Admin Credentials" };
    }
  };
  // ***********************course *********************
// *******************************************************
const [totalcourse,settotalcourse]=useState(() => {
    const saved = localStorage.getItem("course");
    return saved ? JSON.parse(saved) : [];
  })
 const HandleCourse = ({name, code, duration, totalFee}) => {
  const newcourse = {name, code, duration, totalFee};
  settotalcourse([...totalcourse, newcourse]);
};

  useEffect(() => {
    localStorage.setItem("course", JSON.stringify(totalcourse));
  }, [totalcourse]);
  // remove
const handleRemoveCourse = (code) => {
  const filteredcourse = totalcourse.filter(course => course.code !== code);
  settotalcourse(filteredcourse);
  localStorage.setItem("course", JSON.stringify(filteredcourse));
};

  // edit
const HandleEditCourse = (index, total) => {
  const updatedList = [...totalcourse]; 
  updatedList[index] = total;
  settotalcourse(updatedList);
  localStorage.setItem("course", JSON.stringify(updatedList));
};


// ***********************course end*********************
// *******************************************************
  return (
    <StudentContext.Provider value={{ HandleStudentSignUp ,error,HandleStudentSignIn,currentstudent,HandleStudentLogout,HandleTeacherSignUp,HandleTeacherSignIn,currentteacher,HandleTeacherLogout,HandleAdminSignIn,totalTeacherCount,totalStudentsCount,totalstudent,handleRemoveStudent,handleEditStudent,totalteacher,handleRemoveteacher,handleEditteacher,HandleCourse,totalcourse,HandleEditCourse,handleRemoveCourse,}}>
      {children}
    </StudentContext.Provider>
  );
}
