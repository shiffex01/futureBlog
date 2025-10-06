import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  // Initial posts (like a database)
  const [posts, setPosts] = useState([
    { title: "Welcome to FutureBlog", content: "Your journey begins here.", author: "Admin", date: new Date().toLocaleString() },
  ]);

    useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
    }, []);

    useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
    }, [posts]);



  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  // Add new post
  const addPost = (e) => {
    e.preventDefault();
    if (!title || !content || !author) return alert("Please fill all fields!");

    const newPost = {
      title,
      content,
      author,
      date: new Date().toLocaleString(),
    };

      const deletePost = (index) => {
  if (window.confirm("Are you sure you want to delete this post?")) {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
  }
};


    setPosts([newPost, ...posts]); // Add new post at the top
    setTitle("");
    setContent("");
    setAuthor("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-cyan-400">⚡ FutureBlog</h1>
        <p className="text-gray-400 mt-2">A dynamic blog built with React & Tailwind</p>
      </header>

      {/* Add Post Form */}
      <form onSubmit={addPost} className="bg-gray-800 rounded-2xl p-6 mb-8 max-w-2xl mx-auto shadow-lg">
        <h2 className="text-2xl mb-4 text-cyan-300 font-semibold">Add a New Post</h2>
        <input
          className="w-full mb-3 p-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400"
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-3 p-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400"
          rows="4"
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          className="w-full mb-3 p-2 rounded bg-gray-700 text-gray-100 placeholder-gray-400"
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-2 rounded transition"
          type="submit"
        >
          Publish Post
        </button>
      </form>

      {/* Blog Posts */}
      <div className="max-w-3xl mx-auto space-y-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-cyan-700/30 transition"
          >
            <h3 className="text-2xl text-cyan-300 font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-300 mb-4">{post.content}</p>
            <div className="text-sm text-gray-500">
              Posted by <span className="text-cyan-400">{post.author}</span> on{" "}
              {post.date}
            </div>
          </div>
        ))}
        <button
  onClick={() => deletePost(index)}
  className="mt-4 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition"
>
  🗑 Delete
</button>

      </div>
    </div>
  );
}
