"use client"
import { getProductBySlug } from "@/lib/api";
import Carousel from "@/components/ui/carousel";
import { BadfairyLogoSVG } from "@/components/BadfairyLogoSVG";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { Product } from "@/app/utils/product";
import { Photo } from "@/app/utils/product";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import useSWR from "swr";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const router = useRouter();

  const contactIg = () => {
    window.open("https://ig.me/m/badfairy.cl", "_blank");
  };

  const { data: productData } = useSWR(slug, getProductBySlug, {
    revalidateOnFocus: false,
    dedupingInterval: 600000, // 10 min
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(false);
      setProduct(await productData);
      setPhotos(productData.morePhotos?.length ? productData.morePhotos : [productData.cover.formats.small])
    };
    fetchProduct();
  }, [params, photos]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <BadfairyLogoSVG className="w-48 h-48 animate-pulse" fill="black" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen w-full justify-center items-center flex-col">
        <BadfairyLogoSVG className="w-48 h-48" fill="black" />
        <h2 className="font-bold">Algo malió sal! :/</h2>
        <h1 className="font-black text-2xl text-red-500">404: Producto no encontrado</h1>
        <Button onClick={() => router.push("/")} variant="outline" size="lg" className="mt-4 font-bold">
          Volver al inicio
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-center mb-6">
        <BadfairyLogoSVG fill="black" className="h-24 w-24 cursor-pointer" onClick={() => router.push("/")} />
      </div>
      <span className="text-blue-800 pl-6 md:justify-center cursor-pointer" onClick={() => router.push("/")}> &#10094; Volver a inicio</span>
      <div className="flex flex-col md:flex-row items-center justify-center py-12 2xl:px-20 md:px-6 px-4">
        <div className="w-full overflow-hidden rounded-xl">
        {/* Carrusel de imágenes */}
          <Carousel images={photos} />
        </div>
        <div className="md:w-1/2 lg:ml-8 md:ml-6 mt-6 md:mt-0 w-full">
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">{product.title}</h1>
            <p className="text-xl text-gray-800 mt-2">
              {new Intl.NumberFormat("es-CL", { currency: "CLP", style: "currency" }).format(product.price)}
            </p>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center">
            <p className="text-lg text-gray-800 mr-2">Categorías:</p>
            <h2 className="font-bold text-lg">{product.categories.map((c) => c.name).join(", ")}</h2>
          </div>
          <Button className="mt-4 w-full bg-gray-800 text-white py-4 hover:bg-gray-700 flex items-center justify-center"
            onClick={contactIg}>
            <MessageCircle className="mr-2 h-4 w-4 animate-bounce" /> Contactar a Instagram
          </Button>
          <div className="mt-7">
            <p className="text-base text-gray-600">Descripción:</p>
            <h3 className="text-base text-gray-600 mt-2" style={{whiteSpace: 'pre-wrap'}}>{product.description}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}