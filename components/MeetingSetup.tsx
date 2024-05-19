"use client";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);
  const call = useCall();

  if (!call) {
    throw new Error("usecall must be used in stream call component.");
  }

  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera?.disable();
      call?.microphone?.disable();
    } else {
      call?.camera?.enable();
      call?.microphone?.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview className="rounded-2xl mx-2 max-w-[300px] md:max-w-full" />
      <div className="flex flex-col md:flex-row md:h-16 items-center justify-center gap-3">
        <label
          htmlFor="join"
          className="flex items-center gap-2 justify-center font-medium"
        >
          <input
            id="join"
            type="checkbox"
            checked={isMicCamToggleOn}
            onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
        <Button
          className="rounded-md bg-blue-1 px-4 py-2.5"
          onClick={() => {
            setIsSetupComplete(true);
            call.join();
          }}
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
