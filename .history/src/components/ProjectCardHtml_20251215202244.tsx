// Definiciones de tipos (Asegúrate de que estas interfaces estén definidas)
interface Project {
  title: string;
  summary: string;
  features: string[];
  image: string;
  logo: string;
  tags: string[];
  gradient: string;
  status: string;
  url: string | null;
  github?: string | null;
}

interface ProjectCardHtmlProps {
  project: Project;
}

// Reusa la lógica de badge de tu código original
const getStatusBadge = (status: string) => {
  const badges = {
    activo: {
      label: "Activo",
      color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    "no-operativo": {
      label: "No Operativo",
      color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    },
    "en-desarrollo": {
      label: "En Desarrollo",
      color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
  };
  return badges[status as keyof typeof badges] || badges.activo;
};

// Componente que renderiza la tarjeta HTML/CSS
const ProjectCardHtml = ({ project }: ProjectCardHtmlProps) => {
  const statusBadge = getStatusBadge(project.status);

  // Nota: Usar el diseño lo más simple posible para evitar problemas de rendimiento.
  // Usaremos un tamaño fijo para que la tarjeta 3D sepa qué tan grande es.
  return (
    <div
      className={`w-[380px] h-[500px] bg-gradient-to-br ${project.gradient} backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-border/50 text-white`}
      style={{ width: 380, height: 500 }} // Tamaño fijo para el plano 3D
    >
      {/* Project Image */}
      <div className="relative h-40 overflow-hidden">
        {/* Usamos img tag normal para evitar problemas de Next/Image en R3F si no está configurado */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      {/* Logo Badge */}
      <div className="absolute top-3 left-3 w-12 h-12 rounded-xl overflow-hidden border-2 border-background/50 shadow-lg">
        <img
          src={project.logo}
          alt={`${project.title} logo`}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Status Badge */}
      <div
        className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${statusBadge.color}`}
      >
        {statusBadge.label}
      </div>

      {/* Content */}
      <div className="relative p-5 space-y-2.5">
        {/* Title and Links */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold">{project.title}</h3>
          {/* ... (Lógica de enlaces y botones) ... */}
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-400">{project.summary}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-medium bg-gray-700 text-white rounded-md border border-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
