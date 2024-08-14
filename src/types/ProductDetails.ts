// ProductDetails.ts

export interface Money {
  currency: string;
  value: number;
  __typename: string;
}

export interface Price {
  regularPrice: {
      amount: Money;
      __typename: string;
  };
  __typename: string;
}

export interface ProductDiscount {
  amount_off: number;
  percent_off: number;
  __typename: string;
}

export interface ProductPrice {
  discount?: ProductDiscount;
  final_price: Money;
  regular_price: Money;
  __typename: string;
}

export interface PriceRange {
  minimum_price: ProductPrice;
  __typename: string;
}

export interface ProductLabel {
  active_from: string;
  active_to: string;
  background_color: string;
  label_id: number | null;
  label_text: string;
  name: string;
  text_color: string;
  __typename: string;
}

export interface ProductImage {
  url: string;
  __typename: string;
}

export interface BrandInfo {
  img_src: string;
  title: string;
  url: string;
  __typename: string;
}

export interface Breadcrumb {
  category_id: number;
  category_name: string;
  category_url_key: string;
  category_url_path: string;
  __typename: string;
}

export interface CategoryTree {
  breadcrumbs: Breadcrumb[] | null;
  level: number;
  id: number;
  name: string;
  url_path: string;
  url_key: string;
  __typename: string;
}

export interface MediaGalleryEntry {
  disabled: boolean;
  file: string;
  id: number;
  label: string | null;
  position: number;
  uid: string;
  __typename: string;
}

export interface ProductDetails {
  language: string;
  redirect_code: number;
  relative_url: string;
  type: string;
  amrma_default_resolution_period: number;
  brand: number;
  brand_info: BrandInfo;
  categories: CategoryTree[];
  cautions: string;
  cross_border_product: {
      is_allowed: boolean;
      disallow_countries: string;
      __typename: string;
  };
  description: {
      html: string;
      __typename: string;
  };
  dimensions: string;
  features: string;
  id: number;
  is_yalla: string[];
  media_gallery: ProductImage[];
  meta_description: string;
  meta_title: string;
  name: string;
  pkgdimensions: string;
  price: Price;
  price_range: PriceRange;
  base_price_range: PriceRange;
  usd_price_range: PriceRange;
  product_label: ProductLabel;
  rating_summary: number;
  recom_age: string;
  review_count: number;
  reviews: {
      items: any[]; // Define further if review structure is known
      page_info: {
          page_size: number;
          total_pages: number;
          __typename: string;
      };
      __typename: string;
  };
  shipping_weight: number | null;
  sku: string;
  small_image: ProductImage;
  stock_status: string;
  uid: string;
  url_key: string;
  weight: number;
  __typename: string;
  options: any | null; // Define further if options structure is known
}

// Interface for the response structure
export interface ProductsResponse {
  data: {
      product: ProductDetails[]
  };
}

