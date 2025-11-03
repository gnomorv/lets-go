import { Place } from '@/types';
import { X, MapIcon, Navigation } from 'lucide-react';

interface NavigationModalProps {
  place: Place | null;
  onClose: () => void;
}

const getGoogleMapsUrl = (place: Place): string => {
  return `https://www.google.com/maps/search/${encodeURIComponent(place.name)}/@${place.latitude},${place.longitude},15z`;
};

const getWazeUrl = (place: Place): string => {
  return `https://waze.com/ul?ll=${place.latitude},${place.longitude}&navigate=yes&zoom=15`;
};

export default function NavigationModal({
  place,
  onClose,
}: NavigationModalProps) {
  if (!place) return null;

  const handleGoogleMaps = () => {
    window.open(getGoogleMapsUrl(place), '_blank');
    onClose();
  };

  const handleWaze = () => {
    window.open(getWazeUrl(place), '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-sm w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Navigate to {place.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <button
            onClick={handleGoogleMaps}
            className="w-full flex items-center gap-3 p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition group"
          >
            <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition">
              <MapIcon className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Google Maps</h3>
              <p className="text-sm text-gray-600">Get directions with Google</p>
            </div>
          </button>

          <button
            onClick={handleWaze}
            className="w-full flex items-center gap-3 p-4 border-2 border-purple-500 rounded-lg hover:bg-purple-50 transition group"
          >
            <div className="w-10 h-10 bg-purple-500 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition">
              <Navigation className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Waze</h3>
              <p className="text-sm text-gray-600">Navigate with Waze</p>
            </div>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
