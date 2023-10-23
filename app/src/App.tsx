import { MediaControls } from "./components/MediaControls";
import { Navbar } from "./components/Navbar";

import { PlaylistMenu } from "./components/PlaylistMenu";

function App() {
  return (
    <>
      <main className="flex h-screen flex-col bg-grey-base">
        <Navbar />

        <MediaControls />
      </main>
    </>
  );
}

export default App;
