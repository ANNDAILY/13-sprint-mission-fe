"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import icProfile from "@/app/assets/images/icons/ic_profile.svg";
import icHeart from "@/app/assets/images/icons/ic_heart.svg";
import icBack from "@/app/assets/images/icons/ic_back.svg";
import icBlank from "@/app/assets/images/icons/ic_blank.svg";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const getTimeAgo = (dateString) => {
  if (!dateString) return "";
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();

  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHour = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDay > 0) return `${diffDay}일 전`;
  if (diffHour > 0) return `${diffHour}시간 전`;
  if (diffMin > 0) return `${diffMin}분 전`;
  return "방금 전";
};

export default function ArticleDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newComment, setNewComment] = useState("");

  const [isArticleMenuOpen, setIsArticleMenuOpen] = useState(false);
  const [activeCommentMenuId, setActiveCommentMenuId] = useState(null);

  const isCommentValid = newComment.trim().length > 0;

  // GET 데이터 가져오기
  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await fetch(`https://your-api-url.com/articles/${id}`);
        if (response.ok) {
          const data = await response.json();
          setArticle(data);
        } else {
          throw new Error("API 연동 전");
        }
      } catch (error) {
        setArticle({
          id,
          title: "판다마켓 너무 편리하고 좋아요. 자주 이용할게요.",
          content:
            "이번에 판다마켓에서 처음으로 중고 거래를 해봤는데, 앱도 너무 깔끔하고 거래 과정도 매끄러워서 정말 좋았습니다!\n\n앞으로도 안 쓰는 물건이 생기면 자주 이용할 거 같아요. 판다마켓 화이팅! 🐼💙",
          createdAt: "2024-06-16T10:00:00Z",
          likeCount: 102,
          nickname: "총명한판다",
        });

        setComments([
          // { id: 1, nickname: "코드잇학생", content: "저도 완전 공감합니다! UI가 진짜 예뻐요.", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchArticleDetail();
  }, [id]);

  // 본문 DELETE
  const handleDeleteArticle = async () => {
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;
    setIsArticleMenuOpen(false);
    try {
      const response = await fetch(`https://your-api-url.com/articles/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("게시글이 삭제되었습니다.");
        router.push("/articles");
      } else {
        alert("게시글이 삭제되었습니다! (API 연동 전 더미 동작)");
        router.push("/articles");
      }
    } catch (error) {
      router.push("/articles");
    }
  };

  // 댓글 삭제
  const handleDeleteComment = (commentId) => {
    if (!confirm("정말로 이 댓글을 삭제하시겠습니까?")) return;
    setComments(comments.filter((c) => commentId !== c.id));
    setActiveCommentMenuId(null);
  };

  // 댓글 수정
  const handleEditComment = (commentId) => {
    alert(`댓글 수정창을 활성화합니다. (댓글 ID: ${commentId})`);
    setActiveCommentMenuId(null);
  };

  if (isLoading) {
    return (
      <div className="w-full py-32 text-center text-panda-400 font-medium">
        게시글을 불러오는 중입니다...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="w-full py-32 text-center text-panda-400 font-medium">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full pb-32 pt-6">
      {/*  본문 상세글 헤더  */}
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-bold text-panda-900 leading-snug">
          {article.title}
        </h1>

        <div className="flex justify-between items-center relative">
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 font-medium text-panda-900">
              <Image src={icProfile} alt="프로필" width={24} height={24} />
              {article.nickname || "익명"}
            </span>
            <span className="text-panda-400">
              {formatDate(article.createdAt)}
            </span>

            <div className="w-px h-3 bg-panda-200"></div>

            <span className="flex items-center gap-1.5 font-medium text-panda-500">
              <Image src={icHeart} alt="좋아요" width={16} height={16} />
              {article.likeCount || 0}
            </span>
          </div>

          <button
            onClick={() => setIsArticleMenuOpen(!isArticleMenuOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-panda-100 text-panda-400 font-bold transition-colors"
          >
            ⋮
          </button>

          {isArticleMenuOpen && (
            <div className="absolute right-0 top-10 w-[120px] bg-white border border-panda-200 rounded-xl shadow-lg z-10 py-1 overflow-hidden">
              <Link href={`/articles/${id}/edit`}>
                <button className="w-full px-4 py-2.5 text-center text-sm text-panda-900 hover:bg-panda-100 transition-colors">
                  수정하기
                </button>
              </Link>
              <button
                onClick={handleDeleteArticle}
                className="w-full px-4 py-2.5 text-center text-sm text-panda-900 hover:bg-panda-100 transition-colors"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-panda-200 mb-10"></div>

      {/*  본문 내용 및 댓글 */}
      <div className="flex flex-col gap-8 mb-16">
        <div className="min-h-[250px] text-panda-900 text-lg leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>

        {/* 댓글  */}
        <section className="flex flex-col">
          <h3 className="font-bold text-lg text-panda-900 mb-3">댓글달기</h3>

          {/* 댓글 입력창 및 등록 버튼 */}
          <div className="flex flex-col items-end gap-3 mb-8 w-full">
            <textarea
              placeholder="댓글을 입력해주세요."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full h-[104px] bg-panda-200 rounded-xl px-4 py-4 text-panda-900 placeholder-panda-400 focus:outline-none focus:bg-white focus:border focus:border-brand-blue resize-none text-sm transition-all"
            />
            <button
              disabled={!isCommentValid}
              className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isCommentValid
                  ? "bg-brand-blue text-white hover:bg-brand-hover shadow-md shadow-brand-blue/20"
                  : "bg-panda-400 text-white cursor-not-allowed"
              }`}
            >
              등록
            </button>
          </div>

          {/*  댓글 리스트 목록  */}
          <div className="flex flex-col bg-panda-50 rounded-xl">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex flex-col gap-4 px-6 py-5 border-b border-panda-200 relative"
                >
                  <p className="text-panda-900 text-base pr-8 whitespace-pre-wrap leading-relaxed">
                    {comment.content}
                  </p>

                  <div className="flex items-center gap-3">
                    <Image
                      src={icProfile}
                      alt="프로필"
                      width={36}
                      height={36}
                    />
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-medium text-panda-900 leading-tight">
                        {comment.nickname}
                      </span>
                      <span className="text-xs text-panda-400 mt-0.5">
                        {getTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setActiveCommentMenuId(
                        activeCommentMenuId === comment.id ? null : comment.id,
                      )
                    }
                    className="absolute right-6 top-5 w-7 h-7 flex items-center justify-center rounded-full hover:bg-panda-100 text-panda-400 font-bold transition-colors"
                  >
                    ⋮
                  </button>

                  {activeCommentMenuId === comment.id && (
                    <div className="absolute right-6 top-12 w-[120px] bg-white border border-panda-200 rounded-xl shadow-lg z-10 py-1 overflow-hidden">
                      <button
                        onClick={() => handleEditComment(comment.id)}
                        className="w-full px-4 py-2.5 text-center text-sm text-panda-900 hover:bg-panda-100 transition-colors"
                      >
                        수정하기
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="w-full px-4 py-2.5 text-center text-sm text-panda-900 hover:bg-panda-100 transition-colors"
                      >
                        삭제하기
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <Image
                  src={icBlank}
                  alt="댓글 없음 아이콘"
                  width={140}
                  height={140}
                  className="opacity-90"
                />
                <p className="text-panda-400 text-base font-medium leading-relaxed">
                  아직 댓글이 없어요,
                  <br />
                  지금 댓글을 달보세요
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="flex justify-center">
        <Link href="/articles">
          <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-brand-blue text-white font-semibold hover:bg-brand-hover transition-colors shadow-md shadow-brand-blue/20">
            <span className="text-base font-bold">목록으로 돌아가기</span>
            <Image
              src={icBack}
              alt="뒤로가기 화살표"
              width={20}
              height={20}
              className="brightness-0 invert"
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
