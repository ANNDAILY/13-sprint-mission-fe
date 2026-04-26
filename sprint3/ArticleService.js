const BASE_URL = "https://panda-market-api-crud.vercel.app";

// 1. 게시글 목록 조회 (GET)
export function getArticleList({ page = 1, pageSize = 10, keyword = "" }) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    keyword: keyword,
  });

  return fetch(`${BASE_URL}/articles?${params.toString()}`)
    .then((response) => {
      if (!response.ok) throw new Error("목록 조회 실패");
      return response.json();
    })
    .catch((error) => console.error(error.message));
}

// 2. 게시글 상세 조회 (GET)
export function getArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`)
    .then((response) => {
      if (!response.ok) {
        console.error(
          `로그 에러: 상세 조회 실패 (상태 코드: ${response.status})`,
        );
        throw new Error("데이터를 불러오지 못했습니다.");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("로그 에러: 네트워크 또는 기타 오류 -", error.message);
    });
}

// 3. 게시글 생성 (POST)
export function createArticle({ title, content, image }) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, image }),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`로그 에러: 생성 실패 (상태 코드: ${response.status})`);
        throw new Error("게시글 생성에 실패했습니다.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("게시글 생성 완료:", data);
      return data;
    })
    .catch((error) => {
      console.error("생성 중 오류 발생 -", error.message);
    });
}
// 4. 게시글 수정 (PATCH)
export function patchArticle(id, { title, content, image }) {
  const bodyData = {};
  if (title) bodyData.title = title;
  if (content) bodyData.content = content;
  if (image) bodyData.image = image;

  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`수정 실패 (상태 코드: ${response.status})`);
        throw new Error("수정에 실패");
      }
      return response.json();
    })
    .then((data) => {
      console.log("수정 완료:", data);
      return data;
    })
    .catch((error) => {
      console.error("수정 중 오류 발생 -", error.message);
    });
}

// 5. 게시글 삭제 (DELETE)
export function deleteArticle(id) {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        console.error(`삭제 실패 (상태 코드: ${response.status})`);
        throw new Error("게시글 삭제에 실패");
      }
      console.log(`${id} 삭제 성공`);
      return { success: true };
    })
    .catch((error) => {
      console.error("삭제 중 오류 발생 -", error.message);
    });
}
