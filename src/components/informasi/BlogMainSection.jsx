import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../common/Pagination";
import useApi from "../../hooks/UseApi";

const BlogMainSection = ({ authorId, category, authorName }) => {
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [selectedAuthorName, setSelectedAuthorName] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { request, loading, error } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, categoriesRes] = await Promise.all([
          request("/articles"),
          request("/article-categories"),
        ]);

        const articlesData = articlesRes.data?.data || [];

        const publishedPosts = articlesData
          .filter((p) => (p.status || "").toLowerCase() === "published")
          .sort(
            (a, b) =>
              new Date(b.published_at || b.createdAt) -
              new Date(a.published_at || a.createdAt)
          );

        setPosts(publishedPosts);
        setRecentPosts(publishedPosts.slice(0, 3));

        const categoriesData = categoriesRes.data?.data || categoriesRes.data || [];
        setCategories(categoriesData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [request]);

  useEffect(() => {
    const stateCat = category || location.state?.category;
    const stateAuthId = authorId || location.state?.authorId;
    const stateAuthName = authorName || location.state?.authorName;

    if (stateCat) {
      setSelectedCategory(stateCat);
      setSelectedAuthorId(null);
      setSelectedAuthorName(null);
      window.history.replaceState({}, document.title);
    }

    if (stateAuthId || stateAuthName) {
      setSelectedAuthorId(stateAuthId);
      setSelectedAuthorName(stateAuthName || "Penulis");
      setSelectedCategory(null);
      window.history.replaceState({}, document.title);
    }
  }, [category, authorId, authorName, location.state]);

  let filteredPosts = posts;

  if (selectedCategory) {
    filteredPosts = filteredPosts.filter((post) =>
      post.categories?.some((cat) => cat.name === selectedCategory)
    );
  }

  if (selectedAuthorName) {
    filteredPosts = filteredPosts.filter((post) => {
      const postAuthorName = post.author_override || post.author_name || post.author?.name || "Tim Exaque";
      return postAuthorName === selectedAuthorName;
    });
  }

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById("blog-top")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedAuthorId(null);
    setSelectedAuthorName(null);
    setCurrentPage(1);
    document.getElementById("blog-top")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAuthorClick = (authId, authName) => {
    setSelectedAuthorId(authId);
    setSelectedAuthorName(authName);
    setSelectedCategory(null);
    setCurrentPage(1);
    document.getElementById("blog-top")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedAuthorId(null);
    setSelectedAuthorName(null);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getImageUrl = (path) => {
    if (!path) return "/placeholder-image.jpg";
    if (path.startsWith("https")) return path;
    const baseUrl = import.meta.env.VITE_API_BASE;
    return `${baseUrl}${path}`;
  };

  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    let text = doc.body.textContent || "";
    text = text.replace(/\u00A0/g, " ");
    return text;
  };

  const getLimitedDescription = (item, limit = 10) => {
    let text = item.excerpt || stripHtml(item.content);
    if (!text) return "";
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  if (loading) return <div className="py-32 text-center">Memuat konten blog...</div>;
  if (error) return <div className="py-32 text-center text-red-600">Error: {error}</div>;

  return (
    <section id="blog-top" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {(selectedCategory || selectedAuthorId || selectedAuthorName) && (
          <div className="mb-8 flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 inline-flex">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              {selectedCategory ? (
                <>Kategori: <span className="text-black">{selectedCategory}</span></>
              ) : (
                <>Artikel oleh: <span className="text-black">{selectedAuthorName}</span></>
              )}
            </h2>
            <button
              onClick={handleClearFilters}
              className="text-sm bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-full hover:text-accent hover:border-accent transition-colors"
            >
              Tampilkan Semua
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-16">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <div key={post.id} className="group">
                    <div className="rounded-2xl overflow-hidden mb-6 shadow-sm bg-gray-100">
                      <img
                        src={getImageUrl(post.featured_image_url)}
                        alt={post.title}
                        className="w-full h-64 md:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <button
                          onClick={() => handleAuthorClick(post.author_id, post.author_override || post.author_name || post.author?.name || "Tim Exaque")}
                          className="font-semibold text-gray-700 hover:text-accent transition-colors cursor-pointer text-left"
                        >
                          {post.author_override || post.author_name || post.author?.name || "Tim Exaque"}
                        </button>
                        <span>•</span>
                        <span>{formatDate(post.published_at || post.createdAt)}</span>
                        {post.categories?.[0] && (
                          <>
                            <span>•</span>
                            <span className="text-accent font-medium">{post.categories[0].name}</span>
                          </>
                        )}
                      </div>

                      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-accent transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>

                      <p className="text-gray-600 text-md leading-relaxed mb-6">
                        {getLimitedDescription(post, 190)}
                      </p>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-full hover:bg-accent-hover transition-colors shadow-md"
                      >
                        Lihat Selengkapnya &rarr;
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl">
                  Tidak ada artikel ditemukan.
                </div>
              )}
            </div>

            {filteredPosts.length > itemsPerPage && (
              <div className="mt-16">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>

          <div className="lg:col-span-1 pl-0 lg:pl-8">
            <div className="sticky top-24 space-y-12">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                  Artikel Terbaru
                </h3>
                <div className="space-y-6">
                  {recentPosts.map((recent) => (
                    <div
                      key={recent.id}
                      className="flex items-center gap-4 group cursor-pointer"
                    >
                      <Link to={`/blog/${recent.slug}`} className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden border border-gray-100">
                          <img
                            src={getImageUrl(recent.featured_image_url)}
                            alt={recent.title}
                            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                          />
                        </div>
                      </Link>
                      <div>
                        <p className="text-xs text-accent font-semibold mb-1 flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleAuthorClick(recent.author_id, recent.author_override || recent.author_name || recent.author?.name || "Tim Exaque");
                            }}
                            className="text-gray-600 font-medium hover:text-accent transition-colors cursor-pointer text-left"
                          >
                            {recent.author_override || recent.author_name || recent.author?.name || "Tim Exaque"}
                          </button>
                          <span className="text-gray-400 font-normal">•</span>
                          <span>{formatDate(recent.published_at || recent.createdAt)}</span>
                        </p>
                        <h4 className="text-base font-bold text-gray-800 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                          <Link to={`/blog/${recent.slug}`}>{recent.title}</Link>
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                  Kategori
                </h3>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={handleClearFilters}
                      className={`text-sm w-full text-left border-b border-gray-100 pb-2 transition-all capitalize
                        ${(selectedCategory === null && selectedAuthorId === null && selectedAuthorName === null)
                          ? "text-accent font-bold pl-2 border-l-2 border-l-accent"
                          : "text-gray-600 hover:text-accent hover:pl-2"}`}
                    >
                      Semua Artikel
                    </button>
                  </li>

                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <li key={cat.id || cat.name}>
                        <button
                          onClick={() => handleCategoryClick(cat.name)}
                          className={`text-sm w-full text-left border-b border-gray-100 pb-2 transition-all capitalize
                            ${selectedCategory === cat.name
                              ? "text-accent font-bold pl-2 border-l-2 border-l-accent"
                              : "text-gray-600 hover:text-accent hover:pl-2"}`}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 text-sm">
                      Tidak ada kategori
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogMainSection;