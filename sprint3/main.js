import dayjs from "dayjs";
import * as ArticleService from "./ArticleService.js";
import * as ProductService from "./ProductService.js";

async function runAllTests() {
  console.log(" --- API 테스트 시작 --- ");

  try {
    // 1. Product POST (생성)
    const newProduct = await ProductService.createProduct({
      name: "테스트 상품",
      price: 10000,
      description: "테스트내용",
      tags: ["테스트1", "테스트2"],
      images: ["https://example.com/a.jpg"],
    });
    console.log("1 결과: 생성 성공 (ID:", newProduct.id, ")");

    // 2. Product GET (목록 조회)
    const productList = await ProductService.getProductList({
      page: 1,
      pageSize: 5,
    });
    console.log(`2 결과: ${productList.list?.length || 0}개의 상품 조회됨`);

    // 3. Product GET (상세 조회)
    const productDetail = await ProductService.getProduct(newProduct.id);
    console.log(
      "3 결과: 상세 데이터 수신 성공 (이름:",
      productDetail.name,
      ")",
    );

    // 4. Product PATCH (수정)
    const patchedProduct = await ProductService.patchProduct(newProduct.id, {
      price: 20000,
    });
    console.log(
      "4 결과: 가격 수정 완료 (변경된 가격:",
      patchedProduct.price,
      ")",
    );

    // 5. Product DELETE (삭제)
    const deleteProductRes = await ProductService.deleteProduct(newProduct.id);

    console.log(
      "5 결과:",
      deleteProductRes.success ? "삭제 성공" : "삭제 실패",
    );

    // 6. Article POST (생성)
    const newArticle = await ArticleService.createArticle({
      title: "Article 테스트",
      content: "테스트하고있습니다.",
      image: "https://example.com/b.jpg",
    });
    console.log("6 결과: 게시글 등록 성공 (ID:", newArticle.id, ")");

    // 7. Article GET (목록 조회)
    const articleList = await ArticleService.getArticleList({
      page: 1,
      pageSize: 3,
    });
    console.log("7 결과: 게시글 목록 조회 성공 (ID:", newArticle.id, ")");

    // 8. Article GET (상세 조회)
    const articleDetail = await ArticleService.getArticle(newArticle.id);
    console.log(
      "8 결과: 게시글 데이터 수신 성공 (제목:",
      articleDetail.title,
      ")",
    );

    // 9. Article PATCH (수정)
    const patchedArticle = await ArticleService.patchArticle(newArticle.id, {
      title: "수정 제목",
    });
    console.log(
      "9 결과: 제목 수정 완료 (변경된 제목:",
      patchedArticle.title,
      ")",
    );

    // 10. Article DELETE (삭제)
    const deleteArticleRes = await ArticleService.deleteArticle(newArticle.id);
    console.log(
      "10 결과:",
      deleteArticleRes.success ? "삭제 성공" : "삭제 실패",
    );
  } catch (error) {
    console.error("\n❌ 테스트 중 오류가 발생했습니다:", error.message);
  }

  console.log("\n--- 10가지 항목 테스트 완료 ---");
}

runAllTests();
