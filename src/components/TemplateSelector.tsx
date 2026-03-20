import { templates, type CardTemplate } from "./CardCanvas";

interface TemplateSelectorProps {
  selected: CardTemplate;
  onSelect: (t: CardTemplate) => void;
}

const TemplateSelector = ({ selected, onSelect }: TemplateSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t)}
          style={{ backgroundColor: t.bg }}
          className={`relative h-20 rounded-xl overflow-hidden transition-all duration-200 border-2 ${
            selected.id === t.id
              ? "border-accent ring-2 ring-accent/30 scale-105"
              : "border-transparent hover:shadow-elegant"
          }`}
        >
          <span
            className="text-xs font-body font-bold drop-shadow-sm"
            style={{ color: t.textColor }}
          >
            {t.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
