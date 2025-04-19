// EyeTracking.jsx
import React, { useEffect, useRef, useState } from "react";
import webgazer from "webgazer";
window.webgazer = webgazer;

// Configuration Constants
const FOCUS_CONFIRMATION_DELAY = 3000;
const DISTRACTION_THRESHOLD = 100;
const SCREEN_MARGIN = 50;

export default function EyeTracking() {
  const [focusStatus, setFocusStatus] = useState("initializing");
  const gazeHistory = useRef([]);
  const confirmationTimer = useRef(null);
  const lastGazeTimestamp = useRef(Date.now());
  const videoPreviewRef = useRef(null);

  // Core gaze analysis algorithm
  const analyzeGazePattern = (data) => {
    const now = Date.now();
    gazeHistory.current.push({ ...data, timestamp: now });
    
    // Maintain rolling 2-second window of gaze data
    gazeHistory.current = gazeHistory.current.filter(
      entry => now - entry.timestamp < 2000
    );

    const isOnScreen = data && 
      data.x > SCREEN_MARGIN && 
      data.x < window.innerWidth - SCREEN_MARGIN &&
      data.y > SCREEN_MARGIN && 
      data.y < window.innerHeight - SCREEN_MARGIN;

    return isOnScreen;
  };

  // Gaze data handler
  const handleGazeUpdate = (data) => {
    const isFocused = analyzeGazePattern(data);
    lastGazeTimestamp.current = Date.now();

    if (isFocused) {
      if (focusStatus !== "focused" && !confirmationTimer.current) {
        confirmationTimer.current = setTimeout(() => {
          setFocusStatus("focused");
          confirmationTimer.current = null;
        }, FOCUS_CONFIRMATION_DELAY);
      }
    } else {
      if (focusStatus !== "distracted") {
        setFocusStatus("distracted");
      }
      if (confirmationTimer.current) {
        clearTimeout(confirmationTimer.current);
        confirmationTimer.current = null;
      }
    }
  };

  // WebGazer initialization
  useEffect(() => {
    const initEyeTracking = async () => {
      try {
        await webgazer
          .setRegression("ridge")
          .setGazeListener(handleGazeUpdate)
          .begin();
        
        webgazer.showVideoPreview(true);
        webgazer.showFaceOverlay(false);
        webgazer.showFaceFeedbackBox(false);

        const styleVideo = () => {
          const video = document.getElementById('webgazerVideoFeed');
          if (video) {
            video.style.cssText = `
              position: fixed;
              bottom: 32px;
              right: 32px;
              width: 220px;
              height: 160px;
              z-index: 100;
              border-radius: 0.75rem;
              box-shadow: 0 4px 24px #000a;
              border: 2px solid #6366f1;
              background: #111827;
            `;
            videoPreviewRef.current = video;
          }
        };
        setTimeout(styleVideo, 500);

      } catch (error) {
        console.error("Eye tracking initialization failed:", error);
        setFocusStatus("error");
      }
    };

    initEyeTracking();

    return () => {
      try {
        webgazer.end();
        if (videoPreviewRef.current?.parentNode) {
          videoPreviewRef.current.parentNode.removeChild(videoPreviewRef.current);
        }
      } catch (e) {}
      if (confirmationTimer.current) clearTimeout(confirmationTimer.current);
    };
  }, []);

  // Distraction watchdog
  useEffect(() => {
    const distractionWatchdog = setInterval(() => {
      if (Date.now() - lastGazeTimestamp.current > DISTRACTION_THRESHOLD) {
        setFocusStatus("distracted");
      }
    }, 100);

    return () => clearInterval(distractionWatchdog);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex flex-col items-center justify-center">
      <div className="relative max-w-md w-full mt-20">
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2">AI Flow State Eye Tracking</h1>
          
          <div className="mb-6">
            {focusStatus === "focused" ? (
              <div className="flex items-center text-green-400">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Fully Focused
              </div>
            ) : focusStatus === "distracted" ? (
              <div className="flex items-center text-red-400">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                </span>
                Distraction Detected
              </div>
            ) : (
              <div className="text-yellow-400">Calibrating...</div>
            )}
          </div>

          <p className="text-sm text-gray-400 text-center">
            {focusStatus === "focused" 
              ? "Keep up the good work! Your focus is being maintained."
              : "Please return your gaze to the screen to resume focus tracking."}
          </p>
        </div>
      </div>
    </div>
  );
}
