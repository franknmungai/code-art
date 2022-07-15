type Artwork = {
  created_at: string;
  css: string;
  html: string;
  id: string;
  js: String;
  reactionsList: [];
  user_id: string;
  username: string;
  users: [];
  reactionsCount?: {
    Favorite?: string;
    Hot?: string;
    Amazing?: string;
    Mindblowing?: string;
  };
};
