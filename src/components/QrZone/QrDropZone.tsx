import React, { useState } from "react";
import jsQR from "jsqr";

export default function QrDropZone({ setRecipient }: { setRecipient: (address: string) => void }) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, img.width, img.height);

        if (code?.data) {
          const possibleAddress = code.data.trim();
          if (/^0x[a-fA-F0-9]{40}$/.test(possibleAddress)) {
            setRecipient(possibleAddress);
          } else {
            alert("QR code does not contain a valid Ethereum address");
          }
        } else {
          alert("No QR code detected");
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      className={`border-2 border-dashed border-secondary p-5 text-center ${
        dragging ? "bg-secondary" : "bg-transparent"
      } text-accent`}
    >
      Drag & drop a QR image here to auto-fill the recipient address
    </div>
  );
}
