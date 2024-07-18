require_relative '../helpers/token_helper'

class UsersController < ApplicationController
    include TokenHelper

    skip_before_action :authenticate_request, only: [:create]
    before_action :set_user, only: [:show, :update, :destroy, :groups, :posts, :feed, :admin_groups]

    def index
      users = User.all.map do |user|
        user.as_json(only: [:id, :username, :first_name, :last_name, :email, :bio])
      end
      render json: { users: users }, status: :ok
    end

    def profile
      render json:
        user_json(@current_user)

    end

    def show
      render json: {
        user: user_json(@user),
        fishboard: @user.user_fishboard.as_json(include: { fish: { methods: :image_url }})
      }
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
        render json: { user: user_json(@user), fishboard: @user.user_fishboard.as_json(include: :fish)}, status: :ok
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
      posts_with_group_names_and_images = posts.map do |post|
        post_json = {
          id: post.id,
          user_id: post.user.id,
          username: post.user.username,
          user_profile_image: post.user&.profile_image_url,
          content: post.content,
          created_at: post.created_at,
          group_id: post.group.id,
          group_name: post.group.name,
          comments: post.comments.map do |comment|
            {
              id: comment.id,
              content: comment.content,
              user_id: comment.user_id,
              username: comment.user.username,
              user_profile_image: post.user&.profile_image_url,
              created_at: comment.created_at,
              group_id: comment.post.group.id,
              post_id: post.id
            }
          end #
        }

        # Include images associated with the post
        images = []
        (1..5).each do |i|
          image = post.send("post_image_#{i}")
          images.push(image.url) if image
        end
        post_json['images'] = images

        post_json
      end

      render json: posts_with_group_names_and_images
    end

    def feed
      group_ids = @user.groups.pluck(:id)
      posts = Post.by_groups(group_ids)

      posts_with_group_names_and_images = posts.map do |post|
        post_json = {
          id: post.id,
          user_id: post.user.id,
          username: post.user.username,
          user_profile_image: post.user&.profile_image_url,
          content: post.content,
          created_at: post.created_at,
          group_id: post.group.id,
          group_name: post.group.name,
          comments: post.comments.map do |comment|
            {
              id: comment.id,
              content: comment.content,
              user_id: comment.user_id,
              username: comment.user.username,
              user_profile_image: post.user&.profile_image_url,
              created_at: comment.created_at,
              group_id: comment.post.group.id,
              post_id: post.id
            }
          end # Assuming post belongs to a group
        }

        # Include images associated with the post
        images = []
        (1..5).each do |i|
          image = post.send("post_image_#{i}")
          images.push(image.url) if image
        end
        post_json['images'] = images

        post_json
      end

      render json: posts_with_group_names_and_images
    end

    def admin_groups
      @groups = Group.where(admin_id: @user.id)
      render json: @groups, status: :ok
    end



    private

    def set_user
      @user = User.find(params[:id])
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'User not found' }, status: :not_found
    end

    def user_params
      params.require(:user).permit(:username, :password, :email, :first_name, :last_name, :header_image, :profile_image, :bio)
    end

    def user_update_params
      params.require(:user).permit(:username, :first_name, :last_name, :email, :header_image, :profile_image, :bio)
    end

    def user_json(user)
      user_json = user.as_json(only: [:id, :username, :first_name, :last_name, :email, :bio, :fishboard_points, :user_fishboard])

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



