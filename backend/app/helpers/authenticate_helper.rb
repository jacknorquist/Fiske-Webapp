require_relative '../helpers/token_helper'

module AuthenticateHelper
    include TokenHelper

    def authenticate(email, password)
      user = User.find_by(email: email)
      return nil unless user&.authenticate(password)

      generate_token(user.id)
    end
  end