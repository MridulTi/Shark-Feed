
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from './Pages/More/MainLayout';
import Dashboard from './Pages/Dashboard/Dashboard';
import LandingPage from './Pages/LandingPage/LandingPage';
import ChooseProfile from './Pages/More/Onboarding/ChooseProfile';

import UploadPage from './Pages/More/Onboarding/UploadPage';

import Onboard from './Pages/More/Onboarding/Onboard';
import Profile from './Pages/Profile/Profile';
import ProfileOther from './Pages/Profile/ProfileOther';


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<LandingPage/>
    },
    {
      element:<Onboard/>,
      children:[
        {
          path:"/Onboarding",
          element:<ChooseProfile/>
        },
        {
          path:"/Onboarding/2",
          element:<UploadPage/>
        },
      ]
    },
    {
      element:<MainLayout/>,
      children: [
        {
          path:"/Dashboard",
          element:<Dashboard/>
        },
        
        {
          path:"/Profile",
          element:<Profile/>
        },
        {
          path:"/:slugs",
          element:<ProfileOther/>
        }
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
