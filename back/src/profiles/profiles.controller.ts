import { Controller, Get, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { profiles } from 'generated/prisma';

@Controller('profiles')
export class ProfilesController {
	constructor(private readonly profilessService: ProfilesService) {}
	
		@Get()
		async getAllBooks(): Promise<profiles[]> {
			return this.profilessService.getAllProfiles();
		}

		@Get(':id')
		async getBookById(@Param('id') id: string): Promise<profiles> {
			return this.profilessService.getProfileById(id);
		}
}
