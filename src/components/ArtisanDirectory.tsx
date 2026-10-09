import React, { useState } from 'react';
import { ARTISANS } from '../data/mockData';
import { Artisan } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Award, MapPin, Hammer, Users, MessageCircle, Calendar } from 'lucide-react';

interface ArtisanDirectoryProps {
  onContactArtisan: (artisan: Artisan) => void;
}

export const ArtisanDirectory: React.FC<ArtisanDirectoryProps> = ({ onContactArtisan }) => {
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const [tourDate, setTourDate] = useState('2026-10-15');
  const [tourGuests, setTourGuests] = useState('2');
  const [tourBooked, setTourBooked] = useState(false);

  const handleBookTour = (e: React.FormEvent) => {
    e.preventDefault();
    setTourBooked(true);
    setTimeout(() => {
      setTourBooked(false);
      setTourModalOpen(false);
    }, 2500);
  };

  return (
    <section className="py-16 bg-[#FFF9F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#8C4722] mb-1.5">
            Custodians of Dharavi Clay
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C221E] tracking-tight">
            Meet the Artisans of Kumbharwada
          </h2>
          <p className="text-sm text-[#5C4D44] mt-2.5 leading-relaxed">
            Behind every diya and water vessel are generations of potter families who
            migrated to Dharavi, Mumbai in the 1930s. Connect directly with master craftsmen,
            understand their firing techniques, and visit their living workshops.
          </p>

          <div className="mt-4">
            <button
              onClick={() => setTourModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#A85D36] bg-[#E5D3B5]/40 hover:bg-[#E5D3B5] px-3.5 py-2 rounded-lg border border-[#E5D3B5] transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Pottery Workshop Experience & Guided Tour</span>
            </button>
          </div>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTISANS.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-[#FAF3E7] rounded-2xl border border-[#E5D3B5] overflow-hidden hover:border-[#A85D36] transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Photo & Lane Badge */}
                <div className="relative">
                  <ImageWithFallback
                    src={artisan.imageUrl}
                    alt={artisan.name}
                    aspectRatioClass="aspect-[16/10]"
                    categoryHint="Master Craftsman"
                  />
                  <div className="absolute top-3 right-3 bg-[#FFF9F0]/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-semibold text-[#8C4722] border border-[#E5D3B5] shadow-xs">
                    {artisan.generation}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#6B5A51] mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#A85D36] shrink-0" />
                      <span>{artisan.lane}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#2C221E]">
                      {artisan.name}
                    </h3>
                    <div className="text-xs font-medium text-[#8C4722]">
                      {artisan.familyWorkshop}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-[#5C4D44] leading-relaxed">
                    {artisan.bio}
                  </p>

                  {/* Specialties & Capacity */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#FFF9F0] p-3 rounded-lg border border-[#E5D3B5]">
                    <div>
                      <span className="text-[#6B5A51] block text-[11px]">Primary Specialty</span>
                      <span className="font-semibold text-[#2C221E]">{artisan.specialty}</span>
                    </div>
                    <div>
                      <span className="text-[#6B5A51] block text-[11px]">Monthly Capacity</span>
                      <span className="font-semibold text-[#4C563B]">{artisan.capacityPerMonth}</span>
                    </div>
                  </div>

                  {/* Craft Techniques (No pills: clean text with commas/dots) */}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B5A51] block mb-1.5">
                      Techniques & Traditions
                    </span>
                    <div className="text-xs text-[#5C4D44] flex flex-wrap gap-x-2 gap-y-1">
                      {artisan.craftTechniques.map((tech, i) => (
                        <span key={i} className="inline-flex items-center gap-1">
                          <span className="text-[#A85D36]">•</span>
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-3">
                <button
                  onClick={() => onContactArtisan(artisan)}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#A85D36] hover:bg-[#8C4722] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enquire Direct with Workshop</span>
                </button>
                <button
                  onClick={() => setSelectedArtisan(artisan)}
                  className="py-2.5 px-3.5 text-xs font-medium text-[#2C221E] bg-[#E5D3B5] hover:bg-[#D4BE9B] rounded-lg transition-colors cursor-pointer border border-[#D4BE9B]"
                >
                  View Story
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {selectedArtisan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFF9F0] max-w-lg w-full rounded-2xl border border-[#E5D3B5] p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#8C4722]">{selectedArtisan.familyWorkshop}</span>
                <h3 className="font-serif text-2xl font-bold text-[#2C221E]">{selectedArtisan.name}</h3>
              </div>
              <button
                onClick={() => setSelectedArtisan(null)}
                className="text-sm font-semibold text-[#6B5A51] hover:text-[#2C221E] p-1"
              >
                ✕
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#E5D3B5]">
              <ImageWithFallback
                src={selectedArtisan.imageUrl}
                alt={selectedArtisan.name}
                aspectRatioClass="aspect-[16/9]"
                categoryHint="Heritage Artisan"
              />
            </div>
            <p className="text-sm text-[#5C4D44] leading-relaxed">
              {selectedArtisan.bio}
            </p>
            <div className="text-xs text-[#6B5A51] bg-[#FAF3E7] p-3 rounded-lg border border-[#E5D3B5]">
              <strong>Workshop Address:</strong> {selectedArtisan.lane}
              <br />
              <strong>Contact Line:</strong> {selectedArtisan.phone}
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  onContactArtisan(selectedArtisan);
                  setSelectedArtisan(null);
                }}
                className="py-2 px-4 text-xs font-semibold text-white bg-[#4C563B] rounded-lg hover:bg-[#373E2B]"
              >
                Open WhatsApp Chat
              </button>
              <button
                onClick={() => setSelectedArtisan(null)}
                className="py-2 px-4 text-xs font-medium text-[#2C221E] bg-[#E5D3B5] rounded-lg hover:bg-[#D4BE9B]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tour Booking Modal */}
      {tourModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFF9F0] max-w-md w-full rounded-2xl border border-[#E5D3B5] p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#8C4722]">Immersive Experience</span>
                <h3 className="font-serif text-2xl font-bold text-[#2C221E]">Pottery Workshop Tour</h3>
              </div>
              <button
                onClick={() => setTourModalOpen(false)}
                className="text-sm font-semibold text-[#6B5A51] hover:text-[#2C221E] p-1"
              >
                ✕
              </button>
            </div>

            {tourBooked ? (
              <div className="bg-[#FAF3E7] p-4 rounded-xl border border-[#4C563B] text-center space-y-2">
                <div className="text-sm font-bold text-[#4C563B]">Workshop Visit Requested!</div>
                <p className="text-xs text-[#5C4D44]">
                  Our community guide will call you to confirm your entry pass and kiln safety instructions for Dharavi Kumbharwada.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookTour} className="space-y-4 text-xs">
                <p className="text-xs text-[#5C4D44]">
                  Step inside the kiln lanes of Kumbharwada with local artisans. Try your hand at the kick-wheel, learn the red ochre slip preparation, and take home your freshly shaped earthen pot.
                </p>
                <div>
                  <label className="block text-[#6B5A51] font-semibold mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={tourDate}
                    onChange={(e) => setTourDate(e.target.value)}
                    className="w-full bg-white border border-[#E5D3B5] rounded-lg p-2 text-sm text-[#2C221E]"
                  />
                </div>
                <div>
                  <label className="block text-[#6B5A51] font-semibold mb-1">Number of Visitors</label>
                  <select
                    value={tourGuests}
                    onChange={(e) => setTourGuests(e.target.value)}
                    className="w-full bg-white border border-[#E5D3B5] rounded-lg p-2 text-sm text-[#2C221E]"
                  >
                    <option value="1">1 Person (Solo Explorer)</option>
                    <option value="2">2 Persons (Couple / Duo)</option>
                    <option value="4">3–5 Persons (Family / Friends)</option>
                    <option value="10">6–15 Persons (School / Architecture Group)</option>
                  </select>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setTourModalOpen(false)}
                    className="py-2 px-3 text-xs text-[#5C4D44] hover:text-[#2C221E]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-4 text-xs font-semibold text-white bg-[#A85D36] rounded-lg hover:bg-[#8C4722]"
                  >
                    Confirm Visit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
