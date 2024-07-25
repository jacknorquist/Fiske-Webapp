require_relative '../helpers/token_helper'

class AuthenticationController < ApplicationController
    include TokenHelper
    skip_before_action :authenticate_request, only: [:login]

    def login
      user = User.find_by(username: login_params[:username])
      if user && user.authenticate(login_params[:password])
        token = generate_token(user.id)
        render json: {user: user_json(user), token: token}, status: :ok
      else
        render json: {'Invalid username or password'}, status: :unauthorized
      end
    end

    private

    def login_params
        params.require(:login).permit(:username, :password)
    end

    def user_json(user)
      user_json = user.as_json(only: [:id, :username, :first_name, :last_name, :email, :bio])

      if user.profile_image
        user_json[:profile_image_url] = user.profile_image_url
      end

      if user.header_image
        user_json[:header_image_url] = user.header_image_url
      end

      user_json
    end
  end