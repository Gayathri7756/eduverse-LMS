import prisma from '../../utils/prisma';
import { computeContentState } from '../../utils/ordering';

export class SubjectService {
  static async getAll() {
    return prisma.subject.findMany();
  }

  static async getById(id: string) {
    return prisma.subject.findUnique({ where: { id } });
  }

  static async getTree(id: string, userId: string) {
    const subject = await prisma.subject.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { order: 'asc' },
          include: {
            videos: { orderBy: { order: 'asc' } }
          }
        }
      }
    });

    if (!subject) throw { status: 404, message: 'Subject not found' };

    const progress = await prisma.videoProgress.findMany({
      where: { userId, status: 'COMPLETED' },
      select: { videoId: true }
    });
    const watchedIds = progress.map(p => p.videoId);

    const orderedVideos = computeContentState(subject.sections, watchedIds);

    // Reconstruct the tree with state
    const sectionsWithState = subject.sections.map(section => ({
      ...section,
      videos: orderedVideos.filter(v => v.sectionId === section.id)
    }));

    return { ...subject, sections: sectionsWithState };
  }
}
