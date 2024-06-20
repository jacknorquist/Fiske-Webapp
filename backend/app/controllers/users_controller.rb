require_relative '../helpers/token_helper'

class UsersController < ApplicationController
    include TokenService

    skip_before_action :authenticate_request, only: [:create]
    before_action :set_user, only: [:show, :update, :destroy, :groups, :posts, :feed]

    def index
      users = User.all.map do |user|
        user.as_json(only: [:id, :username, :first_name, :last_name, :email])
      end
      render json: { users: users }, status: :ok
    end

    def profile
      render json: user_json(@current_user)
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
      unless @user.id == @current_user.id
        return render json: { errors: "Not Authorized" }, status: :unauthorized
      end
      if @user.update(user_update_params)
        render json: { user: user_json(@user)}, status: :ok
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end


    def destroy
      unless authorized
        return render json: { errors: "Incorrect Password" }, status: :unauthorized
      end
      unless @user.id == @current_user.id
        return render json: { errors: "Not Authorized" }, status: :unauthorized
      end

      if @user.destroy
        render json: { message: "User Deleted" }, status: :ok
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entityed
      end
    end

    def groups
      render json: @user.groups, status: :ok
    end
    def posts

      posts = @user.posts

      posts_with_group_names = posts.map do |post|
        {
          id: post.id,
          title: post.title,
          content: post.content,
          created_at: post.created_at,
          group_id: post.group.id,
          group_name: post.group.name  # Assuming post belongs to a group
        }
      end

      render json: posts_with_group_names, status: :ok
    end

    def feed
      group_ids = @user.groups.pluck(:id)
      posts = Post.by_groups(group_ids)

      # Assuming Post.by_groups(group_ids) returns an array of Post objects
      # with associated Group objects, you can modify the posts array like this:
      posts_with_group_names = posts.map do |post|
        {
          id: post.id,
          title: post.title,
          content: post.content,
          created_at: post.created_at,
          group_id: post.group.id,
          group_name: post.group.name  # Assuming post belongs to a group
        }
      end

      render json: posts_with_group_names
    end


    private

    def set_user
      @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found' }, status: :not_found
    end

    def user_params
      params.require(:user).permit(:username, :password, :email, :first_name, :last_name, :header_image, :profile_image)
    end

    def user_update_params
      params.require(:user).permit(:username, :first_name, :last_name, :email, :header_image, :profile_image)
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
    def authorized
      @user.authenticate_password(params[:password])
    end

  end



