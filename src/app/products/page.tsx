import MeowArticle from '@/components/MeowArticle';
import { getProducts } from '@/service/products';
import Link from 'next/link';
// import clothesImage from '../../../public/images/clothes.jpg';///

// export const revalidate = 3;
export default async function ProductsPage() {
  // throw new Error();
  //서버 파일(데이터베이스)에 있는 제품의 리스트를 읽어와서, 그걸 보여줌.
  const products = await getProducts();

  return (
    <>
      <h1>제품설명 페이지</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            <Link href={`/products/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
      <MeowArticle />
    </>
  );
}
