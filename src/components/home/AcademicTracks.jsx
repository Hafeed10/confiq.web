import React from 'react';
import { 
  IslamicChipIcon, 
  IslamicStarIcon, 
  IslamicBioNodeIcon, 
  IslamicBookIcon, 
  IslamicArchIcon, 
  IslamicCompassIcon, 
  IslamicScrollIcon 
} from '../common/IslamicIcons';

export default function AcademicTracks({ tracksData }) {
  const tracksToRender = tracksData || [];

  const getTrackIcon = (index) => {
    const icons = [IslamicChipIcon, IslamicStarIcon, IslamicBioNodeIcon, IslamicBookIcon, IslamicArchIcon, IslamicCompassIcon, IslamicScrollIcon];
    return icons[index % icons.length];
  };

  return (
    <section id="tracks" className="py-20 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-emerald bg-brand-light px-3 py-1 rounded-md">
              Academic Curricula
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-brand-dark mt-3">
              Summit Academic Tracks
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-brand-medium font-medium max-w-md">
            Four core domains bridging classical Shafi'ite legal principles with cutting-edge 21st-century technological frontiers.
          </p>
        </div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tracksToRender.map((track, idx) => {
            const Icon = getTrackIcon(idx);
            const topicsList = Array.isArray(track.topics) ? track.topics : (track.topics ? track.topics.split(',') : []);
            return (
              <div
                key={track.id}
                className="bg-white rounded-2xl p-8 border border-brand-light shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold font-mono tracking-widest px-3 py-1 rounded bg-brand-dark text-brand-gold">
                      {track.code}
                    </span>
                    <span className="text-xs font-semibold text-brand-medium bg-brand-light px-2.5 py-1 rounded-full">
                      {track.speakersCount}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-brand-light text-brand-dark flex items-center justify-center mb-5 group-hover:bg-brand-dark group-hover:text-brand-gold transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-brand-dark mb-3 leading-snug group-hover:text-brand-emerald transition-colors">
                    {track.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {track.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2">
                    {topicsList.map((t, topicIdx) => (
                      <span key={topicIdx} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-brand-pale text-brand-dark border border-brand-light">
                        #{t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
