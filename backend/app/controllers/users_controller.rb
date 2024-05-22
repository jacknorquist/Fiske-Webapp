require_relative '../helpers/token_helper'

class UsersController < ApplicationController
    include TokenService

    skip_before_action :authenticate_request, only: [:create]

    def create
      @user = User.new(user_params)

      if @user.save
        token = generate_token(@user.id)
        render json: { user: user_json(@user), token: token }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:username, :first_name, :last_name, :email, :password)
    end
    def user_json(user)
        user.as_json(only: [:id, :username, :first_name, :last_name, :email])
    end

  end



