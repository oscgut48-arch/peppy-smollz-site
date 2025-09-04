'use client';

import React, { useState } from 'react';
// @ts-ignore
import content from '@/data/content.json';
import AudioWithFallback from '@/components/audio-with-fallback';
import Gallery from '@/components/gallery';
import { Twitter, Discord, Youtube, Music } from 'lucide-react';

export default function Page() {
  const { hero, tracks, lore, roadmap, gallery, social, formspree } = content as any;
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch(formspree.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
        setEmail('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <img src={hero.image} alt="Hero cover" className="w-full h-[60vh] object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50 p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{hero.headline}</h1>
          <p className="text-lg md:text-2xl">{hero.subhead}</p>
        </div>
      </section>

      {/* Music Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-6">Music</h2>
        <div className="space-y-8">
          {tracks.map((track: any, index: number) => (
            <div key={index} className="flex flex-col">
              <span className="font-medium mb-2">{track.title}</span>
              {track.type === 'mp3' ? (
                <AudioWithFallback sources={[track.src]} />
              ) : (
                <div className="w-full">
                  {track.embedUrl?.includes('soundcloud.com') && (
                    <iframe
                      width="100%"
                      height="120"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                        track.embedUrl
                      )}&auto_play=false&show_user=true`}
                    ></iframe>
                  )}
                  {track.embedUrl?.includes('youtube.com') && (
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${new URL(track.embedUrl).searchParams.get('v')}`}
                      title={track.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lore Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-6">Lore</h2>
        <p className="text-lg leading-relaxed">{lore}</p>
      </section>

      {/* Roadmap Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-6">Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roadmap.map((phase: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
              <h3 className="text-xl font-semibold mb-2">{phase.phase}</h3>
              <ul className="list-disc pl-5 space-y-1">
                {phase.items.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      {gallery && gallery.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-semibold mb-6">Gallery</h2>
          <Gallery images={gallery} />
        </section>
      )}

      {/* Join Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-6">Join the Journey</h2>
        {submitted ? (
          <p className="text-green-600 text-lg">Thanks for joining!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="flex flex-col w-full sm:w-auto">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded"
            >
              Join
            </button>
          </form>
        )}
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 space-y-4 sm:space-y-0">
          <span className="text-gray-600">&copy; {new Date().getFullYear()} Peppy Smollz</span>
          <div className="flex space-x-4">
            {social?.x && (
              <a href={social.x} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              </a>
            )}
            {social?.discord && (
              <a href={social.discord} target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <Discord className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              </a>
            )}
            {social?.youtube && (
              <a href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              </a>
            )}
            {social?.audius && (
              <a href={social.audius} target="_blank" rel="noopener noreferrer" aria-label="Audius">
                <Music className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              </a>
            )}
          </div>
        </div>
      </footer>
    </main>
  );
}
