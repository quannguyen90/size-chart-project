import { createSignal, onMount } from "solid-js";
import { useParams, A } from "@solidjs/router";
import { getProductTypeById, type ProductType } from "../api/mockApi";

export default function ProductTypeDetail() {
  const params = useParams();
  const [productType, setProductType] = createSignal<ProductType | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  onMount(async () => {
    try {
      const type = await getProductTypeById(params.id);
      setProductType(type);
    } catch (err) {
      setError("Failed to load product type details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <A
          href="/guide"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Guide
        </A>

        {loading() ? (
          <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        ) : error() ? (
          <div class="text-center text-red-600">{error()}</div>
        ) : productType() ? (
          <div>
            <div class="text-center mb-8">
              <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl">
                {productType()?.name}
              </h1>
              <p class="mt-3 text-xl text-gray-500">
                {productType()?.description}
              </p>
            </div>

            <div class="grid gap-8">
              {productType()?.sizeCharts.map((chart) => (
                <div class="bg-white rounded-lg shadow-md p-6">
                  <h2 class="text-2xl font-semibold text-gray-900 mb-4">
                    {chart.name}
                  </h2>
                  <p class="text-gray-600 mb-6">{chart.description}</p>

                  <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Size
                          </th>
                          {chart.measurements.map((measurement) => (
                            <th
                              scope="col"
                              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {measurement.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        {chart.measurements[0].values.map((_, sizeIndex) => (
                          <tr>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {chart.measurements[0].values[sizeIndex].size}
                            </td>
                            {chart.measurements.map((measurement) => (
                              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {measurement.values[sizeIndex].value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div class="text-center text-gray-600">
            Product type not found
          </div>
        )}
      </div>
    </div>
  );
} 