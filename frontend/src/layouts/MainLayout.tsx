import LeftSidebar from "../components/layouts/LeftSidebar";
import RightSidebar from "../components/layouts/RightSidebar";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex bg-(--color-surface) min-h-screen">
      <LeftSidebar />
      <main className="flex-1">{children}</main>
      <RightSidebar />
    </div>
  );
};

export default MainLayout;
