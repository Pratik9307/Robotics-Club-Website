import { Route, Routes } from "react-router-dom";
import './App.css';
import LoadingPage from './components/LoadingPage';
import About from "./pages/About";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Community from "./pages/Community";
import { useState, useEffect } from "react";
import AdminPanel from "./Admin/AdminPanel";
import AdminRegister from "./Admin/AdminRegister";
import AdminLogin from "./Admin/AdminLogin";
import CourseContaint from "./pages/Coursecontent";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import UploadReceipt from "./components/core/Dashboard/UploadReceipt";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import ProtectedAdminRoute from './components/core/Auth/ProtectedAdminRoute';
import Data2 from "./Data";

function App() {
  const { user } = useSelector((state) => state.profile);

  // Set Courses1 as Data2 (Assuming Data2 is valid)
  const [Courses1, setCourses1] = useState(Data2);

  // Handle isAuthenticated state with validation for localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    // Ensure valid data before parsing
    return savedAuth && savedAuth !== "undefined" ? JSON.parse(savedAuth) : false;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true); // Set authentication to true after login
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoadingPage isLoggedIn={isAuthenticated} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses Courses1={Courses1} />} /> {/* Pass Courses1 */}
        <Route path="/community" element={<Community />} />

        {/* Protect AdminPanel Route */}
        <Route 
          path="/admin" 
          element={
            <ProtectedAdminRoute isAuthenticated={isAuthenticated}>
              <AdminPanel />
            </ProtectedAdminRoute>
          } 
        />
        
        <Route 
          path="/adminLogin" 
          element={<AdminLogin onLogin={handleLogin} />} 
        />
        <Route path="/adminRegister" element={<AdminRegister />} />
        <Route path="/Course" element={<CourseContaint Courses1={Courses1} />} /> {/* Pass Courses1 */}
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        {/* Open and protected routes */}
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  

        <Route 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />} />
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="/dashboard/upload-receipt" element={<UploadReceipt />} />
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }
        </Route>

        <Route 
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route 
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )
          }
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
