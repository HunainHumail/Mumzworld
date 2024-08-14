export interface ProductPrice {
  amount: {
    currency: string;
    value: number;
  }
}

export interface Price {
    currency: string;
    value: number;
}


export interface Price {
  currency: string;
  value: number;
}


export interface PriceRange {
  minimum_price: {
    final_price: Price;
    regular_price: Price;
    discount?: {
      amount_off: number;
      percent_off: number;
    };
  };
}

export interface BrandInfo {
  title: string;
}

export interface CategoryTree {
  name: string;
}

export interface ProductImage {
  url: string;
}

export interface ProductLabel {
  active_from: string;
  active_to: string;
  background_color: string;
  label_id: number | null;
  label_text: string;
  name: string;
  text_color: string;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  brand: number;
  brand_info: BrandInfo;
  categories: CategoryTree[];
  is_yalla: string[];
  low_stock_qty: number | null;
  price: {
    regularPrice: ProductPrice;
  };
  price_range: PriceRange;
  base_price_range: PriceRange;
  usd_price_range: PriceRange;
  product_label: ProductLabel;
  small_image: ProductImage;
  stock_status: string;
  type_id: string;
  uid: string;
  url_key: string;
  url_suffix: string;
}
