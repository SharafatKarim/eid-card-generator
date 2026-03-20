import { toPng, toSvg } from "html-to-image";
import { Download, Printer, Image, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ExportActionsProps {
  cardRef: React.RefObject<HTMLDivElement>;
}

// Embed Google Fonts CSS manually to avoid CORS issues
const fontEmbedCSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Amiri:ital,wght@0,400;0,700;1,400&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Lato:wght@300;400;700&display=swap');
`;

const imageOptions = {
  pixelRatio: 3,
  cacheBust: true,
  skipFonts: false,
  // fontEmbedCSS,
  // filter: (node: HTMLElement) => {
  //   if (node.tagName === 'LINK' && node.getAttribute('rel') === 'stylesheet') {
  //     return false;
  //   }
  //   return true;
  // },
};

const ExportActions = ({ cardRef }: ExportActionsProps) => {
  const getPngDataUrl = async (node: HTMLDivElement) => {
    try {
      return await toPng(node, imageOptions);
    } catch (err) {
      console.warn("PNG export retrying with skipFonts due to browser/font limitations:", err);
      return toPng(node, { ...imageOptions, skipFonts: true });
    }
  };

  const getSvgDataUrl = async (node: HTMLDivElement) => {
    try {
      return await toSvg(node, { ...imageOptions, pixelRatio: 1 });
    } catch (err) {
      console.warn("SVG export retrying with skipFonts due to browser/font limitations:", err);
      return toSvg(node, { ...imageOptions, pixelRatio: 1, skipFonts: true });
    }
  };

  const downloadPng = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await getPngDataUrl(cardRef.current);
      const link = document.createElement("a");
      link.download = "eid-card.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Card downloaded as PNG!");
    } catch (err) {
      console.error("PNG export error:", err);
      toast.error("Failed to export. Please try again.");
    }
  };

  const downloadSvg = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await getSvgDataUrl(cardRef.current);
      const link = document.createElement("a");
      link.download = "eid-card.svg";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Card downloaded as SVG!");
    } catch (err) {
      console.error("SVG export error:", err);
      toast.error("Failed to export. Please try again.");
    }
  };

  const printCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await getPngDataUrl(cardRef.current);
      const win = window.open("", "_blank");
      if (win) {
        win.document.write(`
          <html><head><title>Eid Card</title>
          <style>body{display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#f5f5f5}img{max-width:100%;height:auto}@media print{body{background:white}}</style>
          </head><body><img src="${dataUrl}" /><script>setTimeout(()=>window.print(),500)<\/script></body></html>
        `);
        win.document.close();
      }
    } catch (err) {
      console.error("Print error:", err);
      toast.error("Failed to print. Please try again.");
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={downloadPng} className="gap-2 gradient-emerald text-cream border-0 shadow-gold hover:opacity-90 font-body">
        <Image className="w-4 h-4" /> Download PNG
      </Button>
      <Button onClick={downloadSvg} variant="outline" className="gap-2 border-accent text-accent-foreground hover:bg-accent/10 font-body">
        <FileCode className="w-4 h-4" /> Download SVG
      </Button>
      <Button onClick={printCard} variant="outline" className="gap-2 border-border text-foreground hover:bg-muted font-body">
        <Printer className="w-4 h-4" /> Print
      </Button>
    </div>
  );
};

export default ExportActions;
