export interface DigitalAsset {
  id: string;
  productId: string;
  name: string;
  format: "pdf" | "epub";
  downloadUrl: string;
}
