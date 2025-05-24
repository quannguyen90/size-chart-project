import { createSignal, onMount, Show } from "solid-js";
import { getProductCategories, type ProductCategory, type ProductType, type SizeChart } from "../api/mockApi";
import { THEME } from "../constants/theme";
import { TRANSLATIONS, LANGUAGES, type Language } from "../constants/translations";

function Guide() {
  const [productTypes, setProductTypes] = createSignal<ProductType[]>([]);
  const [selectedProductType, setSelectedProductType] = createSignal<ProductType | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [currentPage, setCurrentPage] = createSignal(1);
  const [currentLanguage, setCurrentLanguage] = createSignal<Language>('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = createSignal(false);
  const pageSize = 18;
  const [totalPages, setTotalPages] = createSignal(1);

  const t = () => TRANSLATIONS[currentLanguage()];

  const updateUrlParams = (params: Record<string, string>) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.pushState({}, '', url.toString());
  };

  const handleLanguageSelect = (lang: Language) => {
    setCurrentLanguage(lang);
    setShowLanguageDropdown(false);
    updateUrlParams({ language: lang });
  };

  onMount(async () => {
    try {
      // Get URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const productTypeId = urlParams.get('product_type');
      const languageParam = urlParams.get('language') as Language | null;

      // Set initial language from URL parameter if valid
      if (languageParam && Object.keys(LANGUAGES).includes(languageParam)) {
        setCurrentLanguage(languageParam);
      }

      const categories = await getProductCategories();
      if (categories.length > 0 && categories[0].productTypes.length > 0) {
        const types = categories[0].productTypes;
        setProductTypes(types);
        // Calculate total pages based on filtered types and pageSize
        setTotalPages(Math.ceil(types.length / pageSize));

        if (productTypeId) {
          // Find and select the product type that matches the ID
          const matchingType = types.find(type => type.id === productTypeId);
          if (matchingType) {
            setSelectedProductType(matchingType);
          } else {
            // If no matching type found, select the first one
            setSelectedProductType(types[0]);
          }
        } else {
          // If no product_type parameter, select the first type
          setSelectedProductType(types[0]);
        }
      } else {
        setError(t().error.noProductTypes);
      }
    } catch (err) {
      setError(t().error.loadFailed);
      console.error(err);
    } finally {
      setLoading(false);
    }
  });

  const handleProductTypeSelect = (productType: ProductType) => {
    setSelectedProductType(productType);
    updateUrlParams({ product_type: productType.id });
  }

  const filteredProductTypes = () => {
    const query = searchQuery().toLowerCase();
    return productTypes()
      .filter(type => type.name.toLowerCase().includes(query));
  };

  const paginatedProductTypes = () => {
    const filtered = filteredProductTypes();
    setTotalPages(Math.ceil(filtered.length / pageSize));
    return filtered.slice(0, currentPage() * pageSize);
  };

  const hasMoreItems = () => {
    return paginatedProductTypes().length < filteredProductTypes().length;
  };

  const handleLoadMore = () => {
    if (hasMoreItems()) {
      setCurrentPage(prev => prev + 1);
    } else {
      setCurrentPage(1);
    }
  };

  // Button logic for Show More/Collapse
  const shouldShowShowMore = () => totalPages() > 1 && currentPage() < totalPages();
  const shouldShowCollapse = () => totalPages() > 1 && currentPage() === totalPages();

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div class="fixed top-0 left-0 right-0 bg-gray-50 z-10 border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="text-center mb-4">
            <h1 class="text-3xl font-extrabold text-gray-900">{t().title}</h1>
          </div>
          <div class="relative flex justify-center mt-4">
            <form class="w-full max-w-xs relative" onSubmit={e => { e.preventDefault(); setCurrentPage(1); }}>
              <input
                type="text"
                placeholder={t().searchPlaceholder}
                value={searchQuery()}
                onInput={(e) => {
                  setSearchQuery(e.currentTarget.value);
                  setCurrentPage(1);
                }}
                class="w-full px-6 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-0 focus:border-gray-300 text-base h-12 pr-12 transition-shadow"
              />
              <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary focus:outline-none bg-transparent p-0 m-0 border-0">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div class="pt-40 pb-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading() ? (
            <div class="text-center">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-[#F48220]"></div>
            </div>
          ) : error() ? (
            <div class="text-center text-red-600">{error()}</div>
          ) : (
            <div class="flex flex-col gap-4">
              {/* Product Types */}
              <div>
                <h2 class="text-xl font-bold text-gray-900 mb-3">{t().chooseProductType}</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {paginatedProductTypes().map(productType => (
                    <div
                      onClick={() => handleProductTypeSelect(productType)}
                      class={`cursor-pointer p-3 border rounded-lg text-center transition-colors ${
                        selectedProductType()?.id === productType.id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <p class="text-sm font-medium text-gray-700">{productType.name}</p>
                    </div>
                  ))}
                </div>
                {filteredProductTypes().length === 0 && (
                  <div class="text-center text-gray-500 mt-3">
                    {t().noResults}
                  </div>
                )}
                {(shouldShowShowMore() || shouldShowCollapse()) && (
                  <div class="mt-4 text-center">
                    {shouldShowShowMore() && (
                      <button
                        onClick={handleLoadMore}
                        class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        {t().showMore}
                      </button>
                    )}
                    {shouldShowCollapse() && (
                      <button
                        onClick={() => setCurrentPage(1)}
                        class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        {t().collapse}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Size Chart Detail */}
              {selectedProductType() && filteredProductTypes().length > 0 && (
                <div class="mt-4">
                  {selectedProductType()?.sizeCharts.map(chart => (
                    <div class="bg-white rounded-lg shadow-md p-4 mb-4">
                      <h2 class="text-xl font-semibold text-gray-900 mb-3">{chart.name} ({selectedProductType()?.name})</h2>
                      <p class="text-gray-600 mb-4">{chart.description}</p>
                      <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                          <thead class="bg-gray-50">
                            <tr>
                              <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                              {chart.measurements.map(measurement => (
                                <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{measurement.name}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                            {chart.measurements[0].values.map((_, sizeIndex) => (
                              <tr class="group hover:bg-[#FFF5ED] transition-colors duration-150 cursor-pointer">
                                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-[#F48220]">{chart.measurements[0].values[sizeIndex].size}</td>
                                {chart.measurements.map(measurement => (
                                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 group-hover:text-[#F48220]">{measurement.values[sizeIndex].value}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* Additional Info */}
                      <div class="mt-4 text-sm text-gray-600">
                        {selectedProductType()?.name === 'Classic Tee' && (
                          <>
                            <p>{t().measurements.chest}</p>
                            <p>{t().measurements.bodyLength}</p>
                            <p>{t().measurements.note}</p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {selectedProductType()?.name === 'Classic Tee' && (
                    <div class="mt-4 flex justify-center">
                      <img src={import.meta.env.BASE_URL + 'classic-tee-diagram.png'} alt="Classic Tee Measurement Diagram" class="max-w-xs"/>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Language Switch Button */}
      <div class="fixed bottom-4 right-4">
        <button
          onClick={() => setShowLanguageDropdown(!showLanguageDropdown())}
          class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg"
        >
          <span class="text-lg">{LANGUAGES[currentLanguage()].flag}</span>
          <span>{LANGUAGES[currentLanguage()].name}</span>
          <svg 
            class={`w-4 h-4 transition-transform ${showLanguageDropdown() ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <Show when={showLanguageDropdown()}>
          <div class="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {Object.entries(LANGUAGES).map(([code, lang]) => (
              <button
                onClick={() => handleLanguageSelect(code as Language)}
                class={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 ${
                  currentLanguage() === code ? 'bg-primary/10 text-primary' : 'text-gray-700'
                }`}
              >
                <span class="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </Show>
      </div>
    </div>
  );
}

export default Guide;
