import { Place } from '@/types';
import { X, MapPin, Clock, Users, DollarSign } from 'lucide-react';

interface PlaceDetailsModalProps {
  place: Place | null;
  onClose: () => void;
}

export default function PlaceDetailsModal({
  place,
  onClose,
}: PlaceDetailsModalProps) {
  if (!place) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-gray-900">{place.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-64 object-cover rounded-lg"
          />

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              About
            </h3>
            <p className="text-gray-700 leading-relaxed">{place.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Location</h4>
              </div>
              <p className="text-sm text-gray-600">{place.address}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Rating</h4>
              </div>
              <p className="text-sm text-gray-600">⭐ {place.rating.toFixed(1)}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <h4 className="font-semibold text-gray-900">Hours</h4>
              </div>
              <p className="text-sm text-gray-600">Mon-Sun: 8AM - 10PM</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-gray-900">Capacity</h4>
              </div>
              <p className="text-sm text-gray-600">50-100 guests</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Amenities
            </h3>
            <div className="flex flex-wrap gap-2">
              {place.category === 'restaurant' && (
                <>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Dine-in
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Takeout
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Outdoor Seating
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    WiFi
                  </span>
                </>
              )}
              {place.category === 'coffee' && (
                <>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    WiFi
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    Seating
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    Pastries
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                    Specialty Drinks
                  </span>
                </>
              )}
              {place.category === 'club' && (
                <>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Live DJ
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Bar Service
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Dance Floor
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    VIP Areas
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
