import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from './Page/Home/Home'
import Signup from './SubPages/Signup/Signup'
import Login from './SubPages/Login/Login'
import { Attendanceemployee } from './Page/Attendenceemployee'
import { Adminleave } from './Page/Adminleave'
import { Empleave } from './Page/Empleave'
import { Shifts } from './Page/Shifts'
import TopNav from './components/essentials/TopNav'
import MainuContainer from './components/essentials/MainuContainer'
import Attendancedoctor from './Page/Attendancedoctor'
import VerifyOTP from './SubPages/Verify-otp/VerifyOTP'
import { AddEmployeePage } from './SubPages/Addemployee/Addemployee'
import Department from './Page/Department'
import AppointmentList from './Page/Appointment'
import Payroll from './Page/Payroll'
import MedicinePage from './Page/Medicine'
import UserPage from './Page/user/User'
function App() {
  return (
    <>
      <div className='flex flex-col'>
        <TopNav />
        <div className='flex flex-row'>
          <MainuContainer />
          <div className='border border-pink-900 bg-gray-100 w-screen'>
            {/* Routes */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/attendancedoctor" element={<Attendancedoctor />} />
              <Route path="/attendanceemployee" element={<Attendanceemployee />} />
              <Route path="/adminleave" element={<Adminleave />} />
              <Route path="/empleave" element={<Empleave />} />
              <Route path="/shifts" element={<Shifts />} />
              <Route path="/department" element={<Department />} />
              <Route path="/addemployee" element={<AddEmployeePage />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/appointment" element={<AppointmentList />} />
              <Route path="/medicine" element={<MedicinePage />} />

              <Route path="/payroll" element={<Payroll />} />

              <Route path="/user" element={<UserPage />} />

            </Routes>
         
          </div>
          
        </div>
     
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </>
  )
}

export default App
