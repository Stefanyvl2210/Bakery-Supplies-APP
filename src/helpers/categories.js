export const CATALOG_SECTIONS = Object.freeze({
  desserts: {
    slug: "desserts",
    title: "Desserts",
  },
  "utensils-and-ingredients": {
    slug: "utensils-and-ingredients",
    title: "Utensils and Ingredients",
  },
});

export const CATALOG_ROOT_SLUGS = Object.freeze(
  Object.keys(CATALOG_SECTIONS)
);

export const isCatalogRoot = (category) =>
  CATALOG_ROOT_SLUGS.includes(String(category?.slug || "").toLowerCase());

export const getCatalogRootCategories = (categories = []) =>
  categories.filter(isCatalogRoot);

export const findCatalogRoot = (categories = [], slug = "") => {
  const normalizedSlug = String(slug).toLowerCase();

  return categories.find(
    (category) =>
      isCatalogRoot(category) &&
      String(category.slug).toLowerCase() === normalizedSlug
  );
};

export const flattenCategoryTree = (categories = []) =>
  categories.flatMap((category) => [
    category,
    ...flattenCategoryTree(Array.isArray(category.children) ? category.children : []),
  ]);

export const flattenCategoryChildren = (category) =>
  flattenCategoryTree(Array.isArray(category?.children) ? category.children : []);

export const getCategoryAndDescendantIds = (categories = [], categoryId) => {
  const ids = new Set([String(categoryId)]);
  let foundChild = true;

  while (foundChild) {
    foundChild = false;

    categories.forEach((category) => {
      if (
        ids.has(String(category.parent_id)) &&
        !ids.has(String(category.id))
      ) {
        ids.add(String(category.id));
        foundChild = true;
      }
    });
  }

  return ids;
};

export const getCatalogSectionPath = (slug) =>
  `/products?category=${encodeURIComponent(slug)}`;
