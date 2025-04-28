"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const [cameraActive, setCameraActive] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setPermissionDenied(false);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setPermissionDenied(true);
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };
  
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );
        
        const imageSrc = canvasRef.current.toDataURL("image/png");
        onCapture(imageSrc);
        stopCamera();
      }
    }
  };
  
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="relative bg-muted rounded-lg overflow-hidden aspect-video">
        {cameraActive ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {permissionDenied ? (
              <div className="text-center px-4">
                <p className="text-muted-foreground mb-2">
                  Camera access was denied. Please allow camera access in your browser settings.
                </p>
                <Button variant="outline" size="sm" onClick={startCamera}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Camera preview will appear here
              </p>
            )}
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      <div className="flex justify-between">
        {cameraActive ? (
          <>
            <Button variant="outline" onClick={stopCamera}>
              Cancel
            </Button>
            <Button onClick={captureImage}>
              Take Photo
            </Button>
          </>
        ) : (
          <Button 
            className="w-full" 
            onClick={startCamera}
            disabled={permissionDenied}
          >
            <Camera className="h-4 w-4 mr-2" />
            Start Camera
          </Button>
        )}
      </div>
    </div>
  );
}