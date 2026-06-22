import BottomNav from "./BottomNav";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import Header from "./Header";

type MainLayoutProps = React.PropsWithChildren<{
  /** Wider reading column — used for masonry / Explore. */
  contentMax?: "narrow" | "wide";
}>;

const MainLayout = ({ children, contentMax = "narrow" }: MainLayoutProps) => {
  const sectionClass =
    contentMax === "wide"
      ? "w-full max-w-6xl xl:max-w-7xl mx-auto px-4 py-6 sm:px-6 md:py-8"
      : "w-full max-w-3xl mx-auto p-4";

  return (
    <div className="flex bg-(--color-bg) min-h-screen">
      <LeftSidebar />
      <main className="flex-1">
        <Header />
        <section className={sectionClass}>{children}</section>
      </main>
      <RightSidebar />
      <BottomNav />
    </div>
  );
};

export default MainLayout;
