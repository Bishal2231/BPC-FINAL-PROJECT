import './App.css'
import { Route, Routes, useLocation } from "react-router-dom"
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
import OrganizationForm from './SubPages/Organizationid/Organizationid'
import EmployeeDetailsPage from './SubPages/EmployeeDetail'
import { RemoveEmployeePage } from './SubPages/Addemployee/Deleteemployee'
import AddAppointmentForm from './SubPages/Addappointment'
import { userAuthStore } from './authstore/Authstore'
import { Navigate } from "react-router-dom";

function App() {
  const { user } = userAuthStore()
  const location = useLocation()
  function ProtectedRoute({ children }) {
    const { user } = userAuthStore();

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }
  // Routes where layout should NOT be shown
  const noLayoutRoutes = ['/login', '/signup','/verify-otp']

  const showLayout = !noLayoutRoutes.includes(location.pathname)

  return (
    <>
      {showLayout && (
        <div className="flex flex-col">
          <TopNav />
          <div className='flex flex-row'>
            <MainuContainer />
            <div className='border border-pink-900 bg-gray-100 w-screen'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/attendancedoctor" element={<Attendancedoctor />} />
                <Route path="/attendanceemployee" element={<Attendanceemployee />} />
                <Route path="/adminleave" element={<Adminleave />} />
                <Route path="/empleave" element={<Empleave />} />
                <Route path="/shifts" element={<Shifts />} />
                <Route path="/department" element={<Department />} />
                <Route path="/appointment" element={<AppointmentList />} />
                <Route path="/medicine" element={<MedicinePage />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/org-form" element={<OrganizationForm />} />
                <Route path="/employee-detail/:id" element={<EmployeeDetailsPage />} /> 
                <Route path="/addemployee" element={<ProtectedRoute> <AddEmployeePage /></ProtectedRoute>} />

                <Route path="/add-appointment" element={<ProtectedRoute><AddAppointmentForm /> </ProtectedRoute>} />

                <Route path="/employee/remove" element={<ProtectedRoute><RemoveEmployeePage /></ProtectedRoute>} />

              </Routes>
            </div>
          </div>
        </div>
      )}

      {!showLayout && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          


        </Routes>
      )}
    </>
  )
}

export default App
