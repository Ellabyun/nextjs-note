import NotFoundPage from '@/app/not-found';
import { getProduct, getProducts } from '@/service/products';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import GoProductButton from '@/components/GoProductButton';

export const revalidate = 3;
type Props = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Props) {
  return {
    title: `제품의 이름: ${params.slug}`,
  };
}
export default async function ProductPage({ params: { slug } }: Props) {
  const product = await getProduct(slug);
  if (!product) {
    redirect('/products');
  } else {
    // 서버 파일에 있는 데이터중 해당 제품의 정보를 찾아서 그걸 보여줌
    return (
      <>
        <h1>{product.name} 상품 설명 페이지</h1>
        <Image
          src={product.pic}
          alt={product.name}
          width={400}
          height={400}
          priority
        />
        <GoProductButton />
      </>
    );
  }
}

//특정 경로에 대해서 미리 페이지를 만들고 싶을때
export async function generateStaticParams() {
  //모든 제품의 페이지들을 미리 만들어 줄 수 있게 해 줌(SSG)
  const products = await getProducts();
  return products.map((product) => ({ slug: product.id }));
}
