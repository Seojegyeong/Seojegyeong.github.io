import Image from "next/image";

export default function BlogImage({
  src,
  alt,
}: {
  src?: string;
  alt?: string;
}) {
  if (!src) return null;
  return (
    <figure className="not-prose my-8">
      <Image
        src={src}
        alt={alt ?? ""}
        width={0}
        height={0}
        sizes="100vw"
        className="rounded-xl w-full h-auto"
      />
      {alt && (
        <figcaption className="mt-2 text-center text-xs text-text-subtle">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
