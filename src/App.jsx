import SideBar from './Components/SideBar'
import sideBarMenu from './Components/SideBarMenu';
import Memories from './Components/Memories'
import memories from './Components/MemoriesArray'
import { Toaster } from 'sonner';
function App() {
  

  return (
    <div className="bg-lightTheme-bg min-h-screen display-flex justify-center">
      <Toaster position="bottom-right" richColors />
      <SideBar elements={sideBarMenu} />
      <Memories elements={memories} />
    </div>
  );
}

export default App;
