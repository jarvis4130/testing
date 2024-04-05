import Container from "./Container";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import CartOverview from "./CartOverview";

function AppLayout() {
  return (
    <>
      <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
        <Navbar />

        <div className="overflow-scroll no-scrollbar">
          <Container>
            <Outlet />
          </Container>
        </div>

        <CartOverview />
      </div>
    </>
  );
}

export default AppLayout;
