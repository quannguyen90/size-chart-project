export type Language = 'en' | 'vi';

export const LANGUAGES: Record<Language, { name: string; flag: string }> = {
  en: {
    name: "English",
    flag: "🇺🇸"
  },
  vi: {
    name: "Tiếng Việt",
    flag: "🇻🇳"
  }
} as const;

export const TRANSLATIONS = {
  en: {
    title: "Size Guide",
    searchPlaceholder: "Search product types...",
    chooseProductType: "Choose product type",
    noResults: "No product types found matching your search.",
    showMore: "Show More",
    collapse: "Collapse",
    loading: "Loading...",
    error: {
      noProductTypes: "No product types found.",
      loadFailed: "Failed to load product data"
    },
    measurements: {
      chest: "Chest - Measured across the chest one inch below armhole when laid flat.",
      bodyLength: "Body Length - Measured from high point of shoulder from front.",
      note: "(*) There might be ±1.0 inches difference due to manual measurement and production processes"
    }
  },
  vi: {
    title: "Hướng Dẫn Kích Thước",
    searchPlaceholder: "Tìm kiếm loại sản phẩm...",
    chooseProductType: "Chọn loại sản phẩm",
    noResults: "Không tìm thấy loại sản phẩm phù hợp.",
    showMore: "Xem Thêm",
    collapse: "Thu Gọn",
    loading: "Đang tải...",
    error: {
      noProductTypes: "Không tìm thấy loại sản phẩm.",
      loadFailed: "Không thể tải dữ liệu sản phẩm"
    },
    measurements: {
      chest: "Ngực - Đo ngang ngực cách nách 1 inch khi trải phẳng.",
      bodyLength: "Chiều dài - Đo từ điểm cao nhất của vai phía trước.",
      note: "(*) Có thể chênh lệch ±1.0 inch do đo thủ công và quy trình sản xuất"
    }
  }
} as const; 