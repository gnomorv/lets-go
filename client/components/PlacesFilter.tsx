import { Place } from "@/types";

interface PlacesFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeCount: number;
}

const categories = [
  { id: "restaurant", label: "🍽️ Restaurants", color: "red" },
  { id: "coffee", label: "☕ Coffee Shops", color: "amber" },
  { id: "club", label: "🎵 Clubs", color: "purple" },
];

export default function PlacesFilter({
  selectedCategories,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  placeCount,
}: PlacesFilterProps) {
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter((c) => c !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Search Places
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or description..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategories.includes(category.id)
                    ? `bg-${category.color}-500 text-white shadow-md`
                    : `bg-gray-100 text-gray-700 hover:bg-gray-200`
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing{" "}
        <span className="font-semibold text-gray-900">{placeCount}</span>{" "}
        {placeCount === 1 ? "place" : "places"}
      </div>
    </div>
  );
}
