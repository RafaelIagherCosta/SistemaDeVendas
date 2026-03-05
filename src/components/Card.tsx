type CardColor = "blue" | "green" | "yellow";

interface CardProps {
  title: string;
  value: string | number;
  subtitle: string;
  color: CardColor;
  icon: string;
}

export default function Card({
  title,
  value,
  subtitle,
  color,
  icon,
}: CardProps) {
  const colorStyles: Record<CardColor, string> = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="flex items-center justify-between rounded bg-white p-6 shadow">
      <div>
        <h3 className={colorStyles[color]}>{title}</h3>

        <p className="mt-2 text-2xl font-bold text-black">{value}</p>

        <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
      </div>

      <div className={`p-3 rounded text-xl ${colorStyles[color]}`}>{icon}</div>
    </div>
  );
}
