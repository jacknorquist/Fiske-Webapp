require_relative '../helpers/token_helper'

class UsersController < ApplicationController
    include TokenService

    skip_before_action :authenticate_request, only: [:create]
    before_action :set_user, only: [:show, :update, :destroy]

    def index
      users = User.all.map do |user|
        user.as_json(only: [:id, :username, :first_name, :last_name, :email])
      end
      render json: { users: users }, status: :ok
    end


    def show
        render json: { User: user_json(@user)}, status: :ok
    end


    def create
      @user = User.new(user_params)
      if @user.save
        token = generate_token(@user.id)
        render json: { user: user_json(@user), token: token }, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @user.id == @current_user.id
          if @user.update(user_update_params)
              render json: { user: user_json(@user)}, status: :ok
          else
              render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
          end
      else
          render json: { errors: "Not Authorized" }, status: :unauthorized
      end
    end


    def destroy
      if @user.id == @current_user.id
          if @user.destroy
              render json: { message: "User Deleted" }, status: :ok
          else
              render json: { errors: @user.errors.full_messages }, status: :unprocessable_entityed
          end
      else
          render json: { errors: "Not Authorized" }, status: :unauthorized
      end
    end

    private

    def set_user
      @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'Group not found' }, status: :not_found
    end

    def user_params
      #do validation for parameters once js react form data type is figure out --For classes
      params.permit(:username, :first_name, :last_name, :email, :password, :header_image, :profile_image)
      # params.require(:user).permit(:username, :first_name, :last_name, :email, :password)
    end

    def user_update_params
      #do validation for parameters once js react form data type is figure out --For classes
      params.permit(:username, :first_name, :last_name, :email, :header_image, :profile_image)
      # params.require(:user).permit(:username, :first_name, :last_name, :email, :password)
    end


    def user_json(user)
      user_json = user.as_json(only: [:id, :username, :first_name, :last_name, :email])

      if user.profile_image
        user_json[:profile_image_url] = user.profile_image_url
      end

      if user.header_image
        user_json[:header_image_url] = user.header_image_url
      end

      user_json
    end

  end



