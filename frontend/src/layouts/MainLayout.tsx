import BottomNav from "../components/layouts/BottomNav";
import LeftSidebar from "../components/layouts/LeftSidebar";
import RightSidebar from "../components/layouts/RightSidebar";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex bg-(--color-bg) min-h-screen">
      <LeftSidebar />
      <main className="flex-1">{children}</main>
      <RightSidebar />
      <BottomNav />
    </div>
  );
};

export default MainLayout;
