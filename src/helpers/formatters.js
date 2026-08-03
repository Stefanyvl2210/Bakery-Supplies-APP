import { BackendUrl } from "./url";

export const formatMoney = (value, currency = "USD") => {
  const numericValue = Number(value || 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(numericValue);
};

export const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString();
};

export const formatDateTime = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString();
};

export const formatStatus = (value) =>
  String(value || "-")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export const parseAddressValue = (value) => {
  if (!value) return "";

  if (typeof value === "object") {
    return [value.address, value.city, value.state].filter(Boolean).join(", ");
  }

  try {
    const parsed = JSON.parse(value);

    return parseAddressValue(parsed);
  } catch {
    return value;
  }
};

export const getImageUrl = (value) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value) || value.startsWith("data:")) return value;

  return `${BackendUrl}/${String(value).replace(/^\/+/, "")}`;
};

export const formatAccountDetails = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.join("\n");
  if (typeof value === "object") {
    if (typeof value.details === "string") return value.details;

    return Object.entries(value)
      .map(([key, entryValue]) => `${key}: ${entryValue}`)
      .join("\n");
  }

  return String(value);
};

export const productCategoryMatches = (product, categorySlugOrName) => {
  if (!categorySlugOrName) return true;

  const target = String(categorySlugOrName).toLowerCase();
  const categories = Array.isArray(product?.categories) ? product.categories : [];

  return (
    product?.category === categorySlugOrName ||
    categories.some((category) => {
      const slug = String(category?.slug || "").toLowerCase();
      const name = String(category?.name || "").toLowerCase();

      return slug === target || name === target;
    })
  );
};
