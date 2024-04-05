import Container from "../ui/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

function Navbar() {
  return (
    <div className="w-full  shadow-sm ">
      <div className="py-2 sm:py-0 border-b-[1px]">
        <Container>
          <div className="flex sm:flex-row items-center justify-between md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Navbar;
