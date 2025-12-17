import SideBar from './Components/SideBar'
import sideBarMenu from './Components/SideBarMenu';
import Memories from './Components/Memories'
import memories from './Components/MemoriesArray'
function App() {
  

  return (
    <div className="bg-lightTheme-bg min-h-screen display-flex justify-center">
      <SideBar elements={sideBarMenu} />
      <Memories elements={memories} />
    </div>
  );
}

export default App;
