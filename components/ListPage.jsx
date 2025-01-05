"use client";
import { useState, useEffect } from "react";

const ListPage = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [sortOrder, setSortOrder] = useState("newest");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setFetching(true);
      try {
        const response = await fetch(
          `/api/proxy?page[number]=${currentPage}&page[size]=${itemsPerPage}&append[]=small_image&append[]=medium_image&sort=${
            sortOrder === "newest" ? "-published_at" : "published_at"
          }`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const fetchedPosts = data?.data || [];
        const totalItems = data?.meta?.total || 0;
        setPosts(fetchedPosts);
        setTotalPosts(totalItems);
      } catch (error) {
        setError(error.message);
      } finally {
        setFetching(false);
        if (loading) {
          setLoading(false); 
        }
      }
    };

    fetchPosts();
  }, [currentPage, itemsPerPage, sortOrder]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div className="text-center">Loading...</div>; 
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalPosts);

  const totalPages = Math.ceil(totalPosts / itemsPerPage);
  const maxPageNumbers = 4;
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxPageNumbers / 2),
      totalPages - maxPageNumbers + 1
    )
  );
  const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

  return (
    <div className="container mx-auto py-8 md:px-24 sm:px-5 px-5">
      {/* FILTER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div>
          <span className="text-sm text-gray-700">
            Showing {startItem} - {endItem} of {totalPosts}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          <div className="flex justify-center items-center">
            <label htmlFor="itemsPerPage" className="mr-2">
              Show Per Page:
            </label>
            <div className="relative w-32">
              <select
                id="itemsPerPage"
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                value={itemsPerPage}
                className="p-2 appearance-none w-full border rounded-full text-center outline-none pr-10 hover:bg-gray-100 focus:ring focus:ring-blue-300"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <i className="fa-solid fa-caret-down absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"></i>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <label htmlFor="sort" className="mr-2">
              Sort By:
            </label>
            <div className="relative w-32">
              <select
                id="sort"
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
                className="p-2 appearance-none w-full border rounded-full text-center outline-none pr-10 hover:bg-gray-100 focus:ring focus:ring-blue-300"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
              <i className="fa-solid fa-caret-down absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"></i>
            </div>
          </div>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg shadow-lg">
            <div className="relative w-full h-48">
              <img
                src= "/assets/images/fallback-image.jpg"
                alt={post.title}
                className="w-full h-full object-cover rounded-t-lg"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 font-bold uppercase">
                {new Date(post.published_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h3 className="text-lg font-bold line-clamp-3">{post.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* PAGE INDICATOR */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border rounded-full hover:bg-gray-200"
        >
          <i className="fa-solid fa-angles-left"></i>
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border rounded-full hover:bg-gray-200"
        >
          <i className="fa-solid fa-angle-left"></i>
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const page = startPage + index;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 border rounded-full hover:bg-gray-200 ${
                currentPage === page
                  ? "bg-[#EF6C34] text-white"
                  : "bg-transparent"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border rounded-full hover:bg-gray-200"
        >
          <i className="fa-solid fa-angle-right"></i>
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 border rounded-full hover:bg-gray-200"
        >
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ListPage;
