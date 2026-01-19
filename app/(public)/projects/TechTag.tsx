import CircleIcon from "./CircleIcon";

type TechTagProp = {
  name: string;
};

const TECH_TAG_TO_COLOR: Record<string, string> = {
  HTML: "text-orange-600",
  CSS: "text-blue-600",
  JavaScript: "text-yellow-400",
  TypeScript: "text-blue-500",
  React: "text-cyan-400",
  "Vue.js": "text-green-500",
  Angular: "text-red-600",
  Svelte: "text-orange-500",
  "Next.js": "text-black",
  "Tailwind CSS": "text-teal-400",
  "Node.js": "text-green-600",
  "Express.js": "text-black",
  Django: "text-green-900",
  Flask: "text-black",
  "Ruby on Rails": "text-red-700",
  PHP: "text-purple-400",
  Unity: "text-black",
  "Unreal Engine": "text-slate-900",
  Godot: "text-blue-500",
  "GameMaker Studio": "text-green-400",
  "C#": "text-purple-600",
  "C++": "text-blue-700",
  OpenGL: "text-blue-400",
  DirectX: "text-green-700",
  Blender: "text-orange-400",
  Java: "text-orange-600",
  Kotlin: "text-purple-500",
  Swift: "text-orange-500",
  "Objective-C": "text-blue-500",
  "React Native": "text-cyan-400",
  Flutter: "text-blue-600",
  Electron: "text-slate-500",
  Qt: "text-green-500",
  ".NET / MAUI": "text-purple-700",
  MySQL: "text-blue-700",
  PostgreSQL: "text-blue-800",
  SQLite: "text-blue-900",
  MongoDB: "text-green-600",
  Redis: "text-red-600",
  Firebase: "text-yellow-400",
  "Oracle DB": "text-red-700",
  "Microsoft SQL Server": "text-red-600",
  Cassandra: "text-blue-500",
  Neo4j: "text-teal-500",
};

export default function TechTag({ name }: TechTagProp) {
  const color = TECH_TAG_TO_COLOR[name]
    ? TECH_TAG_TO_COLOR[name]
    : "text-black";

  return (
    <span className="flex items-center gap-1">
      <CircleIcon width={9} height={9} className={color} />
      {name}
    </span>
  );
}
