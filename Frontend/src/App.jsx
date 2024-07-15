
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from './Pages/More/MainLayout';
import Dashboard from './Pages/Dashboard/Dashboard';
import LandingPage from './Pages/LandingPage/LandingPage';
import ChooseProfile from './Pages/More/Onboarding/ChooseProfile';

import UploadPage from './Pages/More/Onboarding/UploadPage';

import Onboard from './Pages/More/Onboarding/Onboard';
import Profile from './Pages/Profile/Profile';
import ProfileOther from './Pages/Profile/ProfileOther';
import InfoDeck from './Pages/More/Onboarding/InfoDeck';


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
        {
          path:"/Onboarding/3",
          element:<InfoDeck/>
        }
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
          path:"/:username",
          element:<ProfileOther/>
        },
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
