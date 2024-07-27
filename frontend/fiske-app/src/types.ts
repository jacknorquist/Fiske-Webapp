
//user
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

//Comments
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
export interface CommentPropsType{
  comment:CommentType;
  updatePost: ()=> void;
}
export interface CommentFormDataType{
  content:string;
}
export interface CommentsContainerPropsType{
  comments: CommentType[];
  updatePost:()=>void;
  createComment:(formData:CommentFormDataType) => void
}
export interface CreateCommentFormPropsType{
  updatePost: ()=>void;
  createComment:(formData:CommentFormDataType)=> void;
}

//Fish and Fishboard
export interface FishboardType {
  created_at: string;
  fish: FishType[];
  id: number;
  updated_at: string;
  user_id: number;
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
export interface FishboardFormDataType{
  species: string;
  length: number;
  image?: File;
}
export interface FishPropsType{
  fish:FishType;
  fishBoardType:'GroupFishboard' | 'UserFishboard'
}
export interface FishboardContainerPropsType{
  fishboard:FishboardType;
  fishBoardType:'GroupFishboard' | 'UserFishboard'
  profileIsUser:boolean;
}
export interface FishboardFormPropsType{
  createFish: (formData: FishboardFormDataType) => void;
  toggleCreateFish: ()=>void;
}
export interface FishboardFormContainerPropsType{
  fishboard:FishboardType;
  fishBoardType:'GroupFishboard' | 'UserFishboard'
  toggleCreateFish:()=>void;
  updateFishboard:()=>void;
}

//group
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
export interface GroupFormDataType{
  name: string;
  fish_species: string;
  area: string;
  description:string;
  header_image?: File;
}
export interface CreateGroupContainerPropsType{
  toggleCreateGroup:()=> void;
  updateUserAdminGroups:()=>void;
}
export interface CreateGroupFormPropsType{
  createGroup: (formData:GroupFormDataType)=>void;
  toggleCreateGroup:()=>void;
}
export interface EditGroupContainerPropsType{
  toggleEditGroup: ()=> void;
  updateGroup:()=>void;
  group:GroupTypeWithFishboard
}
export interface EditGroupFormPropsType{
  editGroup: (FormData:GroupFormDataType)=> void;
  toggleEditGroup: ()=> void;
  group:GroupTypeWithFishboard;
}
export interface SearchGroupFormDataType{
  search:string;
}
export interface SearchGroupFormPropsType{
  updateGroups: (formData:SearchGroupFormDataType) => void;
}

//login
export interface LoginFormDataType{
  username: string;
  password:string;
}
export interface LoginFormPropsType{
  handleLogin: (formData: LoginFormDataType)=> void;
}

//posts
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
export interface PostFormDataType{
  content: string;
  poast_image_1?:File;
  poast_image_2?:File;
  poast_image_3?:File;
  poast_image_4?:File;
  poast_image_5?:File;
}
export interface CreatePostContainerPropsType{
  groupId:string | undefined;
  toggleCreatePost: ()=> void;
  updatePosts: ()=> void;
}
export interface CreatePostFormPropsType{
  createPost: (formData:PostFormDataType)=> void;
  toggleCreatePost:()=> void;
}
export interface PostListItemPropsType{
  post:PostType;
  updatePosts:()=> void;
}

//profile
export interface EditProfileFormDataType{
  username:string;
  first_name:string;
  last_name:string;
  bio: string;
  profile_image?: File;
  header_image?: File;
}
export interface EditProfileContainerPropsType{
  toggleEditProfileForm:()=> void;
  updateProfileUser:()=>void;
}
export interface EditProfileFormPropsType{
  handleEdit:(formData:EditProfileFormDataType)=> void;
  toggleEditProfileForm:()=>void;
  user:UserType;
}
export interface ProfileCardPropsType{
  profileIsUser:boolean;
  profileUser: ProfileUserType;
  updateProfileUser:() =>void;
  toggleCreateGroup:()=>void;
}
export interface UserAdminGroupsContainerPropsType{
  toggleCreateGroup: ()=>void;
  userAdminGroups:GroupType[];
  profileIsUser:boolean;
}

//signup
export interface SignupFormDataType{
  username:string;
  email:string;
  password:string;
  first_name:string;
  last_name:string;
  bio:string;
  profile_image?: File;
  header_image?: File;
}
export interface SignupFormPropsType{
  handleSignup:(formData:SignupFormDataType)=> void
}

//context
export interface MessageContextType {
  message: string;
  messageType: 'success' | 'error' | '';
  setMessage: (msg: string, type: 'success' | 'error' | '') => void;
  clearMessage: () => void;
}



