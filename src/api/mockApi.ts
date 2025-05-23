// Types
export interface SizeChart {
  id: string;
  name: string;
  description: string;
  measurements: {
    name: string;
    values: {
      size: string;
      value: string;
    }[];
  }[];
}

export interface ProductType {
  id: string;
  name: string;
  description: string;
  sizeCharts: SizeChart[];
  image?: string;
}

export interface ProductCategory {
    id: string;
    name: string;
    productTypes: ProductType[];
}

// Mock Data
const mockSizeCharts: SizeChart[] = [
  {
    id: "tshirt-1",
    name: "T-Shirt Size Chart",
    description: "Standard T-Shirt sizing guide",
    measurements: [
      {
        name: "Chest (Front Only)",
        values: [
          { size: "S", value: "18" },
          { size: "M", value: "20" },
          { size: "L", value: "22" },
          { size: "XL", value: "24" },
          { size: "2XL", value: "26" },
          { size: "3XL", value: "28" },
          { size: "4XL", value: "30" },
          { size: "5XL", value: "32" },
          { size: "6XL", value: "34" },
        ],
      },
      {
        name: "Body Length",
        values: [
          { size: "S", value: "28" },
          { size: "M", value: "29" },
          { size: "L", value: "30" },
          { size: "XL", value: "31" },
          { size: "2XL", value: "32" },
          { size: "3XL", value: "33" },
          { size: "4XL", value: "34" },
          { size: "5XL", value: "35" },
          { size: "6XL", value: "36" },
        ],
      }
    ],
  },
  {
    id: "pants-1",
    name: "Pants Size Chart",
    description: "Standard Pants sizing guide",
    measurements: [
      {
        name: "Waist",
        values: [
          { size: "28", value: "28" },
          { size: "30", value: "30" },
          { size: "32", value: "32" },
          { size: "34", value: "34" },
        ],
      },
      {
        name: "Length",
        values: [
          { size: "28", value: "30" },
          { size: "30", value: "32" },
          { size: "32", value: "34" },
          { size: "34", value: "36" },
        ],
      },
    ],
  },
];

const mockProductTypes: ProductType[] = [
  {
    id: "classic-tee",
    name: "Classic Tee",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Classic+Tee",
  },
  {
    id: "women-tee",
    name: "Women Tee",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Women+Tee",
  },
  {
    id: "pullover-hoodie",
    name: "Pullover Hoodie",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Hoodie",
  },
  {
    id: "long-sleeve",
    name: "Long Sleeve",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Long+Sleeve",
  },
  {
    id: "pullover-sweatshirt",
    name: "Pullover Sweatshirt",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Sweatshirt",
  },
  {
    id: "youth-tee",
    name: "Youth Tee",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Youth+Tee",
  },
  {
    id: "unisex-tank-top",
    name: "Unisex Tank Top",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Tank+Top",
  },
  {
    id: "women-tank-top",
    name: "Women Tank Top",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Women+Tank",
  },
  {
    id: "v-neck-tee",
    name: "V-Neck Tee",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=V-Neck",
  },
  {
    id: "crew-neck-sweater",
    name: "Crew Neck Sweater",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Sweater",
  },
  {
    id: "zip-up-hoodie",
    name: "Zip-Up Hoodie",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Zip+Hoodie",
  },
  {
    id: "raglan-tee",
    name: "Raglan Tee",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Raglan",
  },
  {
    id: "baseball-tee",
    name: "Baseball Tee",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Baseball",
  },
  {
    id: "henley-tee",
    name: "Henley Tee",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Henley",
  },
  {
    id: "polo-shirt",
    name: "Polo Shirt",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Polo",
  },
  {
    id: "turtleneck",
    name: "Turtleneck",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Turtleneck",
  },
  {
    id: "sleeveless-tee",
    name: "Sleeveless Tee",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Sleeveless",
  },
  {
    id: "muscle-tee",
    name: "Muscle Tee",
    description: "",
    sizeCharts: [mockSizeCharts[0]],
    image: "https://placehold.co/200x200/FFF5ED/F48220?text=Muscle+Tee",
  }
];

const mockProductCategories: ProductCategory[] = [
    {
        id: "apparel",
        name: "Apparel",
        productTypes: mockProductTypes,
    },
    {
        id: "drinkware",
        name: "Drinkware",
        productTypes: [],
    },
    {
        id: "homedecor",
        name: "Home Decor",
        productTypes: [],
    },
     {
        id: "woodenmade",
        name: "Wooden Made",
        productTypes: [],
    },
];

// API Functions
export const getSizeChart = async (
  customerId: string,
  sizeChartId: string
): Promise<SizeChart | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // First check in mockSizeCharts array
  const directChart = mockSizeCharts.find(chart => chart.id === sizeChartId);
  if (directChart) {
    return directChart;
  }

  // If not found, check in product types (ignore customerId for mock)
  let foundSizeChart: SizeChart | null = null;
  for (const category of mockProductCategories) {
    for (const productType of category.productTypes) {
      const chart = productType.sizeCharts.find(chart => chart.id === sizeChartId);
      if (chart) {
        foundSizeChart = chart;
        break;
      }
    }
    if (foundSizeChart) break;
  }

  return foundSizeChart;
};
