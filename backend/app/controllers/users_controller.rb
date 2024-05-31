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

      if params[:header_image].present?
        @user.header_image = params[:header_image]
      end

      if params[:profile_image].present?
        @user.profile_image = params[:profile_image]
      end

      if @user.save
        token = generate_token(@user.id)
        render json: { user: user_json(@user), token: token }, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @user.id == @current_user.id
          if @user.update(user_params_without_admin_id)
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
      post_data = JSON.parse(params[:user])
      # params.require(:user).permit(:username, :first_name, :last_name, :email, :password)
    end

    def user_params_without_admin_id
      user_params.except(:id)
    end

    def user_json(user)
        user.as_json(only: [:id, :username, :first_name, :last_name, :email])
    end

  end



