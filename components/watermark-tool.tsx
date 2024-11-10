"use client"

import React, { useState, useRef, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import KofiButton from "./KofiButton";

export function WatermarkToolComponent() {
  const [image, setImage] = useState<string | null>(null);
  const [watermarkType, setWatermarkType] = useState<"text" | "image">("text");
  const [watermarkContent, setWatermarkContent] = useState("");
  const [watermarkImage, setWatermarkImage] = useState<string | null>(null);
  const [position, setPosition] = useState("center");
  const [opacity, setOpacity] = useState(50);
  const [scale, setScale] = useState(20);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => setImage(e.target?.result as string);
  //     reader.readAsDataURL(file);
  //   }
  // };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: false
  });

  const handleWatermarkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setWatermarkImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Apply watermark
          ctx.globalAlpha = opacity / 100;
          if (watermarkType === "text" && watermarkContent) {
            ctx.font = `${scale * 2}px Arial`;
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const x = position.includes("left") ? canvas.width * 0.25 :
                      position.includes("right") ? canvas.width * 0.75 :
                      canvas.width / 2;
            const y = position.includes("top") ? canvas.height * 0.25 :
                      position.includes("bottom") ? canvas.height * 0.75 :
                      canvas.height / 2;
            ctx.fillText(watermarkContent, x, y);
          } else if (watermarkType === "image" && watermarkImage) {
            const watermark = new Image();
            watermark.onload = () => {
              const wWidth = watermark.width * (scale / 100);
              const wHeight = watermark.height * (scale / 100);
              const x = position.includes("left") ? 0 :
                        position.includes("right") ? canvas.width - wWidth :
                        (canvas.width - wWidth) / 2;
              const y = position.includes("top") ? 0 :
                        position.includes("bottom") ? canvas.height - wHeight :
                        (canvas.height - wHeight) / 2;
              ctx.drawImage(watermark, x, y, wWidth, wHeight);
            };
            watermark.src = watermarkImage;
          }
        };
        img.src = image;
      }
    }
  }, [image, watermarkType, watermarkContent, watermarkImage, position, opacity, scale]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = "watermarked-image.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Simple Online Watermark Tool for Images</h1>
        <p className="text-gray-500 mb-4">Add a watermark to your images easily</p>
        <KofiButton />
      </header>

      <div className="mb-8">
        {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
        /> */}
           <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">Drop the image here...</p>
      ) : (
        <div>
          <p className="text-gray-600">Drag and drop an image here, or click to select</p>
          <p className="text-sm text-gray-500 mt-2">Supports: JPG, PNG</p>
        </div>
      )}
    </div>

      </div>

      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Watermark Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Watermark Type</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setWatermarkType("text")}
                className={`px-4 py-2 rounded ${watermarkType === "text" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Text
              </button>
              <button
                onClick={() => setWatermarkType("image")}
                className={`px-4 py-2 rounded ${watermarkType === "image" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                Image
              </button>
            </div>
          </div>

          {watermarkType === "text" ? (
            <div>
              <label className="block mb-2">Watermark Text</label>
              <input
                type="text"
                value={watermarkContent}
                onChange={(e) => setWatermarkContent(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded dark:border-neutral-800"
              />
            </div>
          ) : (
            <div>
              <label className="block mb-2">Watermark Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleWatermarkImageUpload}
                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                   file:rounded-full file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-blue-50 file:text-blue-700
                                   hover:file:bg-blue-100"
              />
            </div>
          )}

          <div>
            <label className="block mb-2">Position</label>
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-neutral-200 border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:border-neutral-800">
                {position}
                <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 text-gray-400" aria-hidden="true" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {["center", "top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
                  <Menu.Item key={pos}>
                    {({ active }) => (
                      <button
                        onClick={() => setPosition(pos)}
                        className={`${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {pos}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>

          <div>
            <label className="block mb-2">Opacity: {opacity}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2">Scale: {scale}%</label>
            <input
              type="range"
              min="1"
              max="100"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Image Preview</h2>
        <div className="border rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="max-w-full h-auto" />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleDownload}
          disabled={!image}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold disabled:opacity-50"
        >
          Download
        </button>
      </div>
    </div>
  );
}