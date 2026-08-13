export function getCategoryHref(categoryId: string): string {
  switch (categoryId) {
    case "film-products":
      return "/products/packaging-films";
    case "label-sticker-products":
      return "/products/plain-labels";
    case "tapes":
      return "/products/bopp-tapes";
    case "pp-strap":
    case "strapping":
      return "/products/pp-strap";
    default:
      return `/products/${categoryId}`;
  }
}
