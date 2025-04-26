import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

enum CallStatus {
  Inactive = "inactive",
  CONNECTING = "connecting",
  ACTIVE = "active",
  FINISHED = "finished",
}

const Agent = ({ userName }: AgentProps) => {
  const callStatus = CallStatus.FINISHED;
  const isSpeaking = true;
  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image src="/ai-avatar.png" alt="vapi" width={65} height={65} className="object-cover" />
            {isSpeaking && <span className="animate-speak bg-green-500" />}
          </div>
          <h3>AI Agent Interview</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image src="/user-avatar.png" alt="user avatar" width={540} height={540} className="rounded-full object-cover size-[120px]" />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        {callStatus !== 'ACTIVE' ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== 'CONNECTING' && "hidden"
              )}
            />
            <span className="relative">
              {callStatus === 'INACTIVE' || callStatus === 'FINISHED'
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">
            END
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;