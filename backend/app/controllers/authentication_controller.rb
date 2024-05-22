require_relative '../helpers/token_helper'

class AuthenticationController < ApplicationController
    include TokenService
    skip_before_action :authenticate_request, only: [:login]

    def login
      user = User.find_by(username: login_params[:username])
      if user && user.authenticate(login_params[:password])
        token = generate_token(user.id)
        render json: { user: user_json(user), token: token }, status: :ok
      else
        render json: { error: 'Invalid useranem or password' }, status: :unauthorized
      end
    end

    private

    def login_params
        params.require(:login).permit(:username, :password)
    end

    def user_json(user)
      user.as_json(only: [:id, :username])
    end
  end