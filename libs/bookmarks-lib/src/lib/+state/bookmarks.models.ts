/**
 * Interface for the 'Bookmarks' data
 */
export interface BookmarksEntity {
  id: string | number; // Primary ID
  name: string; // The name of the bookmark
  url: string; // The URL of the bookmark
  group: string; // The group in which the bookmark belongs (work, leisure, personal, etc.)
}
