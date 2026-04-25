import BottomNav from "../components/layouts/BottomNav";
import LeftSidebar from "../components/layouts/LeftSidebar";
import RightSidebar from "../components/layouts/RightSidebar";
import Header from "../components/layouts/Header";
const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex bg-(--color-bg) min-h-screen">
      <LeftSidebar />
      <main className="flex-1">
        <Header />
        <section className="w-full max-w-3xl mx-auto p-4">{children}</section>
      </main>
      <RightSidebar />
      <BottomNav />
    </div>
  );
};

export default MainLayout;
