import { useRef, useState } from "react";
import CardCanvas, { templates, textures, type CardTemplate, type TextureType } from "@/components/CardCanvas";
import TemplateSelector from "@/components/TemplateSelector";
import CardEditor from "@/components/CardEditor";
import ExportActions from "@/components/ExportActions";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<CardTemplate>(templates[0]);
  const [greeting, setGreeting] = useState("Eid Mubarak!");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState(
    "Wishing you and your family joy, peace, and prosperity on this blessed occasion."
  );
  const [texture, setTexture] = useState<TextureType>("stars");
  const [textureOpacity, setTextureOpacity] = useState(0.5);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.4);

  // Advanced customization
  const [arabicText, setArabicText] = useState("عيد مبارك");
  const [showArabicText, setShowArabicText] = useState(true);
  const [topOrnament, setTopOrnament] = useState("✦");
  const [showTopOrnament, setShowTopOrnament] = useState(true);
  const [bottomOrnament, setBottomOrnament] = useState("☪︎");
  const [showBottomOrnament, setShowBottomOrnament] = useState(true);
  const [recipientPrefix, setRecipientPrefix] = useState("Dear");
  const [senderPrefix, setSenderPrefix] = useState("—");
  const [greetingFontSize, setGreetingFontSize] = useState(28);
  const [messageFontSize, setMessageFontSize] = useState(14);
  const [arabicFontSize, setArabicFontSize] = useState(28);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setBackgroundImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const clearBackgroundImage = () => setBackgroundImage(null);

  const handleTemplateSelect = (t: CardTemplate) => {
    setTemplate({ ...t });
  };

  const updateTemplateColor = (key: "bg" | "textColor" | "accentColor", value: string) => {
    setTemplate((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      {/* Header */}
      <header className="text-center pt-8 pb-4 px-4 md:pt-10 md:pb-6">
        <p className="font-arabic text-xl md:text-2xl text-gold-dark mb-1">عيد مبارك</p>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground tracking-tight">
          Eid Card <span className="text-gold-dark">Generator</span>
        </h1>
        <p className="font-body text-muted-foreground mt-2 text-sm md:text-base max-w-md mx-auto">
          Create beautiful, personalized Eid greetings cards and download them instantly.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-3 md:px-4 pb-12 md:pb-16">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-start">

          {/* Preview - shown first on mobile */}
          <div className="w-full lg:order-2 flex flex-col items-center gap-3 lg:sticky lg:top-8">
            <h3 className="font-display text-lg font-bold text-foreground">Preview</h3>
            <div className="flex items-center justify-center w-full rounded-xl border border-border bg-white p-4 shadow-sm">
                <div className="overflow-x-auto">
                  <CardCanvas
                    ref={cardRef}
                    template={template}
                    greeting={greeting}
                    recipientName={recipientName}
                    senderName={senderName}
                    message={message}
                    texture={texture}
                    textureOpacity={textureOpacity}
                    backgroundImage={backgroundImage}
                    backgroundOpacity={backgroundOpacity}
                    arabicText={arabicText}
                    showArabicText={showArabicText}
                    topOrnament={topOrnament}
                    showTopOrnament={showTopOrnament}
                    bottomOrnament={bottomOrnament}
                    showBottomOrnament={showBottomOrnament}
                    recipientPrefix={recipientPrefix}
                    senderPrefix={senderPrefix}
                    greetingFontSize={greetingFontSize}
                    messageFontSize={messageFontSize}
                    arabicFontSize={arabicFontSize}
                    />
              </div>
            </div>
                    <div className="text-center text-xs text-muted-foreground mb-2 md:hidden">
                      Scroll or drag right-left to see full preview on mobile.
                    </div>
            {/* Export on mobile shown under preview */}
            <div className="w-full lg:hidden">
              <ExportActions cardRef={cardRef} />
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6 md:space-y-8 w-full lg:order-1">
            <section>
              <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-2 md:mb-3">Choose Template</h3>
              <TemplateSelector selected={template} onSelect={handleTemplateSelect} />
              <div className="mt-3 md:mt-4 grid grid-cols-3 gap-2 md:gap-3">
                <div className="space-y-1">
                  <label className="font-body text-xs font-bold text-muted-foreground">Background</label>
                  <input
                    type="color"
                    value={template.bg}
                    onChange={(e) => updateTemplateColor("bg", e.target.value)}
                    className="w-full h-8 md:h-9 rounded-lg cursor-pointer border border-border"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-body text-xs font-bold text-muted-foreground">Text</label>
                  <input
                    type="color"
                    value={template.textColor}
                    onChange={(e) => updateTemplateColor("textColor", e.target.value)}
                    className="w-full h-8 md:h-9 rounded-lg cursor-pointer border border-border"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-body text-xs font-bold text-muted-foreground">Accent</label>
                  <input
                    type="color"
                    value={template.accentColor}
                    onChange={(e) => updateTemplateColor("accentColor", e.target.value)}
                    className="w-full h-8 md:h-9 rounded-lg cursor-pointer border border-border"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-2 md:mb-3">Background Texture</h3>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {textures.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTexture(t.id)}
                    className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-body transition-all ${
                      texture === t.id
                        ? "bg-primary text-primary-foreground shadow-gold"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
              {texture !== "none" && (
                <div className="mt-3 space-y-1">
                  <label className="font-body text-xs font-bold text-muted-foreground">
                    Opacity: {Math.round(textureOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.05"
                    max="1"
                    step="0.05"
                    value={textureOpacity}
                    onChange={(e) => setTextureOpacity(parseFloat(e.target.value))}
                    className="w-full accent-primary h-2 cursor-pointer"
                  />
                </div>
              )}
            </section>

            <section>
              <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-2 md:mb-3">Background Image</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground flex-shrink-0"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <span className="font-body text-sm text-muted-foreground">
                    {backgroundImage ? "Change image" : "Upload an image"}
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {backgroundImage && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border border-border flex-shrink-0">
                        <img src={backgroundImage} alt="bg" className="w-full h-full object-cover" />
                      </div>
                      <button
                        onClick={clearBackgroundImage}
                        className="px-3 py-1.5 rounded-full text-xs font-body bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-1">
                      <label className="font-body text-xs font-bold text-muted-foreground">
                        Image Opacity: {Math.round(backgroundOpacity * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0.05"
                        max="1"
                        step="0.05"
                        value={backgroundOpacity}
                        onChange={(e) => setBackgroundOpacity(parseFloat(e.target.value))}
                        className="w-full accent-primary h-2 cursor-pointer"
                      />
                    </div>
                  </>
                )}
              </div>
            </section>

            <section>
              <CardEditor
                greeting={greeting}
                recipientName={recipientName}
                senderName={senderName}
                message={message}
                onGreetingChange={setGreeting}
                onRecipientChange={setRecipientName}
                onSenderChange={setSenderName}
                onMessageChange={setMessage}
              />
            </section>

            {/* Advanced Customization */}
            <section>
              <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
                <CollapsibleTrigger className="flex items-center gap-2 w-full group">
                  <h3 className="font-display text-base md:text-lg font-bold text-foreground">Advanced Customization</h3>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3 space-y-5">

                  {/* Arabic Text */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="font-body text-xs font-bold text-muted-foreground">Arabic Calligraphy</Label>
                      <Switch checked={showArabicText} onCheckedChange={setShowArabicText} />
                    </div>
                    {showArabicText && (
                      <Input value={arabicText} onChange={(e) => setArabicText(e.target.value)} placeholder="عيد مبارك" className="font-arabic text-right" />
                    )}
                  </div>

                  {/* Top Ornament */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="font-body text-xs font-bold text-muted-foreground">Top Ornament</Label>
                      <Switch checked={showTopOrnament} onCheckedChange={setShowTopOrnament} />
                    </div>
                    {showTopOrnament && (
                      <Input value={topOrnament} onChange={(e) => setTopOrnament(e.target.value)} placeholder="✦" />
                    )}
                  </div>

                  {/* Bottom Ornament */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="font-body text-xs font-bold text-muted-foreground">Bottom Ornament</Label>
                      <Switch checked={showBottomOrnament} onCheckedChange={setShowBottomOrnament} />
                    </div>
                    {showBottomOrnament && (
                      <Input value={bottomOrnament} onChange={(e) => setBottomOrnament(e.target.value)} placeholder="☪︎" />
                    )}
                  </div>

                  {/* Prefixes */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="font-body text-xs font-bold text-muted-foreground">Recipient Prefix</Label>
                      <Input value={recipientPrefix} onChange={(e) => setRecipientPrefix(e.target.value)} placeholder="Dear" />
                    </div>
                    <div className="space-y-1">
                      <Label className="font-body text-xs font-bold text-muted-foreground">Sender Prefix</Label>
                      <Input value={senderPrefix} onChange={(e) => setSenderPrefix(e.target.value)} placeholder="—" />
                    </div>
                  </div>

                  {/* Font Sizes */}
                  <div className="space-y-3">
                    <h4 className="font-body text-xs font-bold text-muted-foreground">Font Sizes</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-xs text-muted-foreground">Greeting: {greetingFontSize}px</Label>
                      </div>
                      <Slider value={[greetingFontSize]} onValueChange={(v) => setGreetingFontSize(v[0])} min={20} max={40} step={1} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-xs text-muted-foreground">Message: {messageFontSize}px</Label>
                      </div>
                      <Slider value={[messageFontSize]} onValueChange={(v) => setMessageFontSize(v[0])} min={10} max={20} step={1} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="font-body text-xs text-muted-foreground">Arabic Text: {arabicFontSize}px</Label>
                      </div>
                      <Slider value={[arabicFontSize]} onValueChange={(v) => setArabicFontSize(v[0])} min={16} max={36} step={1} />
                    </div>
                  </div>

                </CollapsibleContent>
              </Collapsible>
            </section>

            <section className="hidden lg:block">
              <h3 className="font-display text-lg font-bold text-foreground mb-3">Export</h3>
              <ExportActions cardRef={cardRef} />
            </section>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 md:py-6 font-body text-xs md:text-sm text-muted-foreground border-t border-border">
        Made with ❤️ for the Ummah · Eid Mubarak 2026
      </footer>
    </div>
  );
};

export default Index;
