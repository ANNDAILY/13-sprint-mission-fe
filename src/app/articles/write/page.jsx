"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ArticleWritePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isFormValid = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/articles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        },
      );

      if (response.ok) {
        const newArticle = await response.json();

        router.push(`/articles/${newArticle.id}`);
      } else {
        alert("게시글 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("네트워크 에러가 발생했습니다.");
    }
  };

  return (
    <div className="w-full pb-20 pt-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-panda-900">게시글 쓰기</h2>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-8 py-3 rounded-xl font-semibold text-base transition-colors ${
              isFormValid
                ? "bg-brand-blue text-white hover:bg-brand-hover shadow-md shadow-brand-blue/20"
                : "bg-panda-300 text-white cursor-not-allowed"
            }`}
          >
            등록
          </button>
        </div>
        <div className="w-full h-px bg-panda-200"></div>{" "}
        <div className="flex flex-col gap-6">
          {/* 제목 입력 */}
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
              className="w-full bg-panda-100 text-panda-900 placeholder-panda-400 px-6 py-4 rounded-2xl border border-transparent focus:outline-none focus:bg-white focus:border-brand-blue transition-all"
            />
          </div>

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
              className="w-full h-[400px] bg-panda-100 text-panda-900 placeholder-panda-400 px-6 py-4 rounded-2xl border border-transparent focus:outline-none focus:bg-white focus:border-brand-blue transition-all resize-none leading-relaxed"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
