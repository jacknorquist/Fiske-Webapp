require_relative '../helpers/token_helper'

module AuthenticationHelper
    include TokenService

    def authenticate(email, password)
      user = User.find_by(email: email)
      return nil unless user&.authenticate(password)

      generate_token(user.id)
    end
  end