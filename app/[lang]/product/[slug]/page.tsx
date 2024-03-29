import React from "react";
import { Metadata } from "next";
import ImageGallery from "@/app/component/ImageGallery";
import Rating from "@/app/component/Rating";
import ProductPrice from "@/app/component/ProductPrice";
import ProductLeft from "@/app/component/ProductLeft";
import FootprintStackedLayout from "@/app/component/Footprint";
import SimilarProduct from "@/app/component/SimilarProduct";
import Attribute from "@/app/component/Attribute";
import { getProductData } from "@/app/requests/product.page";
import { getDictionary } from "@/app/getDictionary";
import AddToCartComponent from "@/app/component/AddToCart";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const ProductPage = async ({
  params,
}: {
  params: {
    lang: string;
  };
}) => {
  const lang = await getDictionary(params.lang);
  const productData = await getProductData();

  metadata.title = productData?.product?.name;
  metadata.description = productData?.product?.description || "";

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-6">
          <ImageGallery
            images={productData?.product?.images}
            propKey="url_link"
          />
        </div>
        <div className="md:col-span-6 px-4 py-4">
          <div className="font-bold text-xl mb-2">
            {productData?.product.name}
          </div>

          <Rating rating={productData?.product?.google_review} />
          <ProductLeft count={productData?.product?.amount} params={lang} />
          <ProductPrice
            price={productData?.product?.selling_price}
            discountedPrice={productData?.product?.discounted_price}
          />

          <AddToCartComponent product={productData.product} params={lang} />

          <p className="text-gray-700 text-sm font-medium">
            {productData?.product.description}
          </p>

          <FootprintStackedLayout footprintData={productData?.foot_print} />
          <Attribute
            attributes={productData?.product.attributes}
            params={lang}
          />
        </div>
      </div>
      <hr />

      <SimilarProduct data={productData?.similar_product} params={lang} />
      <hr />
    </div>
  );
};

export default ProductPage;
