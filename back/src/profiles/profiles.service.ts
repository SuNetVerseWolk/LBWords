import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { profiles } from 'generated/prisma';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class ProfilesService {
  private supabase: SupabaseClient;

  constructor(private prisma: PrismaService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
    );
  }

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

  async updateProfile(
    id: string,
    updateData: profiles,
    imageFile?: Express.Multer.File,
  ): Promise<profiles> {
    const existingProfile = await this.getProfileById(id);
		console.log(typeof updateData, updateData)

    let imageUrl = existingProfile.image;

    if (imageFile) {
      // Upload new image first (better to have the new image before deleting the old one)
      imageUrl = await this.uploadImageToStorage(id, imageFile);

      // Delete old image if exists (only after successful upload)
      if (existingProfile.image) {
        try {
          await this.deleteImageFromStorage(existingProfile.image);
        } catch (error) {
          console.error('Failed to delete old image:', error);
          // Don't fail the whole operation if deletion fails
        }
      }
    }

    return this.prisma.profiles.update({
      where: { id },
      data: {
        nickname: updateData.nickname,
        image: imageUrl,
        updated_at: new Date(),
      },
    });
  }

  private async uploadImageToStorage(
    userId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const sanitizedOriginal = file.originalname
      .replace(/[^a-zA-Z0-9-_.]/g, '_') // Replace invalid characters with underscores
      .replace(/_+/g, '_'); // Collapse multiple underscores

    const filePath = `${userId}-${Date.now()}-${sanitizedOriginal}`;

    const { error } = await this.supabase.storage
      .from('avatars')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw new Error(`Upload failed: ${error.message}`);

    const {
      data: { publicUrl },
    } = this.supabase.storage.from('avatars').getPublicUrl(filePath);

    return publicUrl;
  }

  private async deleteImageFromStorage(imageUrl: string): Promise<void> {
    try {
      // Extract just the file path after '/avatars/'
      const filePath = imageUrl.split('/avatars/')[1];

      if (!filePath) {
        throw new Error('Could not extract file path from URL');
      }

      console.log(`Attempting to delete: ${filePath}`); // Debug log

      const { error } = await this.supabase.storage
        .from('avatars')
        .remove([filePath]);

      if (error) {
        throw error;
      }

      console.log(`Successfully deleted: ${filePath}`); // Debug log
    } catch (error) {
      console.error('Deletion error:', error);
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }
}
