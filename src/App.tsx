import useAuthCheck from "./hooks/auth/useAuthCheck";
import AppRouter from "./routes/Routes"
import { Toaster } from "react-hot-toast";
const App = () => {
  const authChecked = useAuthCheck(); 

  if (!authChecked) {
    return <div>Loading...</div>; 
  }
  return (
    <>
       <Toaster/>
       <AppRouter/>
    </>
  )
}

export default App
