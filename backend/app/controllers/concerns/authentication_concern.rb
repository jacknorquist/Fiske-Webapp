


module AuthenticationConcern
    include TokenService

    def current_user
      return unless token = request.headers['Authorization']&.split(' ')&.last
      @current_user ||= User.find_by(id: decode_token(token)['user_id'])
    end

    def authenticate_user!
      head :unauthorized unless current_user
    end
  end