export default function ProductArt({ product }) {
  if (product.image) {
    return (
      <div className="art">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
    );
  }

  return (
    <div className="art">
      <span className="art-emoji">{product.emoji}</span>
    </div>
  );
}