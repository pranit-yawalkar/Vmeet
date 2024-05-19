"use client";
import {
  Calendar,
  CheckCircle,
  Copy,
  Plus,
  UserPlus,
  Video,
} from "lucide-react";
import React, { useState } from "react";
import MeetingCard from "./MeetingCard";
import { title } from "process";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";

const MeetingTypes = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const [meetingInfo, setMeetingInfo] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const { toast } = useToast();
  const [callDetails, setCallDetails] = useState<Call>();

  const meetingList = [
    {
      title: "New Meeting",
      description: "Start an instant meeting",
      icon: Plus,
      onClick: () => setMeetingState("isInstantMeeting"),
      color: "bg-orange-1",
    },
    {
      title: "Join Meeting",
      description: "Join meeting via invitation link",
      icon: Calendar,
      onClick: () => setMeetingState("isJoiningMeeting"),
      color: "bg-blue-1",
    },
    {
      title: "Schedule Meeting",
      description: "Plan your meeting",
      icon: Video,
      onClick: () => setMeetingState("isScheduleMeeting"),
      color: "bg-purple-1",
    },
    {
      title: "View Recordings",
      description: "Check out your recordings",
      icon: UserPlus,
      onClick: () => router.push("recordings"),
      color: "bg-yellow-1",
    },
  ];

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!meetingInfo.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        meetingInfo.dateTime.toISOString() ||
        new Date(Date.now()).toISOString();
      const description = meetingInfo.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);
      if (!meetingInfo.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({ title: "Meeting created successfully." });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting.",
      });
    }
  };


  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {meetingList.map((meeting, index) => (
        <MeetingCard
          key={index}
          title={meeting.title}
          description={meeting.description}
          icon={meeting.icon}
          onClick={meeting.onClick}
          color={meeting.color}
        />
      ))}

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          classsName="text-center"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setMeetingInfo({ ...meetingInfo, description: e.target.value });
              }}
            />
          </div>
          <div className="w-full flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={meetingInfo.dateTime}
              onChange={(date) =>
                setMeetingInfo({ ...meetingInfo, dateTime: date! })
              }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
              className="w-full rounded bg-dark-2 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          classsName="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link copied" });
          }}
          icon={CheckCircle}
          buttonIcon={Copy}
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        classsName="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypes;
