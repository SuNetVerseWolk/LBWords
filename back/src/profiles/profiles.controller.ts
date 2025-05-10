import { Body, Controller, Get, Param, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { profiles } from 'generated/prisma';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async getAllBooks(): Promise<profiles[]> {
    return this.profilesService.getAllProfiles();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<profiles> {
    return this.profilesService.getProfileById(id);
  }

	@Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(
    @Param('id') id: string,
    @Body() updateData: profiles,
    @UploadedFile() avatar?: Express.Multer.File
  ) {
    return this.profilesService.updateProfile(id, updateData, avatar);
  }
}
