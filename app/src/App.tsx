import { MediaControls } from "./components/MediaControls";
import { Navbar } from "./components/Navbar";
import { Library } from "./components/Library";

function App() {
  return (
    <main className="flex h-screen flex-col bg-grey-base">
      <Navbar />
      <Library />
      <MediaControls />
    </main>
  );
}

export default App;
