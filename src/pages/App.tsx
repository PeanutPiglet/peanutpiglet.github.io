import Home from "./Home";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export default function App() {
  return (
    <ReactLenis root>
      <Home></Home>
    </ReactLenis>
  );
}
