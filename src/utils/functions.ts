import uid from "uid";

export const get_image_filename = (ext: string): string => `photo-${uid(12)}-${uid(12)}.${ext}`