import { createSignal, onMount, onCleanup } from "solid-js";
import { useParams } from "@solidjs/router";
import { getSizeChart, type SizeChart } from "../api/mockApi";
import { TRANSLATIONS, LANGUAGES, type Language } from "../constants/translations";

function SizeChartEmbed() {
  const params = useParams();
  const [sizeChart, setSizeChart] = createSignal<SizeChart | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = createSignal<Language>('en');

  const t = () => TRANSLATIONS[currentLanguage()];

  // Function to send height to parent
  const sendHeightToParent = () => {
    const height = document.documentElement.scrollHeight;
    window.parent.postMessage({ type: 'resize', height }, '*');
  };

  onMount(async () => {
    try {
      // Get URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const languageParam = urlParams.get('language') as Language | null;

      if (languageParam && Object.keys(LANGUAGES).includes(languageParam)) {
        setCurrentLanguage(languageParam);
      }

      const { customerId, sizeChartId } = params;
      if (!customerId || !sizeChartId) {
        setError("Customer ID and Size Chart ID are required");
        return;
      }

      const chart = await getSizeChart(customerId, sizeChartId);
      setSizeChart(chart);

      // Send initial height
      sendHeightToParent();

      // Set up resize observer to detect content changes
      const resizeObserver = new ResizeObserver(() => {
        sendHeightToParent();
      });
      resizeObserver.observe(document.body);

      // Clean up observer on unmount
      onCleanup(() => {
        resizeObserver.disconnect();
      });
    } catch (err) {
      setError(t().error.loadFailed);
      console.error(err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="bg-white p-4 rounded-lg shadow-md">
      {loading() ? (
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-[#F48220]"></div>
        </div>
      ) : error() ? (
        <div class="text-center text-red-600">{error()}</div>
      ) : sizeChart() && (
        <>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">{sizeChart()?.name}</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  {sizeChart()?.measurements.map(measurement => (
                    <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {measurement.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {sizeChart()?.measurements[0].values.map((_, sizeIndex) => (
                  <tr class="group hover:bg-[#FFF5ED] transition-colors duration-150 cursor-pointer">
                    {sizeChart()?.measurements.map(measurement => (
                      <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 group-hover:text-[#F48220]">
                        {measurement.values[sizeIndex].value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="mt-4 text-sm text-gray-600">
            <p>{t().measurements.chest}</p>
            <p>{t().measurements.bodyLength}</p>
            <p>{t().measurements.note}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default SizeChartEmbed; 