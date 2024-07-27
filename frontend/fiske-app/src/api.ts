import { SignupFormDataType,
         LoginFormDataType,
         EditProfileFormDataType,
         GroupFormDataType,
         PostFormDataType,
         CommentFormDataType,
         SearchGroupFormDataType,
         FishboardFormDataType,  }
         from "./types";

/**
 * FiskeAPI: provides communication with Fiske backend
 */
class FiskeAPI {
  static base_api_url = "https://fiske-backend.onrender.com";

  /**login:
   *  -params: username and password
   *  -returns: error or token
   *
   */
  static async login(formData:LoginFormDataType){
    const {username, password} = formData

    const response = await fetch(`https://fiske-backend.onrender.com/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({login:{ username: username, password: password }}),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**signup: creates new user
   *  - params: SignupFormData
   *  - returns: error or UserType
   */
  static async signup(formData:SignupFormDataType) {
    const { username,
            email,
            password,
            first_name,
            last_name,
            bio,
            profile_image,
            header_image
          } = formData;

    const data = new FormData();
    data.append('user[username]', username);
    data.append('user[password]', password);
    data.append('user[email]', email);
    data.append('user[bio]', bio);
    data.append('user[first_name]', first_name);
    data.append('user[last_name]', last_name);
    if (profile_image) {
        data.append('user[profile_image]', profile_image);
    }
    if (header_image) {
        data.append('user[header_image]', header_image);
    }
    const response = await fetch(`https://fiske-backend.onrender.com/users`, {
        method: 'POST',
        body: data,
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json();
}
/**editUser:
 *  - params: EditUserFormData, currentUsername, token
 *  - returns: error or UserType
 */
static async editUser(
                      formData:EditProfileFormDataType,
                      currentUsername:string,
                      token:string) {
  const { username,
          first_name,
          last_name,
          bio,
          profile_image,
          header_image
        } = formData;

  const data = new FormData();
  data.append('user[username]', username);
  data.append('user[first_name]', first_name);
  data.append('user[bio]', bio);
  data.append('user[last_name]', last_name);
  if (profile_image) {
      data.append('user[profile_image]', profile_image);
  }
  if (header_image) {
      data.append('user[header_image]', header_image);
  }

  const response = await fetch(`https://fiske-backend.onrender.com/users/${currentUsername}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data,
  });

  if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
  }
  return await response.json();
}

/**profile: fetches user's entire profile
 *  - params: token
 *  - return: error ProfileUserType
 */
  static async profile(token:string){
    const response = await fetch(`https://fiske-backend.onrender.com/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

/**getUser: gets user
 *  -params: token and userId
 *  -return: error or UserType
 */
  static async getUser(token:string, userId:number){
    const response = await fetch(`https://fiske-backend.onrender.com/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**getUserPosts: gets posts created by user
   *  - params: currentUserId and token
   *  - returns: error array of PostType
   */
  static async getUserPosts(currentUserId:number, token:string){
    const response = await fetch(`https://fiske-backend.onrender.com/users/${currentUserId}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /** getFeed: gets post from groups that user has joing
   * - params: currentUserId and token
   * - return: error or array of PostType
  */
  static async getFeed(currentUserId:number, token:string){
    const response = await fetch(`https://fiske-backend.onrender.com/users/${currentUserId}/feed`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**getExplorePosts: gets all posts
   * - params: userId and token
   * - return: error or array of posts
   */
  static async getExplorePosts(userId:number,token:string){
    const response = await fetch(`https://fiske-backend.onrender.com/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }
  /**getGroup: get GroupTypeWithFishboard for individual group
   *  - params: token, groupId
   *  - returns: error or GroupTypeWithFishboard
   */
  static async getGroup(token:string, groupId:number){
    const response = await fetch(`https://fiske-backend.onrender.com/groups/${groupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**getGroupPosts: get posts created in group
   *  - params: token, groupId
   * - returns: error or array of PostType
   */
  static async getGroupPosts(token:string, groupId:number){
    const response = await fetch(`https://fiske-backend.onrender.com/groups/${groupId}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }
  /**leaveGroup: user leave group
   *  - params: token, groupId
   *  - returns: message of success or failure
   */
  static async leaveGroup(token:string, groupId:number){
    const response = await fetch(`https://fiske-backend.onrender.com/groups/${groupId}/leave`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

    /**joinGroup: user join group
   *  - params: token, groupId
   *  - returns: message of success or failure
   */
  static async joinGroup(token:string, groupId:number){
    const response = await fetch(`https://fiske-backend.onrender.com/groups/${groupId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }
  /**getUserGroups: get groups that user has joined
   *  - params: token, userId
   *  - returns: error or array of GroupType
   */
  static async getUserGroups(token:string, userId:number){
    const response = await fetch(`https://fiske-backend.onrender.com/users/${userId}/groups`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**getExploreGroups: gets all groups
   *  - params: token
   *  - returns: error or array of GroupType
   */
  static async getExploreGroups(token:string){
    const response = await fetch(`https://fiske-backend.onrender.com/groups`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**searchGroups: searchs for groups based on search term
   *  - params: token, searchTerm (formData)
   *  - returns: error or array of GroupType
   */
  static async searchGroups(token:string, formData:SearchGroupFormDataType){
    const {search} = formData
    const response =
    await fetch(
      `https://fiske-backend.onrender.com/groups/search?query=
      ${encodeURIComponent(search)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**getPost: gets individual post
   *  - params: token, postId
   *  - returns: error or PostType
   */
  static async getPost(token:string, postId:number){
    const response = await fetch(`https://fiske-backend.onrender.com/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**createPost: creates post
   * - params: token, PostTypeFormData
   * - returns: error or PostType
   */
  static async createPost(token:string, groupId:number, formData:PostFormDataType) {
    const { content, ...images} = formData;

    const data = new FormData();
    data.append('content', content);
    console.log('images', images);
    for (let i=1; i<=5; i++){
      const postImageKey = `post_image_${i}` as keyof typeof images;
      const postImage = images[postImageKey];
      if(postImage){
        data.append(`post_image_${i}`, postImage)
      }
    }
    const response = await fetch(`https://fiske-backend.onrender.com/groups/${groupId}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data,
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json();
  }
  /**getUserAdminGroups: get groups that user has created
   *  - params: token, currentUserId
   *  - returns: error or array of GroupType
   */
  static async getUserAdminGroups(token:string, currentUserId:number){
    const response = await fetch(`https://fiske-backend.onrender.com/users/${currentUserId}/admin`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**createGroup: create group
   *  - params: token, GroupFormDataType
   *  - returns error or GroupType
   */
  static async createGroup(token:string, formData:GroupFormDataType) {
    const { name, fish_species, area, header_image, description} = formData;

    const data = new FormData();
    data.append('name', name);
    data.append('fish_species', fish_species);
    data.append('area', area);
    data.append('description', description);
    if(header_image){
      data.append('header_image', header_image)
      }
    const response = await fetch(`https://fiske-backend.onrender.com/groups`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data,
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json();
  }

  /**editGroup: edits group
   *  - params: token, GroupFormDataType, groupId
   *  - returns: error or GroupType
   */
  static async editGroup(token:string, formData:GroupFormDataType, groupId:number) {
    const { name, fish_species, area, header_image, description} = formData;

    const data = new FormData();
    data.append('name', name);
    data.append('fish_species', fish_species);
    data.append('area', area);
    data.append('description', description);

    if(header_image){
      data.append('header_image', header_image)
      }

    const response = await fetch(`https://fiske-backend.onrender.com/groups/${groupId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data,
    });
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json();
  }
  /**deletePost: deletes post
   *  - params: tokeb, groupId, postId
   * - returns: error or success message
   */
  static async deletePost(token:string, groupId:number, postId:number){
    const response = await fetch(`https://fiske-backend.onrender.com/groups/${groupId}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**createComment: creates comment
   *  - params: token, groupId, postId, CommentFormDataType
   *  - returns: error or CommentType
   */
  static async createComment(token:string, groupId:number, postId:number, formData:CommentFormDataType){
    const {content} = formData
    const data = new FormData()
    data.append('comment[content]', content)
    const response = await fetch(`https://fiske-backend.onrender.com/groups/${groupId}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data,
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**deleteComment: deletes comment
   *  - params: token, groupId, postId, commentId
   *  - returns: error or success message
   */
  static async deleteComment(token:string, groupId:number, postId:number, commentId:number){
    const response =
    await fetch(`https://fiske-backend.onrender.com/groups/${groupId}/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }


  /**deleteGroup: deletes group
   *  - params: token, groupId
   *  - returns: error of success message
   */
  static async deleteGroup(token:string, groupId:number){
    const response = await fetch(`https://fiske-backend.onrender.com/groups/${groupId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**createFish: creates fish record for fishboard
   * - params: token, fishBoardId, fishboardType, userId, formData
   * - returns: error or FishType
   */
  static async createFish(token:string, fishBoardId:number, fishBoardType:string, userId:number, formData:FishboardFormDataType){
    const {species, length, image } = formData;
    const data = new FormData();
    data.append('species', species);
    data.append('length', length.toString());
    if (image) data.append('image', image);
    data.append('user_id', userId.toString());
    data.append('fishboard_id', fishBoardId.toString());
    data.append('fishboard_type', fishBoardType);
    const response = await fetch(`https://fiske-backend.onrender.com/fishes/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data,
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**getUserFishboard: get fishboard of user type
   *  - params: token, fishboardId
   *  - returns FishboardType
   */
  static async getUserFishboard(token:string, fishboardId:number){
    const response = await fetch(`https://fiske-backend.onrender.com/user_fishboards/${fishboardId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }

  /**getGroupFishboard: gets fishboard of group type
   *  - params: token, fishboardId
   *  - returns: FishboardType
   */
  static async getGroupFishboard(token:string, fishboardId:number){
    const response = await fetch(`https://fiske-backend.onrender.com/group_fishboards/${fishboardId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }










  // static async getUsers(token) {
  //   const response = await fetch(`${this.base_api_url}/users`, {
  //     headers: {
  //       Authorization: 'Header eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyOX0.JJnz_XOYGoso8oCdlExqxxkY9xr3vq-z-Qnt9kP6Wg8'
  //     }
  //   });
  //   return await response.json();
  // }

  // static async getUsers() {
  //   const response = await fetch(`${this.base_api_url}/${type}`);
  //   return await response.json();
  // }

  // static async getGroups(){
  //   const response = await fetch(`${this.base_api_url}/${type}`)
  //   return await response.json()
  // }




}

export default FiskeAPI;
