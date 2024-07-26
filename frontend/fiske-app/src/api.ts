/**
 * FiskeAPI: provides communication with Fiske backend
 */
class FiskeAPI {
  static base_api_url = "https://fiske-backend.onrender.com";


  static async login(formData){
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


  static async signup(formData) {
    const { username, email, password, first_name, last_name, bio,  profile_image, header_image } = formData;

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

static async editUser(formData, currentUsername, token) {
  const { username, first_name, last_name, bio, profile_image, header_image } = formData;

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

  static async profile(token){
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

  static async getUser(token, id){
    const response = await fetch(`https://fiske-backend.onrender.com/users/${id}`, {
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

  static async getUserPosts(currentUserId, token){
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

  static async getFeed(currentUserId, token){
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


  static async getExplorePosts(userId,token){
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

  static async getGroup(token, groupId){
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

  static async getGroupPosts(token, groupId){
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
  static async leaveGroup(token, groupId){
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

  static async joinGroup(token, groupId){
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

  static async getUserGroups(token, userId){
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

  static async getExploreGroups(token){
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

  static async searchGroups(token, formData){
    const {search} = formData
    const response = await fetch(`https://fiske-backend.onrender.com/groups/search?query=${encodeURIComponent(search)}`, {
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

  static async getPost(token, postId){
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

  static async createPost(token, groupId, formData) {
    const { content, post_image_1, post_image_2, post_image_3, post_image_4, post_image_5 } = formData;

    const data = new FormData();
    data.append('content', content);
    for (let i=1; i<=5; i++){
      let postImage = eval(`post_image_${i}`);
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

  static async getUserAdminGroups(token, currentUserId){
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

  static async createGroup(token, formData) {
    const { name, fish_species, area, header_image, description,  image_1, image_2, image_3, image_4, image_5} = formData;


    const data = new FormData();
    data.append('name', name);
    data.append('fish_species', fish_species);
    data.append('area', area);
    data.append('description', description);
    console.log(header_image, 'header image at create')

    if(header_image){
      data.append('header_image', header_image)
      }
    for (let i=1; i<=5; i++){
      let image = eval(`image_${i}`);
      if(image){
        data.append(`image_${i}`, image)
      }
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

  static async editGroup(token, formData, groupId) {
    const { name, fish_species, area, header_image, description, image_1, image_2, image_3, image_4, image_5} = formData;
    console.log(groupId)

    const data = new FormData();
    data.append('name', name);
    data.append('fish_species', fish_species);
    data.append('area', area);
    data.append('description', description)

    if(header_image){
      data.append('header_image', header_image)
      }
    for (let i=1; i<=5; i++){
      let image = eval(`image_${i}`);
      if(image){
        data.append(`image_${i}`, image)
      }
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

  static async deletePost(token, groupId, postId){
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

  static async createComment(token, groupId, postId, formData){
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


  static async deleteComment(token, groupId, postId, commentId){
    const response = await fetch(`https://fiske-backend.onrender.com/groups/${groupId}/posts/${postId}/comments/${commentId}`, {
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



  static async deleteGroup(token, groupId){
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


  static async createFish(token, fishBoardId, fishBoardType, userId, formData){
    const {species, length, image } = formData
    const data = new FormData()
    data.append('species', species)
    data.append('length', length)
    data.append('image', image)
    data.append('user_id', userId)
    data.append('fishboard_id', fishBoardId)
    data.append('fishboard_type', fishBoardType)
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


  static async getUserFishboard(token, fishboardId){
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

  static async getGroupFishboard(token, fishboardId){
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










  static async getUsers(token) {
    const response = await fetch(`${this.base_api_url}/users`, {
      headers: {
        Authorization: 'Header eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyOX0.JJnz_XOYGoso8oCdlExqxxkY9xr3vq-z-Qnt9kP6Wg8'
      }
    });
    return await response.json();
  }

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
