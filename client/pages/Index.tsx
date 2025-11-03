import { useState, useEffect } from "react";
import { Place, UserLocation } from "@/types";
import { dummyPlaces } from "@/data/places";
import {
  getUserLocation,
  getNearbyPlaces,
  calculateDistance,
} from "@/utils/geolocation";
import Header from "@/components/Header";
import PlacesGrid from "@/components/PlacesGrid";
import PlacesFilter from "@/components/PlacesFilter";
import { MapPin, AlertCircle, Loader } from "lucide-react";

export default function Index() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [distances, setDistances] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "restaurant",
    "coffee",
    "club",
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        setError(null);
        const location = await getUserLocation();
        setUserLocation(location);

        const nearby = getNearbyPlaces(dummyPlaces, location, 10);
        setNearbyPlaces(nearby);

        const distanceMap: Record<string, number> = {};
        nearby.forEach((place) => {
          distanceMap[place.id] = calculateDistance(
            location.latitude,
            location.longitude,
            place.latitude,
            place.longitude,
          );
        });
        setDistances(distanceMap);
      } catch (err) {
        console.error("Location error:", err);
        setError(
          "Could not access your location. Please enable location permissions.",
        );
        setNearbyPlaces(dummyPlaces);
        const distanceMap: Record<string, number> = {};
        dummyPlaces.forEach((place) => {
          distanceMap[place.id] = 0;
        });
        setDistances(distanceMap);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    let filtered = nearbyPlaces;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((place) =>
        selectedCategories.includes(place.category),
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (place) =>
          place.name.toLowerCase().includes(query) ||
          place.description.toLowerCase().includes(query) ||
          place.address.toLowerCase().includes(query),
      );
    }

    setFilteredPlaces(filtered);
  }, [nearbyPlaces, selectedCategories, searchQuery]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Discover Places Near You
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find amazing restaurants, cozy coffee shops, and exciting clubs in
              your area. Explore local gems based on your location.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600 text-lg">
                Finding places near you...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900">Location Note</h3>
                <p className="text-amber-800 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Location Info */}
          {!loading && userLocation && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <p className="text-blue-900">
                <span className="font-semibold">Your Location:</span>{" "}
                {userLocation.latitude.toFixed(4)},{" "}
                {userLocation.longitude.toFixed(4)}
              </p>
            </div>
          )}

          {/* Filter Section */}
          {!loading && (
            <>
              <PlacesFilter
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeCount={filteredPlaces.length}
              />

              {/* Places Grid */}
              <PlacesGrid places={filteredPlaces} distances={distances} />
            </>
          )}
        </div>
      </main>
    </>
  );
}
