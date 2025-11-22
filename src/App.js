import ICWindow from "./windows/ICWindow";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {open && <ICWindow onClose={() => setOpen(false)} />}
    </div>
  );
}

export default App;