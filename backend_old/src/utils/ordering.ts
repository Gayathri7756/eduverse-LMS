export const computeContentState = (sections: any[], watchedVideoIds: string[]) => {
  let allVideos: any[] = [];
  sections.forEach(section => {
    section.videos.forEach((video: any) => {
      allVideos.push({ ...video, sectionId: section.id });
    });
  });

  const sortedVideos = allVideos.sort((a, b) => {
    const sectionA = sections.find(s => s.id === a.sectionId);
    const sectionB = sections.find(s => s.id === b.sectionId);
    if (sectionA.order !== sectionB.order) return sectionA.order - sectionB.order;
    return a.order - b.order;
  });

  return sortedVideos.map((video, index) => {
    const isFirst = index === 0;
    const prevVideo = index > 0 ? sortedVideos[index - 1] : null;
    
    // Strict Lock: Locked if not the first video AND previous video is NOT completed
    const isLocked = !isFirst && (!prevVideo || !watchedVideoIds.includes(prevVideo.id));
    
    return {
      ...video,
      isLocked,
      isCompleted: watchedVideoIds.includes(video.id),
      prevVideoId: prevVideo?.id || null,
      nextVideoId: sortedVideos[index + 1]?.id || null,
    };
  });
};
