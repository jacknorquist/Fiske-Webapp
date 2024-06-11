class FiskeAPI {
  static base_api_url = "http://localhost:3000";


  static async login(formData){
    const {username, password} = formData

    const response = await fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({login:{ username: username, password: password }}),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.log(errorMessage)
      throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json()
  }


  static async signup(formData) {
    const { username, email, password, first_name, last_name, profile_image, header_image } = formData;

    const data = new FormData();
    data.append('user[username]', username);
    data.append('user[password]', password);
    data.append('user[email]', email);
    data.append('user[first_name]', first_name);
    data.append('user[last_name]', last_name);
    if (profile_image) {
        data.append('user[profile_image]', profile_image);
    }
    if (header_image) {
        data.append('user[header_image]', header_image);
    }

    const response = await fetch(`http://localhost:3000/users`, {
        method: 'POST',
        body: data,
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'An unknown error occurred');
    }
    return await response.json();
}

static async editUser(formData, currentUserId, token) {
  const { username, first_name, last_name, profile_image, header_image } = formData;

  const data = new FormData();
  data.append('user[username]', username);
  data.append('user[first_name]', first_name);
  data.append('user[last_name]', last_name);
  if (profile_image) {
      data.append('user[profile_image]', profile_image);
  }
  if (header_image) {
      data.append('user[header_image]', header_image);
  }

  const response = await fetch(`http://localhost:3000/users/${currentUserId}`, {
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
    const response = await fetch(`http://localhost:3000/users/profile`, {
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

  static async getUserGroups(currentUserId, token){
    const response = await fetch(`http://localhost:3000/users/${currentUserId}/groups`, {
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
    const response = await fetch(`http://localhost:3000/users/${currentUserId}/posts`, {
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

  /**
   * Add item to DB
   */
  static async addItem(item) {
    const { type, name, description, serve, id, recipe } = item;
    await fetch(`${this.base_api_url}/${type}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id': name.toLowerCase(),
          'name': name,
          'description': description,
          'recipe': recipe,
          'serve': serve
        })
      });
  }



}

export default FiskeAPI;
