import { Place } from "@/types";
import { useState } from "react";
import { Star, MapPin } from "lucide-react";
import PlaceDetailsModal from "./PlaceDetailsModal";
import NavigationModal from "./NavigationModal";

interface PlacesGridProps {
  places: Place[];
  distances?: Record<string, number>;
}

const categoryColors = {
  restaurant: { bg: "bg-red-50", badge: "bg-red-100 text-red-700" },
  coffee: { bg: "bg-amber-50", badge: "bg-amber-100 text-amber-700" },
  club: { bg: "bg-purple-50", badge: "bg-purple-100 text-purple-700" },
};

const categoryLabels = {
  restaurant: "🍽️ Restaurant",
  coffee: "☕ Coffee Shop",
  club: "🎵 Club",
};

export default function PlacesGrid({
  places,
  distances = {},
}: PlacesGridProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [navigationPlace, setNavigationPlace] = useState<Place | null>(null);

  if (places.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No places found in your area</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => {
          const colors = categoryColors[place.category];
          const distance = distances[place.id];

          return (
            <div
              key={place.id}
              className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 ${colors.bg} border border-gray-100`}
            >
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}
                  >
                    {categoryLabels[place.category]}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {place.name}
                </h3>

                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(place.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {place.rating.toFixed(1)}
                  </span>
                </div>

                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {place.description}
                </p>

                <div className="flex items-start gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-600">
                    <p>{place.address}</p>
                    {distance !== undefined && (
                      <p className="font-semibold text-gray-800 mt-1">
                        {distance.toFixed(1)} mi away
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setNavigationPlace(place)}
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition duration-300"
                  >
                    Let's Go!
                  </button>
                  <button
                    onClick={() => setSelectedPlace(place)}
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <PlaceDetailsModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />
      <NavigationModal
        place={navigationPlace}
        onClose={() => setNavigationPlace(null)}
      />
    </>
  );
}
