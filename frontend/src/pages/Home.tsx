import PostComposer from "../components/post/PostComposer";
import PostListing from "../components/post/PostListing";

const Home = () => {
  return (
    <div className="space-y-6">
      <div className="py-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-(--foreground)">
          Today
        </h1>

        <span className="text-sm text-(--muted-foreground)">
          A slow scroll through your circle. Ava Mercer
        </span>
      </div>

      <PostComposer />
      <PostListing />
    </div>
  );
};

export default Home;
