import { useCallback, useState, useEffect } from "react";
import wretch from "wretch";
import RecommendedVideoCard from "./RecommendedVideoCard";

interface Video {
  title: string;
  shortTitle: string;
  youTubeId: string;
  rating: number;
  views: number;
  thumbnail: string;
  length: number;
}

interface ApiResponse {
  expires?: number;
  isStale?: boolean;
  totalResults: number;
  videos: Video[];
}

interface RecommendedVideosProps {
  query: string;
}

export default function RecommendedVideos({ query }: RecommendedVideosProps) {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API;
  const [videos, setVideos] = useState<Video[]>([]);

  const fetchVideos = useCallback(async () => {
    try {
      const response = await wretch(
        `https://api.spoonacular.com/food/videos/search?query=${query}&minLength=0&maxLength=1500&number=10&apiKey=${apiKey}`,
      )
        .get()
        .json<ApiResponse>();
      console.log(response);
      setVideos(response.videos);
    } catch (error) {
      console.log("Error fetching Videos: ", error);
    }
  }, [query, apiKey]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <div className="col-span-12">
      <h2 className="font-castaThin text-4xl text-offwhite">
        {videos.length > 0 ? "Recommended Videos" : ""}
      </h2>
      <div className="flex flex-wrap gap-5">
        {videos.map((video) => (
          <RecommendedVideoCard
            key={video.youTubeId}
            title={video.title}
            videoId={video.youTubeId}
            thumbnail={video.thumbnail}
          />
        ))}
      </div>
    </div>
  );
}
