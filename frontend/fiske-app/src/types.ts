

export interface UserType {
  bio: string;
  email: string;
  first_name: string;
  fishboard_points: number;
  header_image_url: string;
  id: number;
  last_name: string;
  profile_image_url: string;
  username: string;
}

export interface ProfileUserType {
  user: UserType;
  fishboard: FishboardType;
}


export interface FishType {
  created_at: string;
  fishboard_id: number;
  fishboard_type: 'UserFishboard' | 'GroupFishboard';
  id: number;
  image_data: string;
  image_url: string;
  length: number;
  species: string;
  updated_at: string;
  user_id: number;
}


export interface FishboardType {
  created_at: string;
  fish: FishType[];
  id: number;
  updated_at: string;
  user_id: number;
}


export interface PostType {
  comments: CommentType[];
  content: string;
  created_at: string;
  group_id: number;
  group_name: string;
  id: number;
  images: string[];
  user_id: number;
  user_profile_image: string | null;
  username: string;
}

export interface CommentType {
  id: number;
  post_id: number;
  user_id: number;
  username: string;
  user_profile_image: string | null;
  content: string;
  created_at: string;
  group_id: number;
}

export interface GroupType {
  admin_id: number;
  area: string;
  description: string;
  fish_species: string;
  header_image_url: string;
  id: number;
  images: Record<string, any>;
  name: string;
}

export interface GroupTypeWithFishboard {
  group:GroupType;
  fishboard:FishboardType
}

