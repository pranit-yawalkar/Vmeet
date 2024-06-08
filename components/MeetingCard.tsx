import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import React from "react";

interface MeetingCardProps {
  title: string;
  description: string;
  icon: any;
  onClick: () => void;
  color: string;
}

const MeetingCard = (props: MeetingCardProps) => {
  const { title, description, icon, onClick, color } = props;
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",
        color
      )}
      onClick={onClick}
    >
      <div className="flex flex-center glassmorphism size-12 rounded-[10px]">
        <props.icon />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default MeetingCard;
