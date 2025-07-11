export default function Card({ title, description, className, style, link }) {
  return (
    <div
      className={`w-64 h-96 bg-background border-2 border-border flex flex-col px-8 hover:scale-105 require-pointer transition-all items-center justify-evenly text-center ${className}`}
      style={{ ...style }}
    >
      {/* Title of the card */}
      <h3 className="text-xl text-foreground font-frontage-regular font-bold mb-4">{title}</h3>
      {/* Description of the card */}
      <p className="text-text-secondary text-md font-sf leading-relaxed">{description}</p>
      {/* Optional link/button if needed */}
      {link && (
        <a 
          href={link} 
          className="mt-4 px-6 py-2 bg-foreground text-background rounded-full hover:bg-hover hover:text-background transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      )}
    </div>
  );
}
