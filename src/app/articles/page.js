"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import icSearch from "@/app/assets/images/icons/ic_search.svg";
import icArrowDown from "@/app/assets/images/icons/ic_arrow_down.svg";
import icHeart from "@/app/assets/images/icons/ic_heart.svg";
import imgBadge from "@/app/assets/images/icons/img_badge.svg";
import icProfile from "@/app/assets/images/icons/ic_profile.svg";
import imgProduct from "@/app/assets/images/icons/image 71.svg";

import Pagination from "@/app/components/common/Pagination";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // GET 데이터 가져오기
  useEffect(() => {
    const fetchArticles = async () => {
      const dummyData = [
        {
          id: 1,
          title: "테스트 게시글 1입니다.",
          createdAt: "2024-06-16T10:00:00Z",
          likeCount: 15,
          nickname: "총명한판다",
        },
        {
          id: 2,
          title: "판다마켓 너무 좋아요",
          createdAt: "2024-06-15T10:00:00Z",
          likeCount: 102,
          nickname: "코드잇학생",
        },
        {
          id: 3,
          title: "넥스트js 재밌네요!",
          createdAt: "2024-06-14T10:00:00Z",
          likeCount: 5,
          nickname: "프론트엔드",
        },
        {
          id: 4,
          title: "검색 기능 테스트용 글",
          createdAt: "2024-06-13T10:00:00Z",
          likeCount: 45,
          nickname: "개발자지망생",
        },
        {
          id: 5,
          title: "다섯 번째 게시글! 여기까지가 1페이지 본문에 마운트됩니다.",
          createdAt: "2024-06-12T10:00:00Z",
          likeCount: 22,
          nickname: "판다러버",
        },
        {
          id: 6,
          title:
            "여섯 번째 글입니다. 하단 페이지네이션 바를 통해 2페이지로 넘어옵니다.",
          createdAt: "2024-06-11T10:00:00Z",
          likeCount: 7,
          nickname: "NextV4초보",
        },
        {
          id: 7,
          title: "마지막 일곱 번째 게시글까지 안전하게 연동 및 출력 확인!",
          createdAt: "2024-06-10T10:00:00Z",
          likeCount: 88,
          nickname: "과제마스터",
        },
      ];

      try {
        const response = await fetch("https://your-api-url.com/articles");
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        } else {
          setArticles(dummyData);
        }
      } catch (error) {
        console.error("데이터 조회 실패:", error);
        setArticles(dummyData);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  const bestArticles = [...articles]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const filteredAndSortedArticles = articles
    .filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === "likes") {
        return (b.likeCount || 0) - (a.likeCount || 0);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredAndSortedArticles.length / itemsPerPage);
  const paginatedArticles = filteredAndSortedArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full pb-20">
      {/* 베스트 게시글 영역 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-panda-900 mb-4">베스트 게시글</h2>
        <div className="flex gap-5">
          {bestArticles.map((article) => (
            <Link
              href={`/articles/${article.id}`}
              key={`best-${article.id}`}
              className="flex-1 h-[180px] bg-white rounded-2xl p-6 relative transition-all"
            >
              <Image
                src={imgBadge}
                alt="베스트 배지"
                width={102}
                height={30}
                className="mb-3"
              />
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-base font-semibold text-panda-900 line-clamp-2 w-[240px]">
                  {article.title}
                </h3>
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={imgProduct}
                    alt="제품 이미지"
                    width={72}
                    height={72}
                    className="rounded-xl object-cover shrink-0 bg-panda-100"
                  />
                  <span className="text-xs text-panda-400">
                    {formatDate(article.createdAt)}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 flex items-center gap-3 text-xs text-panda-500">
                <span className="flex items-center gap-1 font-medium text-panda-600">
                  {article.nickname || "익명"}
                </span>
                <div className="flex items-center gap-1 font-medium text-panda-600">
                  <Image src={icHeart} alt="좋아요" width={14} height={14} />
                  {article.likeCount || 0}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 게시글 목록 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-panda-900">게시글</h2>
        <Link href="/articles/write">
          <button className="bg-brand-blue text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-brand-hover transition-colors">
            글쓰기
          </button>
        </Link>
      </div>

      {/* 검색창 바 및 필터 드롭다운 */}
      <div className="flex gap-3 mb-6 relative">
        <div className="flex-1 relative">
          <Image
            src={icSearch}
            alt="검색"
            className="absolute left-4 top-3.5"
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder="검색할 게시글을 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-panda-100 text-panda-900 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:bg-white focus:border focus:border-brand-blue text-sm placeholder-panda-400"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-[130px] bg-white border border-panda-200 px-4 py-3 rounded-xl flex justify-between items-center text-sm font-medium text-panda-900 hover:bg-panda-50"
          >
            <span>{sortBy === "latest" ? "최신순" : "좋아요순"}</span>
            <Image
              src={icArrowDown}
              alt={isDropdownOpen ? "메뉴 닫기" : "메뉴 열기"}
              width={16}
              height={16}
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-[130px] bg-white border border-panda-200 rounded-xl shadow-lg z-10 py-1 overflow-hidden">
              <button
                onClick={() => {
                  setSortBy("latest");
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-panda-900 hover:bg-panda-100"
              >
                최신순
              </button>
              <button
                onClick={() => {
                  setSortBy("likes");
                  setIsDropdownOpen(false);
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-panda-900 hover:bg-panda-100"
              >
                좋아요순
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 자유게시판 리스트 목록 메인 바디 */}
      <div className="flex flex-col divide-y divide-panda-200">
        {paginatedArticles.length > 0 ? (
          paginatedArticles.map((article) => (
            <Link
              href={`/articles/${article.id}`}
              key={article.id}
              className="w-full h-[124px] bg-white py-6 flex justify-between items-center transition-all"
            >
              <div className="flex flex-col h-full justify-between">
                <h3 className="text-lg font-semibold text-panda-900 line-clamp-1 w-[800px]">
                  {article.title}
                </h3>
                <div className="flex gap-3 text-xs text-panda-500">
                  <span className="flex items-center gap-1 font-medium text-panda-600">
                    <Image
                      src={icProfile}
                      alt="프로필"
                      width={16}
                      height={16}
                    />
                    {article.nickname || "익명"}
                  </span>
                  <span>{formatDate(article.createdAt)}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Image
                  src={imgProduct}
                  alt="제품 이미지"
                  width={72}
                  height={72}
                  className="rounded-xl object-cover shrink-0 bg-panda-100"
                />
                <div className="flex items-center gap-1.5 text-sm font-medium text-panda-600">
                  <Image src={icHeart} alt="좋아요" width={16} height={16} />
                  {article.likeCount || 0}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="w-full py-20 text-center text-panda-400 font-medium">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
