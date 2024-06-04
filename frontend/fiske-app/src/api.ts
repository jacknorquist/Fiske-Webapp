class FiskeAPI {
  static base_api_url = "http://localhost:3000";

  /** Fetch list of items
   * [{id, name, description, recipe, serve}, ...]
   * */

  static async login(formData){
    const {username, password} = formData
    console.log('hhhhhhhhhhh', username, 'hhhhhhhhhhhhhhhhhh')
    const response = await fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await response.json();
    console.log(data)
    // Store authentication token securely (e.g., in a cookie)
    return data.token;
  }


  static async signup(formData) {
    const {username, email, password, first_name, last_name} = formData
    const response = await fetch(`http://localhost:3000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         username: username,
         password: password,
         email:email,
         first_name:first_name,
        last_name:last_name}),
    });
    const data = await response.json();
    // Store authentication token securely (e.g., in a cookie)
    return data.token;
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
