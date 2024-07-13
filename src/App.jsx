import "./App.css";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <Home />
      </SignedIn>
    </>
  );
}

export default App;
