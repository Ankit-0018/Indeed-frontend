import { fetchProductById } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductDetailsWrapper from './ProductDetailsWrapper';

export default async function ProductPage({ params }) {
  const { id } = params;


  if (!id) {
    notFound();
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl">
      <ProductDetailsWrapper productId={id} />
    </div>
  );
}
