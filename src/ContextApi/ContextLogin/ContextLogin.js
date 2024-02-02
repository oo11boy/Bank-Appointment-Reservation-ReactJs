import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ContextLogin = createContext({
    setsignstatus: () => { },
    signstatus: () => { },
    submithandler: () => { },
    submithandler: () => { },
    setemail: () => { },
    setpass: () => { },
    islogin: () => { },
    setislogin: () => { },
    massange: () => { },
    setmassege: () => { },
    datausers: () => { },
    setemailuserlogin: () => { },
    emailuserlogin: () => { },
    signingo:()=>{},
    setsigningo:()=>{}
})

export const ContextLoginProvider = (props) => {
    const { children } = props
    const [signstatus, setsignstatus] = useState(false)
    const navigate = useNavigate()
    const [datausers, setdatausers] = useState([])
    const [email, setemail] = useState('')
    const [islogin, setislogin] = useState(true)
    const [emailuserlogin, setemailuserlogin] = useState('')
    const [pass, setpass] = useState('')
    const [signingo,setsigningo]=useState(false)
    useEffect(() => {
        const contentusers = async () => {
            try {
                const res = await fetch(`http://localhost/Rez/api.php/users`);
                const data = await res.json();
                setdatausers(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        contentusers(); // Call the async function immediately

    }, [signingo]);
    const [massange, setmassege] = useState('')
    const submithandler = (e) => {
        e.preventDefault()

        const finduser = datausers.find((item) => item.email == email && item.password == pass)
        if (finduser) {
            navigate('/userdashboard')
            setislogin(true)
            setemailuserlogin(email)
        } else {
            setmassege('ایمیل یا رمز عبور غلط است.')
        }

    }
    const vals = {
        signstatus,
        setsignstatus,
        submithandler,
        setemail,
        setpass,
        islogin,
        setislogin,
        massange,
        setmassege,
        datausers,
        setemailuserlogin,
        emailuserlogin,
        signingo,
        setsigningo
    }
    return <ContextLogin.Provider value={vals}>{children}</ContextLogin.Provider>
}