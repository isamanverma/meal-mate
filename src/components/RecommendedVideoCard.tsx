import { YoutubeIDToLink } from "../utility/YoutubeIDToLink";

interface RecommendedVideoCardProps {
  title: string;
  videoId: string;
  thumbnail: string;
}
export default function RecommendedVideoCard({
  title,
  videoId,
  thumbnail,
}: RecommendedVideoCardProps) {
  console.log(title, videoId, thumbnail);

  return (
    <div className="relative max-w-sm p-1 hover:cursor-pointer">
      <div className="absolute -inset-0.5 rounded-xl bg-amber-900 opacity-90 blur-xl"></div>
      <div className="relative rounded-md bg-offwhite">
        <a href={YoutubeIDToLink(videoId)}>
          <div className="overflow-hidden rounded-t-md">
            <img
              src={thumbnail}
              className="h-24 w-full transform rounded-t-md object-cover transition duration-300 ease-in-out hover:scale-105 hover:rounded-t-md lg:h-48"
              alt={`Recipe Video`}
            />
          </div>
          <p className="text-md truncate px-1 py-2">{title}</p>
        </a>
      </div>
    </div>
  );
}
