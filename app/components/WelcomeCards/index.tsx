"use client";

import { memo } from "react";
import ProfileCard from "./ProfileCard";
import ProjectCard from "./ProjectCard";

const WelcomeCards = memo(function WelcomeCards() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileCard />
        <ProjectCard />
      </div>
    </div>
  );
});

export default WelcomeCards;