"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onUpload: (imageSrc: string) => void;
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  
  const processFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPreviewImage(result);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleUpload = () => {
    if (previewImage) {
      onUpload(previewImage);
    }
  };
  
  return (
    <div className="space-y-4">
      {previewImage ? (
        <div className="relative">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image 
              src={previewImage} 
              alt="Preview" 
              fill 
              className="object-cover"
            />
          </div>
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 h-7 w-7"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg aspect-video
            flex flex-col items-center justify-center p-6
            transition-colors
            ${dragActive ? 'border-primary bg-primary/5' : 'border-muted'}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="text-center space-y-3">
            <div className="rounded-full bg-muted mx-auto h-12 w-12 flex items-center justify-center">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Drag and drop your image here</p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse from your device
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Image
            </Button>
          </div>
        </div>
      )}
      
      {previewImage && (
        <Button className="w-full" onClick={handleUpload}>
          Analyze Image
        </Button>
      )}
    </div>
  );
}