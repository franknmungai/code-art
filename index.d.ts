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

type User = {
  artworkList: Artwork[];
  avatar: string;
  created_at: string;
  email: string;
  followers: number;
  followersList: any[];
  following: number;
  followingList: any[];
  github_uid: string;
  id: string;
  username: string;
  avatar: string;
};
