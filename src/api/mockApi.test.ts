import { expect, describe, it } from "vitest";
import {
  getSizeChart,
  getProductCategories,
  mockSizeCharts,
  mockProductCategories,
} from "./mockApi";

describe("mockApi", () => {
  describe("getSizeChart", () => {
    it("should return the correct size chart when a valid ID is provided", async () => {
      const sizeChart = await getSizeChart("customer-1", "tshirt-1");
      expect(sizeChart).toEqual(mockSizeCharts[0]);
    });

    it("should return null when an invalid ID is provided", async () => {
      const sizeChart = await getSizeChart("customer-1", "non-existent-id");
      expect(sizeChart).toBeNull();
    });

    it("should correctly find size charts nested within product types", async () => {
      const sizeChart = await getSizeChart("customer-1", "pants-1");
      expect(sizeChart).toEqual(mockSizeCharts[1]);
    });
  });

  describe("getProductCategories", () => {
    it("should return the complete list of mock product categories", async () => {
      const categories = await getProductCategories();
      expect(categories).toEqual(mockProductCategories);
      expect(categories.length).toBe(mockProductCategories.length);
    });
  });
});
