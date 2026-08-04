import React, { createContext, useContext, useState, useEffect } from "react";
import type { Artwork } from "../types/artwork";

interface ArtworkContextType {
  artworks: Artwork[];
  newestArtworks: Artwork[];
  isLoading: boolean;
  error: string | null;
  getArtworkById: (id: string) => Artwork | undefined;
  refetchArtworks: () => Promise<void>;
}

const API_ENDPOINT = "https://v2.api.noroff.dev/artworks";

const ArtworkContext = createContext<ArtworkContextType | undefined>(undefined);

export const ArtworkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtworks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINT, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch artworks (Status: ${response.status})`,
        );
      }

      const json = await response.json();

      const artworkList: Artwork[] = Array.isArray(json.data) ? json.data : [];
      setArtworks(artworkList);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while loading artworks.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const newestArtworks = [...artworks]
    .sort((a, b) => {
      const dateA = a.created ? new Date(a.created).getTime() : 0;
      const dateB = b.created ? new Date(b.created).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 6);

  const getArtworkById = (id: string) => {
    return artworks.find((art) => art.id === id);
  };

  return (
    <ArtworkContext.Provider
      value={{
        artworks,
        newestArtworks,
        isLoading,
        error,
        getArtworkById,
        refetchArtworks: fetchArtworks,
      }}
    >
      {children}
    </ArtworkContext.Provider>
  );
};

export const useArtworks = () => {
  const context = useContext(ArtworkContext);
  if (!context) {
    throw new Error("useArtworks must be used within an ArtworkProvider");
  }
  return context;
};
