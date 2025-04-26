import { Link } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";
const Page = () => {
  return (
    <>
         <section className="card-cta">
            <div className="flex flex-col gap-6 max-w-lg">
              <h2>Get Interview-Ready With AI-Powered Practices & Get Feedbacks</h2>
              <p className="text-lg">
                Practicve on real Time Interviews questionare & Get Instant Feedbacks
              </p>
              <Button asChild className="btn-primary max-sm:w-full">
                <Link href="/interview">Start an Interview</Link>
              </Button>
            </div>

            <Image src="/robot.png" alt="Robot-Guy" width={400} height={400} className="max-sm:hidden"/>

         </section>
         <section className="flex flex-col gap-6 mt-8">
              <h2>Your Current Interviews</h2>

              <div className="interview-section">
                {dummyInterviews.map((interview) => (
                  <InterviewCard {...interview} key={interview.id} />
                ))}
                   {/* <p>You have no interviews yet</p> */}
              </div>
         </section>

         <section className="flex flex-col gap-6 mt-8">
             <h2>Take an Interview</h2>
             <div className="interviws-section">
             {dummyInterviews.map((interview) => (
                  <InterviewCard {...interview} key={interview.id} />
                ))}
              {/* <p>There are no intervies available yet</p> */}
              </div>        
              </section>
    </>
  )
}
export default Page