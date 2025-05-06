import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { profiles } from 'generated/prisma';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async getAllProfiles(): Promise<profiles[]> {
    return this.prisma.profiles.findMany();
  }

	async getProfileById(id: string): Promise<profiles> {
			const profile = await this.prisma.profiles.findUnique({
				where: { id },
			});
	
			if (!profile) {
				throw new NotFoundException(`profile with ID ${id} not found`);
			}
	
			return profile;
		}
}