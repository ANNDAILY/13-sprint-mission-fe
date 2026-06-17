"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ArticleEditPage() {
  const { id } = useParams();
  const router = useRouter();

  // 기존 원본 데이터를 기억하기 위한 원본 상태 추가 (비교용)
  const [originalData, setOriginalArticleData] = useState({
    title: "",
    content: "",
  });

  // 사용자가 입력창에 채우는 변경 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //글자 유효성 검사  "기존 내용에서 변경시" 버튼을 활성화
  const isTextChanged =
    title.trim() !== originalData.title ||
    content.trim() !== originalData.content;
  const isFormValid =
    title.trim().length > 0 && content.trim().length > 0 && isTextChanged;

  //  기존 게시글 데이터를 GET
  useEffect(() => {
    const fetchOriginalArticle = async () => {
      try {
        const response = await fetch(`https://your-api-url.com/articles/${id}`);

        if (response.ok) {
          const data = await response.json();

          setOriginalArticleData({ title: data.title, content: data.content });
          setTitle(data.title);
          setContent(data.content);
        } else {
          throw new Error("API 연동 전");
        }
      } catch (error) {
        // 확인용 더미 데이터
        const dummyTitle = "판다마켓 너무 편리하고 좋아요. 자주 이용할게요.";
        const dummyContent =
          "이번에 판다마켓에서 처음으로 중고 거래를 해봤는데, 앱도 너무 깔끔하고 거래 과정도 매끄러워서 정말 좋았습니다!\n\n앞으로도 안 쓰는 물건이 생기면 자주 이용할 거 같아요. 판다마켓 화이팅! 🐼💙";

        setOriginalArticleData({ title: dummyTitle, content: dummyContent });
        setTitle(dummyTitle);
        setContent(dummyContent);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchOriginalArticle();
  }, [id]);

  // PATCH 데이터 수정 제출
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await fetch(`https://your-api-url.com/articles/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (response.ok) {
        alert("성공적으로 수정되었습니다!");
        router.push(`/articles/${id}`);
      } else {
        alert("성공적으로 수정되었습니다! (더미 동작 적용)");
        router.push(`/articles/${id}`);
      }
    } catch (error) {
      alert("성공적으로 수정되었습니다! (더미 동작)");
      router.push(`/articles/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-32 text-center text-panda-400 font-medium">
        기존 게시글 데이터를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="w-full pb-20 pt-6">
      <form onSubmit={handleUpdate} className="flex flex-col gap-8">
        {/*  상단 헤더  */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-panda-900">게시글 수정하기</h2>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-8 py-3 rounded-xl font-semibold text-base transition-colors ${
              isFormValid
                ? "bg-brand-blue text-white hover:bg-brand-hover shadow-md shadow-brand-blue/20"
                : "bg-panda-400 text-white cursor-not-allowed"
            }`}
          >
            수정
          </button>
        </div>

        <div className="w-full h-px bg-panda-200"></div>

        {/*  입력 폼 영역  */}
        <div className="flex flex-col gap-6">
          {/* 제목 입력 필드 */}
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-semibold text-panda-900 mb-3"
            >
              *제목
            </label>

            <input
              id="title"
              type="text"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-panda-200 text-panda-900 placeholder-panda-400 px-6 py-4 rounded-2xl border border-transparent focus:outline-none focus:bg-white focus:border-brand-blue transition-all"
            />
          </div>

          {/* 내용 입력 필드 */}
          <div>
            <label
              htmlFor="content"
              className="block text-lg font-semibold text-panda-900 mb-3"
            >
              *내용
            </label>

            <textarea
              id="content"
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[400px] bg-panda-200 text-panda-900 placeholder-panda-400 px-6 py-4 rounded-2xl border border-transparent focus:outline-none focus:bg-white focus:border-brand-blue transition-all resize-none leading-relaxed"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
