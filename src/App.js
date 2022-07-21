import React from "react";
import ROUTES, { RenderRoutes } from "./routing/index";

function App() {
  return (
    <div className="App">
      <RenderRoutes routes={ROUTES} />
    </div>
  );
}

export default App;
