import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CardEditorProps {
  greeting: string;
  recipientName: string;
  senderName: string;
  message: string;
  onGreetingChange: (v: string) => void;
  onRecipientChange: (v: string) => void;
  onSenderChange: (v: string) => void;
  onMessageChange: (v: string) => void;
}

const greetings = [
  "Eid Mubarak!",
  "Happy Eid al-Fitr!",
  "Blessed Eid!",
  "Eid Greetings!",
  "Joyous Eid!",
];

const CardEditor = ({
  greeting, recipientName, senderName, message,
  onGreetingChange, onRecipientChange, onSenderChange, onMessageChange,
}: CardEditorProps) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="font-body text-sm font-bold text-foreground">Greeting</Label>
        <div className="flex flex-wrap gap-2">
          {greetings.map((g) => (
            <button
              key={g}
              onClick={() => onGreetingChange(g)}
              className={`px-3 py-1.5 rounded-full text-xs font-body transition-all ${
                greeting === g
                  ? "bg-primary text-primary-foreground shadow-gold"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-body text-sm font-bold text-foreground">Recipient Name</Label>
        <Input
          value={recipientName}
          onChange={(e) => onRecipientChange(e.target.value)}
          placeholder="e.g., Ahmed"
          className="font-body bg-card border-border focus:ring-accent"
        />
      </div>

      <div className="space-y-2">
        <Label className="font-body text-sm font-bold text-foreground">Your Message</Label>
        <Textarea
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Wishing you and your family joy, peace, and prosperity..."
          rows={3}
          className="font-body bg-card border-border focus:ring-accent resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label className="font-body text-sm font-bold text-foreground">Your Name</Label>
        <Input
          value={senderName}
          onChange={(e) => onSenderChange(e.target.value)}
          placeholder="e.g., Fatima"
          className="font-body bg-card border-border focus:ring-accent"
        />
      </div>
    </div>
  );
};

export default CardEditor;
