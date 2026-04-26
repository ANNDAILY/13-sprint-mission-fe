const BASE_URL = "https://panda-market-api-crud.vercel.app";

// 1. 상품 목록 조회 (GET)
export async function getProductList({
  page = 1,
  pageSize = 10,
  keyword = "",
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    keyword: keyword,
  });

  try {
    const response = await fetch(`${BASE_URL}/products?${params.toString()}`);

    if (!response.ok) {
      console.error(`목록 조회 실패 (상태 코드: ${response.status})`);
      throw new Error("목록을 조회 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("네트워크 오류:", error.message);
    throw error;
  }
}

// 2. 상품 상세 조회 (GET)
export async function getProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
      console.error(`상세 조회 실패 (상태 코드: ${response.status})`);
      throw new Error("상세 정보를 조회");
    }

    return await response.json();
  } catch (error) {
    console.error("네트워크 오류:", error.message);
    throw error;
  }
}

// 3. 상품 생성 (POST)
export async function createProduct({
  name,
  description,
  price,
  tags,
  images,
}) {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, price, tags, images }),
    });

    if (!response.ok) {
      console.error(`생성 실패 (상태 코드: ${response.status})`);
      throw new Error("상품 등록 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("네트워크 오류:", error.message);
    throw error;
  }
}

// 4. 상품 수정 (PATCH)
export async function patchProduct(id, updateData) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      console.error(`수정 실패 (상태 코드: ${response.status})`);
      throw new Error("수정에 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("네트워크 오류:", error.message);
    throw error;
  }
}

// 5. 상품 삭제 (DELETE)
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error(`삭제 실패 (상태 코드: ${response.status})`);
      throw new Error("삭제에 실패");
    }

    return { success: true };
  } catch (error) {
    console.error("네트워크 오류:", error.message);
    throw error;
  }
}
