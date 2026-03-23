import prisma from '../../utils/prisma';

export class ProgressService {
  static async upsertProgress(userId: string, videoId: string, data: any) {
    return prisma.videoProgress.upsert({
      where: { userId_videoId: { userId, videoId } },
      update: {
        lastPosition: data.lastPosition,
        status: data.status || 'IN_PROGRESS'
      },
      create: {
        userId,
        videoId,
        lastPosition: data.lastPosition || 0,
        status: data.status || 'IN_PROGRESS'
      }
    });
  }

  static async getProgressByVideo(userId: string, videoId: string) {
    return prisma.videoProgress.findUnique({
      where: { userId_videoId: { userId, videoId } }
    });
  }

  static async getSubjectProgress(userId: string, subjectId: string) {
    const videos = await prisma.video.findMany({
      where: { section: { subjectId } },
      select: { id: true }
    });
    const videoIds = videos.map(v => v.id);

    const progress = await prisma.videoProgress.findMany({
      where: { userId, videoId: { in: videoIds } }
    });

    const completed = progress.filter(p => p.status === 'COMPLETED').length;
    return {
      total: videoIds.length,
      completed,
      percentage: videoIds.length > 0 ? (completed / videoIds.length) * 100 : 0
    };
  }
}
