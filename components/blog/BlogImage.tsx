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
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
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
