export const computeContentState = (sections: any[], watchedVideoIds: string[]) => {
  let allVideos: any[] = [];
  sections.forEach(section => {
    section.videos.forEach((video: any) => {
      allVideos.push({ ...video, sectionId: section.id });
    });
  });

  // Sort by section order and video order
  allVideos.sort((a, b) => {
    const sectionA = sections.find(s => s.id === a.sectionId);
    const sectionB = sections.find(s => s.id === b.sectionId);
    if (sectionA.order !== sectionB.order) return sectionA.order - sectionB.order;
    return a.order - b.order;
  });

  return allVideos.map((video, index) => {
    const isFirst = index === 0;
    const prevVideo = index > 0 ? allVideos[index - 1] : null;
    
    // A video is unlocked if:
    // 1. It's the first video
    // 2. The previous video is watched
    const isUnlocked = isFirst || (prevVideo && watchedVideoIds.includes(prevVideo.id));
    
    return {
      ...video,
      isUnlocked,
      prevVideoId: prevVideo?.id || null,
      nextVideoId: allVideos[index + 1]?.id || null,
    };
  });
};
